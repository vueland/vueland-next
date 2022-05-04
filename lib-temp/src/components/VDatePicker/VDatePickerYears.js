import { h, ref, watchEffect, inject, computed, defineComponent } from 'vue';
import { genTableRows } from './helpers';
import { useTransition } from '../../composable/use-transition';
export const VDatePickerYears = defineComponent({
    name: 'v-date-picker-years',
    props: {
        year: [Number, String],
    },
    emits: ['update:year'],
    setup(props, { emit }) {
        const LIMIT = 100;
        const ON_TABLE = 20;
        const CELLS_IN_ROW = 4;
        const CURRENT_YEAR = new Date().getFullYear();
        const ANIMATION_TIMEOUT = 100;
        const years = ref([]);
        const onTableIndex = ref(0);
        const isListChanged = ref(false);
        const transition = ref('');
        const handlers = inject('handlers');
        watchEffect(() => isListChanged.value &&
            setTimeout(() => {
                isListChanged.value = false;
            }, ANIMATION_TIMEOUT));
        const computedYear = computed({
            get() {
                return +props.year || CURRENT_YEAR;
            },
            set(val) {
                emit('update:year', val);
            },
        });
        if (handlers?.value) {
            handlers.value = {
                onNext: () => changeYearsList(true),
                onPrev: () => changeYearsList(false),
            };
        }
        function setCurrentTransition(isNext) {
            transition.value = isNext ? 'fade-in-down' : 'fade-in-up';
        }
        function setTableIndex() {
            onTableIndex.value = years.value.findIndex((row) => {
                return row.find((year) => year === computedYear.value);
            });
        }
        function changeYearsList(isNext) {
            const max = years.value.length - 1;
            const val = isNext ? 1 : -1;
            if ((onTableIndex.value === max && val > 0) ||
                (onTableIndex.value === 0 && val < 0))
                return;
            setCurrentTransition(isNext);
            onTableIndex.value += val;
            isListChanged.value = true;
        }
        function genTableYears() {
            const fromYear = CURRENT_YEAR - LIMIT;
            const maxYears = LIMIT * 2;
            let yearsList = [];
            for (let i = 0; i <= maxYears; i += 1) {
                if (yearsList.length === ON_TABLE) {
                    years.value.push(yearsList);
                    yearsList = [];
                }
                yearsList.push(fromYear + i);
            }
        }
        function genYearCell(year) {
            const isSelected = year === computedYear.value;
            const propsData = {
                class: {
                    'v-date-picker-years__cell': true,
                    'v-date-picker-years__cell--selected': isSelected,
                    'v-date-picker-years__cell--current-year': year === CURRENT_YEAR,
                },
                onClick: () => (computedYear.value = year),
            };
            return h('div', propsData, year);
        }
        function genYearsRows() {
            const currentYears = years.value[onTableIndex.value];
            const yearsVNodes = currentYears.map(genYearCell);
            return genTableRows(yearsVNodes, 'v-date-picker-years__row', CELLS_IN_ROW);
        }
        function genYears() {
            const propsData = { class: 'v-date-picker-years__years' };
            return ((!isListChanged.value && h('div', propsData, genYearsRows())) || null);
        }
        genTableYears();
        setTableIndex();
        return () => {
            const content = useTransition(genYears(), transition.value);
            const propsData = { class: { 'v-date-picker-years': true } };
            return h('div', propsData, content);
        };
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGVQaWNrZXJZZWFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRlUGlja2VyL1ZEYXRlUGlja2VyWWVhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBRzVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFPeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFBO0FBRS9ELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztJQUM5QyxJQUFJLEVBQUUscUJBQXFCO0lBRTNCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7S0FDaEI7SUFFUixLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFFdEIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRTtRQUNuQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDakIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ25CLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQTtRQUN0QixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzdDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBO1FBRTdCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBa0IsRUFBRSxDQUFDLENBQUE7UUFDdEMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ25DLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBVSxLQUFLLENBQUMsQ0FBQTtRQUN6QyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQVMsRUFBRSxDQUFDLENBQUE7UUFFbEMs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LENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWVWUgQVBJXG5pbXBvcnQgeyBoLCByZWYsIHdhdGNoRWZmZWN0LCBpbmplY3QsIGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnXG5cbi8vIEhlbHBlcnNcbmltcG9ydCB7IGdlblRhYmxlUm93cyB9IGZyb20gJy4vaGVscGVycydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlLCBSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBEYXRlUGlja2VyQnRuSGFuZGxlcnMgfSBmcm9tICcuLi8uLi8uLi90eXBlcydcblxuLy8gRWZmZWN0c1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGUvdXNlLXRyYW5zaXRpb24nXG5cbmV4cG9ydCBjb25zdCBWRGF0ZVBpY2tlclllYXJzID0gZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtZGF0ZS1waWNrZXIteWVhcnMnLFxuXG4gIHByb3BzOiB7XG4gICAgeWVhcjogW051bWJlciwgU3RyaW5nXSxcbiAgfSBhcyBhbnksXG5cbiAgZW1pdHM6IFsndXBkYXRlOnllYXInXSxcblxuICBzZXR1cChwcm9wcywgeyBlbWl0IH0pIHtcbiAgICBjb25zdCBMSU1JVCA9IDEwMFxuICAgIGNvbnN0IE9OX1RBQkxFID0gMjBcbiAgICBjb25zdCBDRUxMU19JTl9ST1cgPSA0XG4gICAgY29uc3QgQ1VSUkVOVF9ZRUFSID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXG4gICAgY29uc3QgQU5JTUFUSU9OX1RJTUVPVVQgPSAxMDBcblxuICAgIGNvbnN0IHllYXJzID0gcmVmPEFycmF5PG51bWJlcltdPj4oW10pXG4gICAgY29uc3Qgb25UYWJsZUluZGV4ID0gcmVmPG51bWJlcj4oMClcbiAgICBjb25zdCBpc0xpc3RDaGFuZ2VkID0gcmVmPGJvb2xlYW4+KGZhbHNlKVxuICAgIGNvbnN0IHRyYW5zaXRpb24gPSByZWY8c3RyaW5nPignJylcblxuICAgIGNvbnN0IGhhbmRsZXJzID0gaW5qZWN0KCdoYW5kbGVycycpIGFzIFJlZjxEYXRlUGlja2VyQnRuSGFuZGxlcnM+XG5cbiAgICB3YXRjaEVmZmVjdChcbiAgICAgICgpID0+XG4gICAgICAgIGlzTGlzdENoYW5nZWQudmFsdWUgJiZcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaXNMaXN0Q2hhbmdlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIH0sIEFOSU1BVElPTl9USU1FT1VUKVxuICAgIClcblxuICAgIGNvbnN0IGNvbXB1dGVkWWVhciA9IGNvbXB1dGVkPG51bWJlcj4oe1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gK3Byb3BzLnllYXIhIHx8IENVUlJFTlRfWUVBUlxuICAgICAgfSxcbiAgICAgIHNldCh2YWw6IG51bWJlcikge1xuICAgICAgICBlbWl0KCd1cGRhdGU6eWVhcicsIHZhbClcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmIChoYW5kbGVycz8udmFsdWUpIHtcbiAgICAgIGhhbmRsZXJzLnZhbHVlID0ge1xuICAgICAgICBvbk5leHQ6ICgpID0+IGNoYW5nZVllYXJzTGlzdCh0cnVlKSxcbiAgICAgICAgb25QcmV2OiAoKSA9PiBjaGFuZ2VZZWFyc0xpc3QoZmFsc2UpLFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnRUcmFuc2l0aW9uKGlzTmV4dCkge1xuICAgICAgdHJhbnNpdGlvbi52YWx1ZSA9IGlzTmV4dCA/ICdmYWRlLWluLWRvd24nIDogJ2ZhZGUtaW4tdXAnXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VGFibGVJbmRleCgpIHtcbiAgICAgIG9uVGFibGVJbmRleC52YWx1ZSA9IHllYXJzLnZhbHVlLmZpbmRJbmRleCgocm93KSA9PiB7XG4gICAgICAgIHJldHVybiByb3cuZmluZCgoeWVhcikgPT4geWVhciA9PT0gY29tcHV0ZWRZZWFyLnZhbHVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VZZWFyc0xpc3QoaXNOZXh0KSB7XG4gICAgICBjb25zdCBtYXggPSB5ZWFycy52YWx1ZS5sZW5ndGggLSAxXG4gICAgICBjb25zdCB2YWwgPSBpc05leHQgPyAxIDogLTFcblxuICAgICAgaWYgKFxuICAgICAgICAob25UYWJsZUluZGV4LnZhbHVlID09PSBtYXggJiYgdmFsID4gMCkgfHxcbiAgICAgICAgKG9uVGFibGVJbmRleC52YWx1ZSA9PT0gMCAmJiB2YWwgPCAwKVxuICAgICAgKVxuICAgICAgICByZXR1cm5cblxuICAgICAgc2V0Q3VycmVudFRyYW5zaXRpb24oaXNOZXh0KVxuXG4gICAgICBvblRhYmxlSW5kZXgudmFsdWUgKz0gdmFsXG4gICAgICBpc0xpc3RDaGFuZ2VkLnZhbHVlID0gdHJ1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlblRhYmxlWWVhcnMoKSB7XG4gICAgICBjb25zdCBmcm9tWWVhciA9IENVUlJFTlRfWUVBUiAtIExJTUlUXG4gICAgICBjb25zdCBtYXhZZWFycyA9IExJTUlUICogMlxuXG4gICAgICBsZXQgeWVhcnNMaXN0OiBudW1iZXJbXSA9IFtdXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1heFllYXJzOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHllYXJzTGlzdC5sZW5ndGggPT09IE9OX1RBQkxFKSB7XG4gICAgICAgICAgeWVhcnMudmFsdWUucHVzaCh5ZWFyc0xpc3QpXG4gICAgICAgICAgeWVhcnNMaXN0ID0gW11cbiAgICAgICAgfVxuICAgICAgICB5ZWFyc0xpc3QucHVzaChmcm9tWWVhciArIGkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuWWVhckNlbGwoeWVhcik6IFZOb2RlIHtcbiAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB5ZWFyID09PSBjb21wdXRlZFllYXIudmFsdWVcbiAgICAgIGNvbnN0IHByb3BzRGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1kYXRlLXBpY2tlci15ZWFyc19fY2VsbCc6IHRydWUsXG4gICAgICAgICAgJ3YtZGF0ZS1waWNrZXIteWVhcnNfX2NlbGwtLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcbiAgICAgICAgICAndi1kYXRlLXBpY2tlci15ZWFyc19fY2VsbC0tY3VycmVudC15ZWFyJzogeWVhciA9PT0gQ1VSUkVOVF9ZRUFSLFxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiAoY29tcHV0ZWRZZWFyLnZhbHVlID0geWVhciksXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBwcm9wc0RhdGEsIHllYXIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuWWVhcnNSb3dzKCk6IFZOb2RlW10ge1xuICAgICAgY29uc3QgY3VycmVudFllYXJzID0geWVhcnMudmFsdWVbb25UYWJsZUluZGV4LnZhbHVlXVxuICAgICAgY29uc3QgeWVhcnNWTm9kZXMgPSBjdXJyZW50WWVhcnMubWFwKGdlblllYXJDZWxsKVxuXG4gICAgICByZXR1cm4gZ2VuVGFibGVSb3dzKHllYXJzVk5vZGVzLCAndi1kYXRlLXBpY2tlci15ZWFyc19fcm93JywgQ0VMTFNfSU5fUk9XKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlblllYXJzKCk6IFZOb2RlIHwgbnVsbCB7XG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7IGNsYXNzOiAndi1kYXRlLXBpY2tlci15ZWFyc19feWVhcnMnIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgICghaXNMaXN0Q2hhbmdlZC52YWx1ZSAmJiBoKCdkaXYnLCBwcm9wc0RhdGEsIGdlblllYXJzUm93cygpKSkgfHwgbnVsbFxuICAgICAgKVxuICAgIH1cblxuICAgIGdlblRhYmxlWWVhcnMoKVxuICAgIHNldFRhYmxlSW5kZXgoKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB1c2VUcmFuc2l0aW9uKGdlblllYXJzKCkgYXMgVk5vZGUsIHRyYW5zaXRpb24udmFsdWUpXG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7IGNsYXNzOiB7ICd2LWRhdGUtcGlja2VyLXllYXJzJzogdHJ1ZSB9IH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHByb3BzRGF0YSwgY29udGVudClcbiAgICB9XG4gIH0sXG59KVxuIl19