import { h, ref, inject, computed, watch, defineComponent } from 'vue';
import { genTableRows, parseDate, toDateString } from './helpers';
import { useTransition } from '../../composable/use-transition';
export const VDatePickerDates = defineComponent({
    name: 'v-date-picker-dates',
    props: {
        locale: Array,
        year: [String, Number],
        month: [String, Number],
        date: [String, Number],
        value: Object,
        mondayFirst: Boolean,
        disabledDates: Object,
    },
    emits: ['update:month', 'update:value'],
    setup(props, { emit, slots }) {
        const FIRST_MONTH = 0;
        const LAST_MONTH = 11;
        const DAYS = [0, 1, 2, 3, 4, 5, 6];
        const ANIMATION_TIMEOUT = 0;
        const dates = ref([]);
        const isDatesChanged = ref(false);
        const today = parseDate(new Date());
        const handlers = inject('handlers');
        handlers.value = {
            onNext: () => updateMonth(true),
            onPrev: () => updateMonth(false),
        };
        if (props.mondayFirst) {
            DAYS.push(DAYS.splice(0, 1)[0]);
        }
        const daysInMonth = computed(() => {
            return new Date(props.year, props.month + 1, 0).getDate();
        });
        watch(() => props.month, () => genTableDates(), { immediate: true });
        watch(() => isDatesChanged.value, () => setTimeout(() => (isDatesChanged.value = false), ANIMATION_TIMEOUT));
        function updateMonth(isNext) {
            const params = {};
            params.month = props.month + (isNext ? 1 : -1);
            if (!isNext && params.month < FIRST_MONTH)
                params.month = LAST_MONTH;
            if (isNext && params.month > LAST_MONTH)
                params.month = FIRST_MONTH;
            if (isNext && !params.month)
                params.year = props.year + 1;
            if (!isNext && params.month === LAST_MONTH)
                params.year = props.year - 1;
            isDatesChanged.value = true;
            emit('update:month', params);
        }
        function genWeekDays() {
            const propsData = {
                class: 'v-date-picker-dates__day',
            };
            return DAYS.map((day) => h('span', propsData, props.locale[day]));
        }
        function genDateObject(date) {
            const { year, month } = props;
            return parseDate(new Date(year, month, date));
        }
        function setEmptiesBeforeFirstDate(dateObject) {
            const firstDay = DAYS[0];
            const startDay = firstDay && !dateObject.day ? dateObject.day : firstDay;
            const tillDay = firstDay && !dateObject.day ? DAYS.length - 1 : dateObject.day;
            for (let i = startDay; i <= tillDay; i += 1) {
                dates.value[i] = { date: null };
            }
            dates.value[tillDay] = dateObject;
        }
        function genTableDates() {
            dates.value = [];
            for (let i = 1; i <= daysInMonth.value; i += 1) {
                const dateObject = genDateObject(i);
                if (i === 1) {
                    setEmptiesBeforeFirstDate(dateObject);
                }
                else {
                    dates.value[dates.value.length] = dateObject;
                }
            }
        }
        function compareDates(date1, date2) {
            return (date1.date === date2.date &&
                date1.month === date2.month &&
                date1.year === date2.year);
        }
        function setDisabled(date) {
            if (!date.date)
                return false;
            if (!props.disabledDates)
                return !!date.isHoliday;
            const { disabledDates } = props;
            return ((disabledDates.daysOfMonth && disableDaysOfMonth(date)) ||
                (disabledDates.from && disableFromTo(date, disabledDates)) ||
                (disabledDates.dates && disableDates(date)) ||
                (disabledDates.days && disableDays(date)) ||
                (disabledDates.ranges && disableRanges(date)) ||
                (disabledDates.custom && disabledDates.custom(date)));
        }
        function disableFromTo(date, { from, to }) {
            const dateFrom = parseDate(from);
            const dateTo = parseDate(to);
            return date.mls >= dateFrom.mls && date.mls <= dateTo.mls;
        }
        function disableDaysOfMonth(date) {
            return props.disabledDates.daysOfMonth.some((it) => it === date.date);
        }
        function disableDates(date) {
            return props.disabledDates.dates.find((d) => {
                return String(d) === String(toDateString(date));
            });
        }
        function disableDays(date) {
            return props.disabledDates.days.find((d) => d === date.day) >= 0;
        }
        function disableRanges(date) {
            const { ranges } = props.disabledDates;
            for (let i = 0; i < ranges.length; i += 1) {
                if (disableFromTo(date, ranges[i]))
                    return true;
            }
        }
        function genDateCell(date) {
            const isSelected = compareDates(date, props.value);
            const isToday = compareDates(date, today);
            date.isHoliday = setDisabled(date);
            const propsData = {
                class: {
                    'v-date-picker-dates__cell': !!date.date,
                    'v-date-picker-dates__cell--empty': !date.date,
                    'v-date-picker-dates__cell--selected': isSelected && !props.value.default,
                    'v-date-picker-dates__cell--current-date': isToday,
                    'v-date-picker-dates__cell--holiday': date.date && date.isHoliday,
                },
                onClick: () => date.date && emit('update:value', date),
            };
            return h('div', propsData, [
                (date.date && slots.date && slots.date(date)) || date.date,
            ]);
        }
        function genDateCells() {
            return dates.value.reduce((acc, dateObject) => {
                acc.push(genDateCell(dateObject));
                return acc;
            }, []);
        }
        function genDateRows() {
            const datesVNodes = genDateCells();
            return genTableRows(datesVNodes, 'v-date-picker-dates__row', DAYS.length);
        }
        function genDates() {
            return ((!isDatesChanged.value &&
                h('div', { class: 'v-date-picker-dates__dates' }, genDateRows())) ||
                null);
        }
        function genWeek() {
            return h('div', { class: 'v-date-picker-dates__week' }, genWeekDays());
        }
        return () => h('div', { class: 'v-date-picker-dates' }, [
            genWeek(),
            useTransition(genDates(), 'fade'),
        ]);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGVQaWNrZXJEYXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRlUGlja2VyL1ZEYXRlUGlja2VyRGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBR3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUdqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUE7QUFZL0QsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO0lBQzlDLElBQUksRUFBRSxxQkFBcUI7SUFFM0IsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3RCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDdkIsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN0QixLQUFLLEVBQUUsTUFBTTtRQUNiLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLGFBQWEsRUFBRSxNQUFNO0tBQ2Y7SUFFUixLQUFLLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDO0lBRXZDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQzFCLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQTtRQUNyQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFDckIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNsQyxN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RUFBRSxVQUFVLEVBQUUsRUFBRTtnQkFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQTtnQkFDbEMsT0FBTyxHQUFHLENBQUE7WUFDWixDQUFDLEVBQUUsRUFBYSxDQUFDLENBQUE7UUFDbkIsQ0FBQztRQUVELFNBQVMsV0FBVztZQUNsQixNQUFNLFdBQVcsR0FBRyxZQUFZLEVBQUUsQ0FBQTtZQUVsQyxPQUFPLFlBQVksQ0FBQyxXQUFXLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFFRCxTQUFTLFFBQVE7WUFDZixPQUFPLENBQ0wsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLO2dCQUNwQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxDQUNMLENBQUE7UUFDSCxDQUFDO1FBRUQsU0FBUyxPQUFPO1lBQ2QsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUN4RSxDQUFDO1FBRUQsT0FBTyxHQUFHLEVBQUUsQ0FDVixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLEVBQUU7WUFDekMsT0FBTyxFQUFFO1lBQ1QsYUFBYSxDQUFDLFFBQVEsRUFBUyxFQUFFLE1BQU0sQ0FBQztTQUN6QyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVnVlIEFQSVxuaW1wb3J0IHsgaCwgcmVmLCBpbmplY3QsIGNvbXB1dGVkLCB3YXRjaCwgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSAndnVlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBnZW5UYWJsZVJvd3MsIHBhcnNlRGF0ZSwgdG9EYXRlU3RyaW5nIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBFZmZlY3RzXG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZS91c2UtdHJhbnNpdGlvbidcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlLCBSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBEYXRlUGlja2VyQnRuSGFuZGxlcnMsIERhdGVQaWNrZXJEYXRlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnXG5pbXBvcnQgeyBNYXliZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL2Jhc2UnXG5cbnR5cGUgVXBkYXRlUGFyYW1zID0ge1xuICBtb250aD86IG51bWJlclxuICB5ZWFyPzogbnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCBWRGF0ZVBpY2tlckRhdGVzID0gZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtZGF0ZS1waWNrZXItZGF0ZXMnLFxuXG4gIHByb3BzOiB7XG4gICAgbG9jYWxlOiBBcnJheSxcbiAgICB5ZWFyOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgIG1vbnRoOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgIGRhdGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgdmFsdWU6IE9iamVjdCxcbiAgICBtb25kYXlGaXJzdDogQm9vbGVhbixcbiAgICBkaXNhYmxlZERhdGVzOiBPYmplY3QsXG4gIH0gYXMgYW55LFxuXG4gIGVtaXRzOiBbJ3VwZGF0ZTptb250aCcsICd1cGRhdGU6dmFsdWUnXSxcblxuICBzZXR1cChwcm9wcywgeyBlbWl0LCBzbG90cyB9KTogKCkgPT4gVk5vZGUge1xuICAgIGNvbnN0IEZJUlNUX01PTlRIID0gMFxuICAgIGNvbnN0IExBU1RfTU9OVEggPSAxMVxuICAgIGNvbnN0IERBWVMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNl1cbiAgICBjb25zdCBBTklNQVRJT05fVElNRU9VVCA9IDBcblxuICAgIGNvbnN0IGRhdGVzID0gcmVmPChEYXRlUGlja2VyRGF0ZSB8IG51bGwpW10+KFtdKVxuICAgIGNvbnN0IGlzRGF0ZXNDaGFuZ2VkID0gcmVmPGJvb2xlYW4+KGZhbHNlKVxuICAgIGNvbnN0IHRvZGF5ID0gcGFyc2VEYXRlKG5ldyBEYXRlKCkpXG5cbiAgICBjb25zdCBoYW5kbGVycyA9IGluamVjdCgnaGFuZGxlcnMnKSBhcyBSZWY8RGF0ZVBpY2tlckJ0bkhhbmRsZXJzPlxuXG4gICAgaGFuZGxlcnMudmFsdWUgPSB7XG4gICAgICBvbk5leHQ6ICgpID0+IHVwZGF0ZU1vbnRoKHRydWUpLFxuICAgICAgb25QcmV2OiAoKSA9PiB1cGRhdGVNb250aChmYWxzZSksXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vbmRheUZpcnN0KSB7XG4gICAgICBEQVlTLnB1c2goREFZUy5zcGxpY2UoMCwgMSlbMF0pXG4gICAgfVxuXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBjb21wdXRlZDxudW1iZXI+KCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShwcm9wcy55ZWFyLCBwcm9wcy5tb250aCArIDEsIDApLmdldERhdGUoKVxuICAgIH0pXG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IHByb3BzLm1vbnRoLFxuICAgICAgKCkgPT4gZ2VuVGFibGVEYXRlcygpLFxuICAgICAgeyBpbW1lZGlhdGU6IHRydWUgfSxcbiAgICApXG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IGlzRGF0ZXNDaGFuZ2VkLnZhbHVlLFxuICAgICAgKCkgPT4gc2V0VGltZW91dCgoKSA9PiAoaXNEYXRlc0NoYW5nZWQudmFsdWUgPSBmYWxzZSksIEFOSU1BVElPTl9USU1FT1VUKSxcbiAgICApXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNb250aChpc05leHQ6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IHBhcmFtczogVXBkYXRlUGFyYW1zID0ge31cblxuICAgICAgcGFyYW1zLm1vbnRoID0gcHJvcHMubW9udGggKyAoaXNOZXh0ID8gMSA6IC0xKVxuXG4gICAgICBpZiAoIWlzTmV4dCAmJiBwYXJhbXMubW9udGghIDwgRklSU1RfTU9OVEgpIHBhcmFtcy5tb250aCA9IExBU1RfTU9OVEhcbiAgICAgIGlmIChpc05leHQgJiYgcGFyYW1zLm1vbnRoISA+IExBU1RfTU9OVEgpIHBhcmFtcy5tb250aCA9IEZJUlNUX01PTlRIXG4gICAgICBpZiAoaXNOZXh0ICYmICFwYXJhbXMubW9udGgpIHBhcmFtcy55ZWFyID0gcHJvcHMueWVhciArIDFcbiAgICAgIGlmICghaXNOZXh0ICYmIHBhcmFtcy5tb250aCA9PT0gTEFTVF9NT05USCkgcGFyYW1zLnllYXIgPSBwcm9wcy55ZWFyIC0gMVxuXG4gICAgICBpc0RhdGVzQ2hhbmdlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb250aCcsIHBhcmFtcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5XZWVrRGF5cygpOiBWTm9kZVtdIHtcbiAgICAgIGNvbnN0IHByb3BzRGF0YSA9IHtcbiAgICAgICAgY2xhc3M6ICd2LWRhdGUtcGlja2VyLWRhdGVzX19kYXknLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gREFZUy5tYXAoKGRheSkgPT5cbiAgICAgICAgaCgnc3BhbicsIHByb3BzRGF0YSwgcHJvcHMubG9jYWxlIVtkYXldIGFzIHN0cmluZyksXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuRGF0ZU9iamVjdChkYXRlKTogRGF0ZVBpY2tlckRhdGUge1xuICAgICAgY29uc3QgeyB5ZWFyLCBtb250aCB9ID0gcHJvcHNcbiAgICAgIHJldHVybiBwYXJzZURhdGUobmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEVtcHRpZXNCZWZvcmVGaXJzdERhdGUoZGF0ZU9iamVjdCkge1xuICAgICAgY29uc3QgZmlyc3REYXkgPSBEQVlTWzBdXG4gICAgICBjb25zdCBzdGFydERheSA9IGZpcnN0RGF5ICYmICFkYXRlT2JqZWN0LmRheSA/IGRhdGVPYmplY3QuZGF5IDogZmlyc3REYXlcbiAgICAgIGNvbnN0IHRpbGxEYXkgPVxuICAgICAgICBmaXJzdERheSAmJiAhZGF0ZU9iamVjdC5kYXkgPyBEQVlTLmxlbmd0aCAtIDEgOiBkYXRlT2JqZWN0LmRheVxuXG4gICAgICBmb3IgKGxldCBpID0gc3RhcnREYXk7IGkgPD0gdGlsbERheTsgaSArPSAxKSB7XG4gICAgICAgIGRhdGVzLnZhbHVlW2ldID0geyBkYXRlOiBudWxsIH0gYXMgYW55XG4gICAgICB9XG5cbiAgICAgIGRhdGVzLnZhbHVlW3RpbGxEYXldID0gZGF0ZU9iamVjdFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlblRhYmxlRGF0ZXMoKSB7XG4gICAgICBkYXRlcy52YWx1ZSA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXlzSW5Nb250aC52YWx1ZTsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGRhdGVPYmplY3QgPSBnZW5EYXRlT2JqZWN0KGkpXG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICBzZXRFbXB0aWVzQmVmb3JlRmlyc3REYXRlKGRhdGVPYmplY3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0ZXMudmFsdWVbZGF0ZXMudmFsdWUubGVuZ3RoXSA9IGRhdGVPYmplY3QgYXMgYW55XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wYXJlRGF0ZXMoZGF0ZTEsIGRhdGUyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBkYXRlMS5kYXRlID09PSBkYXRlMi5kYXRlICYmXG4gICAgICAgIGRhdGUxLm1vbnRoID09PSBkYXRlMi5tb250aCAmJlxuICAgICAgICBkYXRlMS55ZWFyID09PSBkYXRlMi55ZWFyXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RGlzYWJsZWQoZGF0ZTogRGF0ZVBpY2tlckRhdGUpOiBib29sZWFuIHtcbiAgICAgIGlmICghZGF0ZS5kYXRlKSByZXR1cm4gZmFsc2VcbiAgICAgIGlmICghcHJvcHMuZGlzYWJsZWREYXRlcykgcmV0dXJuICEhZGF0ZS5pc0hvbGlkYXlcblxuICAgICAgY29uc3QgeyBkaXNhYmxlZERhdGVzIH0gPSBwcm9wc1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAoZGlzYWJsZWREYXRlcy5kYXlzT2ZNb250aCAmJiBkaXNhYmxlRGF5c09mTW9udGgoZGF0ZSkpIHx8XG4gICAgICAgIChkaXNhYmxlZERhdGVzLmZyb20gJiYgZGlzYWJsZUZyb21UbyhkYXRlLCBkaXNhYmxlZERhdGVzKSkgfHxcbiAgICAgICAgKGRpc2FibGVkRGF0ZXMuZGF0ZXMgJiYgZGlzYWJsZURhdGVzKGRhdGUpKSB8fFxuICAgICAgICAoZGlzYWJsZWREYXRlcy5kYXlzICYmIGRpc2FibGVEYXlzKGRhdGUpKSB8fFxuICAgICAgICAoZGlzYWJsZWREYXRlcy5yYW5nZXMgJiYgZGlzYWJsZVJhbmdlcyhkYXRlKSkgfHxcbiAgICAgICAgKGRpc2FibGVkRGF0ZXMuY3VzdG9tICYmIGRpc2FibGVkRGF0ZXMuY3VzdG9tKGRhdGUpKVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVGcm9tVG8oZGF0ZTogRGF0ZVBpY2tlckRhdGUsIHsgZnJvbSwgdG8gfSk6IGJvb2xlYW4ge1xuICAgICAgY29uc3QgZGF0ZUZyb206IERhdGVQaWNrZXJEYXRlID0gcGFyc2VEYXRlKGZyb20pXG4gICAgICBjb25zdCBkYXRlVG86IERhdGVQaWNrZXJEYXRlID0gcGFyc2VEYXRlKHRvKVxuXG4gICAgICByZXR1cm4gZGF0ZS5tbHMgPj0gZGF0ZUZyb20ubWxzICYmIGRhdGUubWxzIDw9IGRhdGVUby5tbHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlRGF5c09mTW9udGgoZGF0ZTogRGF0ZVBpY2tlckRhdGUpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBwcm9wcy5kaXNhYmxlZERhdGVzLmRheXNPZk1vbnRoLnNvbWUoKGl0KSA9PiBpdCA9PT0gZGF0ZS5kYXRlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVEYXRlcyhkYXRlOiBEYXRlUGlja2VyRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHByb3BzLmRpc2FibGVkRGF0ZXMuZGF0ZXMuZmluZCgoZCkgPT4ge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGQpID09PSBTdHJpbmcodG9EYXRlU3RyaW5nKGRhdGUpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlRGF5cyhkYXRlOiBEYXRlUGlja2VyRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHByb3BzLmRpc2FibGVkRGF0ZXMuZGF5cy5maW5kKChkKSA9PiBkID09PSBkYXRlLmRheSkgPj0gMFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVSYW5nZXMoZGF0ZTogRGF0ZVBpY2tlckRhdGUpIHtcbiAgICAgIGNvbnN0IHsgcmFuZ2VzIH0gPSBwcm9wcy5kaXNhYmxlZERhdGVzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChkaXNhYmxlRnJvbVRvKGRhdGUsIHJhbmdlc1tpXSkpIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuRGF0ZUNlbGwoZGF0ZTogRGF0ZVBpY2tlckRhdGUpOiBWTm9kZSB7XG4gICAgICBjb25zdCBpc1NlbGVjdGVkOiBib29sZWFuID0gY29tcGFyZURhdGVzKGRhdGUsIHByb3BzLnZhbHVlKVxuICAgICAgY29uc3QgaXNUb2RheTogYm9vbGVhbiA9IGNvbXBhcmVEYXRlcyhkYXRlLCB0b2RheSlcblxuICAgICAgZGF0ZS5pc0hvbGlkYXkgPSBzZXREaXNhYmxlZChkYXRlKVxuXG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtZGF0ZS1waWNrZXItZGF0ZXNfX2NlbGwnOiAhIWRhdGUuZGF0ZSxcbiAgICAgICAgICAndi1kYXRlLXBpY2tlci1kYXRlc19fY2VsbC0tZW1wdHknOiAhZGF0ZS5kYXRlLFxuICAgICAgICAgICd2LWRhdGUtcGlja2VyLWRhdGVzX19jZWxsLS1zZWxlY3RlZCc6XG4gICAgICAgICAgICBpc1NlbGVjdGVkICYmICFwcm9wcy52YWx1ZS5kZWZhdWx0LFxuICAgICAgICAgICd2LWRhdGUtcGlja2VyLWRhdGVzX19jZWxsLS1jdXJyZW50LWRhdGUnOiBpc1RvZGF5LFxuICAgICAgICAgICd2LWRhdGUtcGlja2VyLWRhdGVzX19jZWxsLS1ob2xpZGF5JzogZGF0ZS5kYXRlICYmIGRhdGUuaXNIb2xpZGF5LFxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiBkYXRlLmRhdGUgJiYgZW1pdCgndXBkYXRlOnZhbHVlJywgZGF0ZSksXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBwcm9wc0RhdGEsIFtcbiAgICAgICAgKGRhdGUuZGF0ZSAmJiBzbG90cy5kYXRlICYmIHNsb3RzLmRhdGUoZGF0ZSkpIHx8IGRhdGUuZGF0ZSxcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuRGF0ZUNlbGxzKCk6IFZOb2RlW10ge1xuICAgICAgcmV0dXJuIGRhdGVzLnZhbHVlLnJlZHVjZSgoYWNjLCBkYXRlT2JqZWN0KSA9PiB7XG4gICAgICAgIGFjYy5wdXNoKGdlbkRhdGVDZWxsKGRhdGVPYmplY3QhKSlcbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfSwgW10gYXMgVk5vZGVbXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5EYXRlUm93cygpOiBWTm9kZVtdIHtcbiAgICAgIGNvbnN0IGRhdGVzVk5vZGVzID0gZ2VuRGF0ZUNlbGxzKClcblxuICAgICAgcmV0dXJuIGdlblRhYmxlUm93cyhkYXRlc1ZOb2RlcywgJ3YtZGF0ZS1waWNrZXItZGF0ZXNfX3JvdycsIERBWVMubGVuZ3RoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbkRhdGVzKCk6IE1heWJlPFZOb2RlPiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAoIWlzRGF0ZXNDaGFuZ2VkLnZhbHVlICYmXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3YtZGF0ZS1waWNrZXItZGF0ZXNfX2RhdGVzJyB9LCBnZW5EYXRlUm93cygpKSkgfHxcbiAgICAgICAgbnVsbFxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbldlZWsoKTogVk5vZGUge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICd2LWRhdGUtcGlja2VyLWRhdGVzX193ZWVrJyB9LCBnZW5XZWVrRGF5cygpKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PlxuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3YtZGF0ZS1waWNrZXItZGF0ZXMnIH0sIFtcbiAgICAgICAgZ2VuV2VlaygpLFxuICAgICAgICB1c2VUcmFuc2l0aW9uKGdlbkRhdGVzKCkgYXMgYW55LCAnZmFkZScpLFxuICAgICAgXSlcbiAgfSxcbn0pXG4iXX0=