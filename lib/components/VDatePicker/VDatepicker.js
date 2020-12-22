import "../../../src/components/VDatePicker/VDatepicker.scss";
import { h, ref, reactive, watch, provide, computed, defineComponent } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { useTransition } from '../../effects/use-transition';
import { parseDate } from './helpers';
import { VDatepickerHeader } from './VDatepickerHeader';
import { VDates } from './VDates';
import { VYears } from './VYears';
import { VMonths } from './VMonths';
import { locale } from '../../services/locale';
export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props: {
    dark: Boolean,
    mondayFirst: Boolean,
    millis: Boolean,
    toUtc: Boolean,
    lang: String,
    contentColor: String,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    ...colorProps(),
    ...elevationProps()
  },
  emits: ['update:value', 'update:modelValue', 'selected'],

  setup(props, {
    emit
  }) {
    const data = reactive({
      year: null,
      month: null,
      date: null,
      day: null,
      selected: null,
      tableMonth: null,
      tableYear: null,
      isYears: false,
      isMonths: false,
      isDates: true
    });
    const localeMonths = locale[props.lang].months;
    const localeWeek = locale[props.lang].week;
    const contentColor = props.dark ? 'white' : props.contentColor;
    const handlers = ref({});
    const {
      setTextColor,
      setBackground
    } = useColors();
    const {
      elevationClasses
    } = useElevation(props);
    provide('handlers', handlers);
    watch(() => props.value || props.modelValue, setParsedDate, {
      immediate: true
    });
    const classes = computed(() => ({
      'v-datepicker': true,
      ...elevationClasses.value
    }));
    const headerValue = computed(() => {
      return data.isYears || data.isMonths ? `${data.tableYear}` : data.isDates ? `${data.tableYear} ${localeMonths[data.tableMonth]}` : '';
    });
    const displayDate = computed(() => {
      const {
        month,
        date,
        day
      } = data.selected;
      return `${localeMonths[month]} ${date} ${localeWeek[day]}`;
    });
    const computedValue = computed(() => {
      const {
        year,
        month,
        date
      } = data.selected;
      const selectedDate = new Date(year, month, date);
      if (props.millis) return selectedDate.getTime();
      if (props.toUtc) return selectedDate.toUTCString();
      return selectedDate;
    });

    function onTableChange() {
      if (data.isYears) {
        data.isYears = false;
        return data.isMonths = true;
      }

      if (data.isMonths) {
        data.isMonths = false;
        return data.isYears = true;
      }

      if (data.isDates) {
        data.isDates = false;
        return data.isMonths = true;
      }
    }

    function setParsedDate(selectedDate) {
      const dateForParsing = selectedDate || new Date();
      const {
        year,
        month,
        day,
        date
      } = parseDate(dateForParsing);
      data.selected = {
        year,
        month,
        day,
        date
      };
      data.tableMonth = month;
      data.tableYear = year;
      data.year = year;
      data.month = month;
      data.date = date;
      data.day = day;
    }

    function onYearUpdate($event) {
      data.tableYear = $event;
      data.isMonths = true;
      data.isYears = false;
    }

    function onMonthUpdate($event) {
      data.tableMonth = $event;
      data.isMonths = false;
      data.isYears = false;
      data.isDates = true;
    }

    function onDateUpdate($event) {
      data.selected = $event;
      props.value && emit('update:value', computedValue.value);
      props.modelValue && emit('update:modelValue', computedValue.value);
      emit('selected', computedValue.value);
    }

    function onDateMonthUpdate($event) {
      data.tableMonth = $event.month;
      if ($event.year) data.tableYear = $event.year;
    }

    function genDisplayValue(value) {
      const propsData = {
        class: {
          'v-datepicker__display-value': true
        },
        key: value
      };
      return useTransition(h('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      return h('div', {
        class: 'v-datepicker__display-inner'
      }, [genDisplayValue(data.selected.year), genDisplayValue(displayDate.value)]);
    }

    function genDatepickerDisplay() {
      const propsData = setBackground(props.contentColor, {
        class: {
          'v-datepicker__display': true
        }
      });
      return h('div', setTextColor(props.color, propsData), genDatepickerDisplayInner());
    }

    function genDatepickerHeader() {
      return h(VDatepickerHeader, {
        onNext: () => handlers.value.onNext(),
        onPrev: () => handlers.value.onPrev(),
        onTable: onTableChange
      }, {
        default: () => headerValue.value
      });
    }

    function genDatepickerYearsTable() {
      const propsData = {
        year: data.tableYear,
        ['onUpdate:year']: onYearUpdate
      };
      return h(VYears, propsData);
    }

    function genDatepickerMonthsTable() {
      return h(VMonths, {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate
      });
    }

    function genDatepickerDatesTable() {
      return h(VDates, {
        localeWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected,
        ['onUpdate:value']: onDateUpdate,
        ['onUpdate:month']: onDateMonthUpdate
      });
    }

    function genDatepickerBody() {
      return h('div', {
        class: {
          'v-datepicker__body': true
        }
      }, useTransition(data.isYears && genDatepickerYearsTable() || data.isMonths && genDatepickerMonthsTable() || data.isDates && genDatepickerDatesTable(), 'slide-in-left', 'out-in'));
    }

    return () => {
      const propsData = setBackground(props.color, {
        class: classes.value
      });
      return h('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]);
    };
  }

});
//# sourceMappingURL=VDatepicker.js.map