"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatePicker = void 0;

require("../../../src/components/VDatePicker/VDatePicker.scss");

var _vue = require("vue");

var _directives = require("../../directives");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

var _useTransition = require("../../effects/use-transition");

var _VTextField = require("../VTextField");

var _VDatepickerHeader = require("./VDatepickerHeader");

var _VDatePickerDates = require("./VDatePickerDates");

var _VDatePickerYears = require("./VDatePickerYears");

var _VDatePickerMonths = require("./VDatePickerMonths");

var _helpers = require("./helpers");

var _util = require("./util");

var _locale = require("../../services/locale");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDatePicker = (0, _vue.defineComponent)({
  name: 'v-date-picker',
  props: _objectSpread({
    dark: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    readonly: {
      type: Boolean,
      "default": true
    },
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    useIso: Boolean,
    useJson: Boolean,
    lang: {
      type: String,
      "default": 'en'
    },
    label: String,
    prependIcon: String,
    format: {
      type: String,
      "default": 'yyyy-mm-dd'
    },
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    contentColor: String,
    color: {
      type: String,
      "default": 'white'
    }
  }, (0, _useElevation2.elevationProps)()),
  emits: ['update:value', 'update:modelValue', 'selected'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
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
    var localMonths = _locale.locale[props.lang].months;
    var localWeek = _locale.locale[props.lang].week;
    var contentColor = props.dark ? 'white' : props.contentColor;
    var handlers = (0, _vue.ref)({});

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    (0, _vue.provide)('handlers', handlers);
    setInitDate();
    var classes = (0, _vue.computed)(function () {
      return {
        'v-date-picker': true,
        'v-date-picker--typeable': !props.readonly,
        'v-date-picker--readonly': props.readonly
      };
    });
    var tableClasses = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-date-picker__table': true
      }, elevationClasses.value);
    });
    var headerValue = (0, _vue.computed)(function () {
      return data.isYears || data.isMonths ? "".concat(data.tableYear) : data.isDates ? "".concat(data.tableYear, " ").concat(localMonths[data.tableMonth]) : '';
    });
    var displayDate = (0, _vue.computed)(function () {
      var _data$selected = data.selected,
          month = _data$selected.month,
          date = _data$selected.date,
          day = _data$selected.day;
      return "".concat(localMonths[month], " ").concat(date, " ").concat(localWeek[day]);
    });
    var computedValue = (0, _vue.computed)(function () {
      var _data$selected2 = data.selected,
          year = _data$selected2.year,
          month = _data$selected2.month,
          date = _data$selected2.date;
      var selectedDate = new Date(year, month, date);
      if (props.useMls) return selectedDate.getTime();
      if (props.useUtc) return selectedDate.toUTCString();
      if (props.useIso) return selectedDate.toISOString();
      if (props.useJson) return selectedDate.toJSON();
      return selectedDate;
    });
    var directive = (0, _vue.computed)(function () {
      return data.isActive ? {
        handler: function handler() {
          return data.isActive = false;
        },
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
      var converted = convertToFormat();
      var dateValue = computedValue.value || converted;
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
      var date = {};

      var _dateStringSeparator = (0, _util.dateStringSeparator)(stringDate),
          dateArray = _dateStringSeparator.separated;

      var _dateStringSeparator2 = (0, _util.dateStringSeparator)(props.format),
          separated = _dateStringSeparator2.separated;

      if (!separated) return null;
      separated.forEach(function (it, i) {
        return date[it] = +dateArray[i];
      });
      return (0, _helpers.parseDate)(new Date(date.yyyy, date.mm - 1, date.dd));
    }

    function convertToFormat() {
      if (!data.selected) return '';

      var _dateStringSeparator3 = (0, _util.dateStringSeparator)(props.format),
          separated = _dateStringSeparator3.separated,
          symbol = _dateStringSeparator3.symbol;

      var isLocal = separated.includes('MM');
      var dateParams = {
        yyyy: data.selected.year,
        mm: data.selected.month + 1,
        dd: data.selected.date,
        MM: localMonths[data.selected.month]
      };
      var dateString = '';

      var _iterator = _createForOfIteratorHelper(separated),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var val = _step.value;

          if (val.length === 2 && dateParams[val] < 10) {
            dateString += '0' + dateParams[val];
          } else {
            dateString += dateParams[val];
          }

          dateString += dateString.length < 10 ? !isLocal ? symbol : ' ' : '';
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return dateString;
    }

    function genDisplayValue(value) {
      var propsData = {
        "class": 'v-date-picker__display-value'
      };
      return (0, _useTransition.useTransition)((0, _vue.h)('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      var propsData = {
        "class": 'v-date-picker__display-inner'
      };
      return (0, _vue.h)('div', propsData, [genDisplayValue(data.selected.year), genDisplayValue(displayDate.value)]);
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
        localMonths: localMonths
      }, _defineProperty(_h, 'onUpdate:month', onMonthUpdate), _defineProperty(_h, 'onUpdate:year', onYearUpdate), _h));
    }

    function genDatepickerDatesTable() {
      var _h2;

      return (0, _vue.h)(_VDatePickerDates.VDatePickerDates, (_h2 = {
        localWeek: localWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected
      }, _defineProperty(_h2, 'onUpdate:value', onDateUpdate), _defineProperty(_h2, 'onUpdate:month', onDateMonthUpdate), _h2));
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
        readonly: props.readonly,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        onFocus: function onFocus() {
          return data.isActive = true;
        },
        onInput: onDateInput
      });
    }

    function genDatepickerTable() {
      var propsData = setBackground(props.color, {
        "class": tableClasses.value
      });
      return (0, _vue.withDirectives)((0, _vue.h)('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]), [[_vue.vShow, data.isActive]]);
    }

    function genDatepicker() {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.withDirectives)((0, _vue.h)('div', propsData, [genDatepickerInput(), (0, _useTransition.useTransition)(genDatepickerTable(), 'fade')]), [[_directives.clickOutside, directive.value]]);
    }

    return function () {
      return genDatepicker();
    };
  }
});
exports.VDatePicker = VDatePicker;
//# sourceMappingURL=VDatePicker.js.map