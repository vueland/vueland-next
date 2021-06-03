"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatePicker = void 0;

require("../../../src/components/VDatePicker/VDatePicker.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

var _useTransition = require("../../effects/use-transition");

var _VTextField = require("../VTextField");

var _VDatepickerHeader = require("./VDatepickerHeader");

var _VDatePickerDates = require("./VDatePickerDates");

var _VDatePickerYears = require("./VDatePickerYears");

var _VDatePickerMonths = require("./VDatePickerMonths");

var _VMenu = require("../VMenu");

var _helpers = require("./helpers");

var _helpers2 = require("../../helpers");

var _utils = require("./utils");

var _locale = require("../../services/locale");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDatePicker = (0, _vue.defineComponent)({
  name: 'v-date-picker',
  props: _objectSpread({
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
      "default": 'en'
    },
    label: String,
    prependIcon: String,
    format: {
      type: String,
      "default": 'yyyy MM dd D'
    },
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    contentColor: {
      type: String,
      "default": 'primary'
    },
    color: {
      type: String,
      "default": 'white'
    }
  }, (0, _useElevation2.elevationProps)()),
  emits: ['update:value', 'update:modelValue', 'selected'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var data = (0, _vue.reactive)({
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

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var localeMonths = _locale.locale[props.lang].monthsAbbr;
    var localeWeek = _locale.locale[props.lang].week;
    var contentColor = props.dark ? 'white' : props.contentColor;
    var handlers = (0, _vue.ref)({});
    var inputRef = (0, _vue.ref)(null);
    var closeConditional = (0, _vue.ref)(false);
    (0, _vue.provide)('handlers', handlers);
    var classes = (0, _vue.computed)(function () {
      return {
        'v-date-picker': true,
        'v-date-picker--typeable': props.typeable,
        'v-date-picker--readonly': !props.typeable || props.readonly
      };
    });
    var tableClasses = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-date-picker__table': true
      }, elevationClasses.value);
    });
    var headerValue = (0, _vue.computed)(function () {
      return data.isYears || data.isMonths ? "".concat(data.tableYear) : data.isDates ? "".concat(data.tableYear, " ").concat(localeMonths[data.tableMonth]) : '';
    });
    var displayDate = (0, _vue.computed)(function () {
      var _data$selected = data.selected,
          month = _data$selected.month,
          date = _data$selected.date,
          day = _data$selected.day;
      return "".concat(localeMonths[month], " ").concat(date, " ").concat(localeWeek[day]);
    });
    var computedValue = (0, _vue.computed)(function () {
      var _data$selected2 = data.selected,
          year = _data$selected2.year,
          month = _data$selected2.month,
          date = _data$selected2.date;
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

    function setDataDate(_ref2) {
      var year = _ref2.year,
          month = _ref2.month,
          date = _ref2.date,
          day = _ref2.day;
      data.tableMonth = month;
      data.tableYear = year;
      data.year = year;
      data.month = month;
      data.date = date;
      data.day = day;
    }

    function setParsedDate() {
      var selectedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var dateForParsing = selectedDate || new Date();
      data.selected = (0, _helpers.parseDate)(dateForParsing);
      !selectedDate && (data.selected["default"] = !selectedDate);
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
      closeConditional.value = true;
      data.selected = date;
      data.tableMonth = date.month;
      data.tableYear = date.year;
      data.convertedDateString = convertToFormat();
      emit('update:value', computedValue.value);
      emit('update:modelValue', computedValue.value);
      emit('selected', computedValue.value);
      requestAnimationFrame(function () {
        return closeConditional.value = false;
      });
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
        var dateArray = date.trim().split(/\W/);

        if (dateArray[0].length < 4) {
          date = dateArray.reverse().join('.');
        }

        return (0, _helpers.parseDate)(new Date(Date.parse(date)));
      }

      return null;
    }

    function convertToFormat() {
      if (!data.selected) return '';
      return (0, _utils.formatDate)(new Date(data.selected.year, data.selected.month, data.selected.date), props.format, _locale.locale[props.lang]);
    }

    function genDisplayValue(value) {
      var propsData = {
        "class": 'v-date-picker__display-value'
      };
      return (0, _useTransition.useTransition)((0, _vue.h)('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      var _data$selected3;

      var propsData = {
        "class": 'v-date-picker__display-inner'
      };
      return (0, _vue.h)('div', propsData, [genDisplayValue((_data$selected3 = data.selected) === null || _data$selected3 === void 0 ? void 0 : _data$selected3.year), genDisplayValue(displayDate.value)]);
    }

    function genDatepickerDisplay() {
      var propsData = setBackground(props.contentColor, {
        "class": {
          'v-date-picker__display': true
        }
      });
      return (0, _vue.h)('div', setTextColor(props.color, propsData), genDatepickerDisplayInner());
    }

    function genDatepickerHeader() {
      return (0, _vue.h)(_VDatepickerHeader.VDatepickerHeader, {
        onNext: function onNext() {
          return handlers.value.onNext();
        },
        onPrev: function onPrev() {
          return handlers.value.onPrev();
        },
        onTable: onTableChange
      }, {
        "default": function _default() {
          return headerValue.value;
        }
      });
    }

    function genDatepickerYearsTable() {
      var propsData = _defineProperty({
        year: data.tableYear
      }, 'onUpdate:year', onYearUpdate);

      return (0, _vue.h)(_VDatePickerYears.VDatePickerYears, propsData);
    }

    function genDatepickerMonthsTable() {
      var _h;

      return (0, _vue.h)(_VDatePickerMonths.VDatePickerMonths, (_h = {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        locale: localeMonths
      }, _defineProperty(_h, 'onUpdate:month', onMonthUpdate), _defineProperty(_h, 'onUpdate:year', onYearUpdate), _h));
    }

    function genDatepickerDatesTable() {
      var _h2;

      return (0, _vue.h)(_VDatePickerDates.VDatePickerDates, (_h2 = {
        locale: localeWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected,
        disabledDates: props.disabledDates
      }, _defineProperty(_h2, 'onUpdate:value', onDateUpdate), _defineProperty(_h2, 'onUpdate:month', onDateMonthUpdate), _h2), {
        date: slots.date && (0, _helpers2.addScopedSlot)('date', slots)
      });
    }

    function genDatepickerBody() {
      var propsData = {
        "class": {
          'v-date-picker__body': true
        }
      };
      return (0, _vue.h)('div', propsData, (0, _useTransition.useTransition)(data.isYears && genDatepickerYearsTable() || data.isMonths && genDatepickerMonthsTable() || data.isDates && genDatepickerDatesTable(), 'slide-in-left', 'out-in'));
    }

    function genDatepickerInput() {
      return (0, _vue.h)(_VTextField.VTextField, {
        value: data.convertedDateString,
        dark: props.dark,
        label: props.label,
        readonly: !props.typeable,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        ref: inputRef,
        onInput: onDateInput,
        onClear: function onClear() {
          data.convertedDateString = '';
          emit('update:value', null);
          emit('update:modelValue', null);
          emit('selected', null);
        }
      });
    }

    function genDatepickerTable() {
      var propsData = setBackground(props.color, {
        "class": tableClasses.value
      });
      return (0, _vue.h)('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]);
    }

    function genMenu() {
      return (0, _vue.h)(_VMenu.VMenu, {
        activator: inputRef,
        internalActivator: true,
        inputActivator: '.v-text-field__input',
        width: 'auto',
        maxHeight: 'auto',
        bottom: props.typeable,
        openOnClick: true,
        closeOnContentClick: closeConditional.value
      }, {
        "default": function _default() {
          return genDatepickerTable();
        }
      });
    }

    function genDatepicker() {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', propsData, [genDatepickerInput(), genMenu()]);
    }

    setInitDate();
    return function () {
      return genDatepicker();
    };
  }
});
exports.VDatePicker = VDatePicker;
//# sourceMappingURL=VDatePicker.js.map