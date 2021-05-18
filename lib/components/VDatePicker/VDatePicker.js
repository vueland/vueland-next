import "../../../src/components/VDatePicker/VDatePicker.scss";
import { computed, defineComponent, h, provide, reactive, ref } from 'vue';
import { useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { useTransition } from '../../effects/use-transition';
import { VTextField } from '../VTextField';
import { VDatepickerHeader } from './VDatepickerHeader';
import { VDatePickerDates } from './VDatePickerDates';
import { VDatePickerYears } from './VDatePickerYears';
import { VDatePickerMonths } from './VDatePickerMonths';
import { VMenu } from '../VMenu';
import { parseDate } from './helpers';
import { addScopedSlot } from '../../helpers';
import { formatDate } from './utils';
import { locale } from '../../services/locale';
export const VDatePicker = defineComponent({
  name: 'v-date-picker',
  props: {
    dark: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    typeable: Boolean,
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    lang: {
      type: String,
      default: 'en'
    },
    label: String,
    prependIcon: String,
    format: {
      type: String,
      default: 'yyyy MM dd D'
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
    emit,
    slots
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
    const localeMonths = locale[props.lang].monthsAbbr;
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
      'v-date-picker--typeable': props.typeable,
      'v-date-picker--readonly': !props.typeable || props.readonly
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
      return `${localeMonths[month]} ${date} ${localWeek[day]}`;
    });
    const computedValue = computed(() => {
      const {
        year,
        month,
        date
      } = data.selected;
      return new Date(year, month, date);
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
      data.tableMonth = date.month;
      data.tableYear = date.year;
      data.convertedDateString = convertToFormat();
      emit('update:value', computedValue.value);
      emit('update:modelValue', computedValue.value);
      emit('selected', computedValue.value);
    }

    function onDateMonthUpdate(dateObject) {
      data.tableMonth = dateObject.month;
      if (dateObject.year) data.tableYear = dateObject.year;
    }

    function onDateInput(date) {
      onDateUpdate(stringToDate(date));
    }

    function stringToDate(date) {
      if (date.length === 10) {
        const dateArray = date.trim().split(/\W/);

        if (dateArray[0].length < 4) {
          date = dateArray.reverse().join('.');
        }

        return parseDate(new Date(Date.parse(date)));
      }

      return null;
    }

    function convertToFormat() {
      if (!data.selected) return '';
      return formatDate(new Date(data.selected.year, data.selected.month, data.selected.date), props.format, locale[props.lang]);
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
        locale: localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate
      });
    }

    function genDatepickerDatesTable() {
      return h(VDatePickerDates, {
        locale: localWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected,
        disabledDates: props.disabledDates,
        ['onUpdate:value']: onDateUpdate,
        ['onUpdate:month']: onDateMonthUpdate
      }, {
        date: slots.date && addScopedSlot('date', slots)
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
        readonly: !props.typeable,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        onInput: onDateInput,
        onClear: () => {
          data.convertedDateString = '';
          emit('update:value', null);
          emit('update:modelValue', null);
          emit('selected', null);
        }
      });
    }

    function genDatepickerTable() {
      const propsData = setBackground(props.color, {
        class: tableClasses.value
      });
      return h('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]);
    }

    function genDatepicker() {
      const propsData = {
        class: classes.value
      };
      const content = {
        activator: () => genDatepickerInput(),
        content: () => genDatepickerTable()
      };
      const menu = h(VMenu, {
        width: 'auto',
        maxHeight: 'auto',
        offsetY: props.typeable ? -70 : 0,
        openOnClick: true,
        closeOnContentClick: false
      }, content);
      return h('div', propsData, menu);
    }

    return () => genDatepicker();
  }

});
//# sourceMappingURL=VDatePicker.js.map