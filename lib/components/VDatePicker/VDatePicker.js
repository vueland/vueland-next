import "../../../src/components/VDatePicker/VDatePicker.scss";
import { h, ref, reactive, provide, computed, withDirectives, defineComponent } from 'vue';
import { vShow } from 'vue';
import { clickOutside } from '../../directives';
import { useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { useTransition } from '../../effects/use-transition';
import { parseDate } from './helpers';
import { warning } from '../../helpers';
import { VTextField } from '../VTextField';
import { VDatepickerHeader } from './VDatepickerHeader';
import { VDatePickerDates } from './VDatePickerDates';
import { VDatePickerYears } from './VDatePickerYears';
import { VDatePickerMonths } from './VDatePickerMonths';
import { locale } from '../../services/locale';
export const VDatePicker = defineComponent({
  name: 'v-date-picker',
  props: {
    dark: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    readonly: {
      type: Boolean,
      default: true
    },
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    useIso: Boolean,
    useJson: Boolean,
    lang: {
      type: String,
      default: 'en'
    },
    contentColor: String,
    label: String,
    prependIcon: String,
    format: {
      type: String,
      default: 'yyyy-mm-dd'
    },
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    color: {
      type: String,
      default: 'white'
    },
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
      isDates: true,
      isActive: false
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
    if (props.value) setParsedDate(props.value);else if (props.modelValue) setParsedDate(props.modelValue);else setParsedDate();
    const classes = computed(() => ({
      'v-date-picker': true,
      'v-date-picker--inputable': !props.readonly,
      'v-date-picker--readonly': !!props.readonly
    }));
    const tableClasses = computed(() => ({
      'v-date-picker__table': true,
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
      if (props.useMls) return selectedDate.getTime();
      if (props.useUtc) return selectedDate.toUTCString();
      if (props.useIso) return selectedDate.toISOString();
      if (props.useJson) return selectedDate.toJSON();
      return selectedDate;
    });
    const directive = computed(() => {
      return data.isActive ? {
        handler: () => data.isActive = false,
        closeConditional: false
      } : undefined;
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

    function setDataDate({
      year,
      month,
      date,
      day
    }) {
      data.tableMonth = month;
      data.tableYear = year;
      data.year = year;
      data.month = month;
      data.date = date;
      data.day = day;
    }

    function setParsedDate(selectedDate = null) {
      const dateForParsing = selectedDate || new Date();
      data.selected = parseDate(dateForParsing);
      setDataDate(data.selected);
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
      if (!$event) return;
      data.selected = $event;
      setDataDate(data.selected);
      const dateValue = computedValue.value || formatDate();
      emit('update:value', dateValue);
      emit('update:modelValue', dateValue);
      emit('selected', dateValue);
      data.isActive = false;
    }

    function onDateMonthUpdate($event) {
      data.tableMonth = $event.month;
      if ($event.year) data.tableYear = $event.year;
    }

    function onDateInput($event) {
      data.isActive = false;
      if ($event.length !== props.format.length) return;
      onDateUpdate(stringToDate($event));
    }

    function divideWithSeparator(str) {
      const matchArray = str.match(/\W/);
      const separator = matchArray && matchArray[0];

      if (separator) {
        const divided = str.split(separator);
        return {
          separator,
          divided
        };
      }

      return warning(`the date string should be in ${props.format} format`);
    }

    function stringToDate(stringDate) {
      const dateObject = {};
      const formattedDate = divideWithSeparator(stringDate);
      const formatObject = divideWithSeparator(props.format);

      if (formattedDate) {
        formatObject.divided.forEach((it, i) => {
          dateObject[it] = +formattedDate.divided[i];
        });
        const {
          yyyy,
          mm,
          dd
        } = dateObject;
        return parseDate(new Date(yyyy, mm - 1, dd));
      }

      return undefined;
    }

    function formatDate() {
      if (!props.value && !props.modelValue && !props.today) return;
      const {
        divided,
        separator
      } = divideWithSeparator(props.format);
      const formatObject = {
        y: data.selected.year,
        m: data.selected.month + 1,
        d: data.selected.date
      };
      let dateString = '';

      for (let i = 0; i < divided.length; i += 1) {
        if (divided[i].length === 2 && formatObject[divided[i][0]] < 10) {
          dateString += '0' + formatObject[divided[i][0]];
        } else {
          dateString += formatObject[divided[i][0]];
        }

        dateString += i < divided.length - 1 ? separator : '';
      }

      return dateString;
    }

    function genDisplayValue(value) {
      const propsData = {
        class: {
          'v-date-picker__display-value': true
        }
      };
      return useTransition(h('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      return h('div', {
        class: 'v-date-picker__display-inner'
      }, [genDisplayValue(data.selected.year), genDisplayValue(displayDate.value)]);
    }

    function genDatepickerDisplay() {
      const propsData = setBackground(props.contentColor, {
        class: {
          'v-date-picker__display': true
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
      return h(VDatePickerYears, propsData);
    }

    function genDatepickerMonthsTable() {
      return h(VDatePickerMonths, {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate
      });
    }

    function genDatepickerDatesTable() {
      return h(VDatePickerDates, {
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
      const propsData = {
        class: {
          'v-date-picker__body': true
        }
      };
      return h('div', propsData, useTransition(data.isYears && genDatepickerYearsTable() || data.isMonths && genDatepickerMonthsTable() || data.isDates && genDatepickerDatesTable(), 'slide-in-left', 'out-in'));
    }

    function genDatepickerInput() {
      return h(VTextField, {
        value: formatDate(),
        dark: props.dark,
        label: props.label,
        readonly: props.readonly,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        onFocus: () => data.isActive = true,
        onInput: onDateInput
      });
    }

    function genDatepickerTable() {
      const propsData = setBackground(props.color, {
        class: tableClasses.value
      });
      return withDirectives(h('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]), [[vShow, data.isActive]]);
    }

    function genDatepicker() {
      const propsData = {
        class: classes.value
      };
      return withDirectives(h('div', propsData, [genDatepickerInput(), useTransition(genDatepickerTable(), 'fade')]), [[clickOutside, directive.value]]);
    }

    return () => genDatepicker();
  }

});
//# sourceMappingURL=VDatePicker.js.map