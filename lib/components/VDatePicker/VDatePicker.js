import "../../../src/components/VDatePicker/VDatePicker.scss";
import { h, ref, reactive, provide, computed, withDirectives, defineComponent } from 'vue';
import { vShow } from 'vue';
import { clickOutside } from '../../directives';
import { useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { useTransition } from '../../effects/use-transition';
import { VTextField } from '../VTextField';
import { VDatepickerHeader } from './VDatepickerHeader';
import { VDatePickerDates } from './VDatePickerDates';
import { VDatePickerYears } from './VDatePickerYears';
import { VDatePickerMonths } from './VDatePickerMonths';
import { parseDate } from './helpers';
import { dateStringSeparator } from './util';
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
    contentColor: String,
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
      convertedDateString: null,
      isYears: false,
      isMonths: false,
      isDates: true,
      isActive: false
    });
    const localMonths = locale[props.lang].months;
    const localWeek = locale[props.lang].week;
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
    setInitDate();
    const classes = computed(() => ({
      'v-date-picker': true,
      'v-date-picker--typeable': !props.readonly,
      'v-date-picker--readonly': props.readonly
    }));
    const tableClasses = computed(() => ({
      'v-date-picker__table': true,
      ...elevationClasses.value
    }));
    const headerValue = computed(() => {
      return data.isYears || data.isMonths ? `${data.tableYear}` : data.isDates ? `${data.tableYear} ${localMonths[data.tableMonth]}` : '';
    });
    const displayDate = computed(() => {
      const {
        month,
        date,
        day
      } = data.selected;
      return `${localMonths[month]} ${date} ${localWeek[day]}`;
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

    function setInitDate() {
      if (props.value) setParsedDate(props.value);else if (props.modelValue) setParsedDate(props.modelValue);else setParsedDate();

      if (props.today || props.value || props.modelValue) {
        data.convertedDateString = convertToFormat();
      }
    }

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

    function onYearUpdate(year) {
      data.tableYear = year;
      data.isMonths = true;
      data.isYears = false;
    }

    function onMonthUpdate(month) {
      data.tableMonth = month;
      data.isMonths = false;
      data.isYears = false;
      data.isDates = true;
    }

    function onDateUpdate(date) {
      if (!date) return;
      data.selected = date;
      const converted = convertToFormat();
      const dateValue = computedValue.value || converted;
      data.convertedDateString = converted;
      emit('update:value', dateValue);
      emit('update:modelValue', dateValue);
      emit('selected', dateValue);
      data.isActive = false;
    }

    function onDateMonthUpdate(dateObject) {
      data.tableMonth = dateObject.month;
      if (dateObject.year) data.tableYear = dateObject.year;
    }

    function onDateInput(date) {
      data.isActive = false;
      data.convertedDateString = null;
      if (date.length !== props.format.length) return;
      onDateUpdate(stringToDate(date));
    }

    function stringToDate(stringDate) {
      const date = {};
      const {
        separated: dateArray
      } = dateStringSeparator(stringDate);
      const {
        separated
      } = dateStringSeparator(props.format);
      if (!separated) return null;
      separated.forEach((it, i) => date[it] = +dateArray[i]);
      return parseDate(new Date(date.yyyy, date.mm - 1, date.dd));
    }

    function convertToFormat() {
      if (!data.selected) return '';
      const {
        separated,
        symbol
      } = dateStringSeparator(props.format);
      const isLocal = separated.includes('MM');
      const dateParams = {
        yyyy: data.selected.year,
        mm: data.selected.month + 1,
        dd: data.selected.date,
        MM: localMonths[data.selected.month]
      };
      let dateString = '';

      for (const val of separated) {
        if (val.length === 2 && dateParams[val] < 10) {
          dateString += '0' + dateParams[val];
        } else {
          dateString += dateParams[val];
        }

        dateString += dateString.length < 10 ? !isLocal ? symbol : ' ' : '';
      }

      return dateString;
    }

    function genDisplayValue(value) {
      const propsData = {
        class: 'v-date-picker__display-value'
      };
      return useTransition(h('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      const propsData = {
        class: 'v-date-picker__display-inner'
      };
      return h('div', propsData, [genDisplayValue(data.selected.year), genDisplayValue(displayDate.value)]);
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
        localMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate
      });
    }

    function genDatepickerDatesTable() {
      return h(VDatePickerDates, {
        localWeek,
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
        value: data.convertedDateString,
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