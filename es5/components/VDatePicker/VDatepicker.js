"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatepicker = void 0;

require("../../../src/components/VDatePicker/VDatepicker.scss");

var _vue = require("vue");

var _directives = require("../../directives");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

var _useTransition = require("../../effects/use-transition");

var _helpers = require("./helpers");

var _VTextField = require("../VTextField");

var _VDatepickerHeader = require("./VDatepickerHeader");

var _VDates = require("./VDates");

var _VYears = require("./VYears");

var _VMonths = require("./VMonths");

var _locale = require("../../services/locale");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDatepicker = (0, _vue.defineComponent)({
  name: 'v-datepicker',
  props: _objectSpread(_objectSpread({
    dark: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    mondayFirst: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    lang: String,
    contentColor: String,
    label: String,
    format: {
      type: String,
      "default": 'yyyy-mm-dd'
    },
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object
  }, (0, _useColors2.colorProps)()), (0, _useElevation2.elevationProps)()),
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
      isYears: false,
      isMonths: false,
      isDates: true,
      isActive: false
    });
    var localeMonths = _locale.locale[props.lang].months;
    var localeWeek = _locale.locale[props.lang].week;
    var contentColor = props.dark ? 'white' : props.contentColor;
    var handlers = (0, _vue.ref)({});

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    (0, _vue.provide)('handlers', handlers);
    (0, _vue.watch)(function () {
      return props.value || props.modelValue;
    }, setParsedDate, {
      immediate: true
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-datepicker__table': true
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
      if (props.useMls) return new Date(year, month, date).getTime();
      if (props.useUtc) return new Date(year, month, date).toUTCString();
      return formatDate();
    });
    var directive = (0, _vue.computed)(function () {
      return data.isActive ? {
        handler: function handler() {
          return data.isActive = false;
        },
        closeConditional: false
      } : undefined;
    });

    function formatDate() {
      var separator = props.format.match(/(\.|-|\\|\/)/)[0];
      var keys = props.format.split(separator);
      var formatObject = {
        y: data.selected.year,
        m: data.selected.month + 1,
        d: data.selected.date
      };
      var dateString = '';

      for (var i = 0; i < keys.length; i += 1) {
        if (keys[i].length === 2 && formatObject[keys[i][0]] < 10) {
          dateString += '0' + formatObject[keys[i][0]];
        } else {
          dateString += formatObject[keys[i][0]];
        }

        dateString += i < keys.length - 1 ? separator : '';
      }

      return dateString;
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

    function setParsedDate(selectedDate) {
      var dateForParsing = selectedDate || new Date();

      var _parseDate = (0, _helpers.parseDate)(dateForParsing),
          year = _parseDate.year,
          month = _parseDate.month,
          day = _parseDate.day,
          date = _parseDate.date;

      data.selected = {
        year: year,
        month: month,
        day: day,
        date: date
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
      data.isActive = false;
    }

    function onDateMonthUpdate($event) {
      data.tableMonth = $event.month;
      if ($event.year) data.tableYear = $event.year;
    }

    function genDisplayValue(value) {
      var propsData = {
        "class": {
          'v-datepicker__display-value': true
        },
        key: value
      };
      return (0, _useTransition.useTransition)((0, _vue.h)('span', propsData, value), 'scale-in-out', 'out-in');
    }

    function genDatepickerDisplayInner() {
      return (0, _vue.h)('div', {
        "class": 'v-datepicker__display-inner'
      }, [genDisplayValue(data.selected.year), genDisplayValue(displayDate.value)]);
    }

    function genDatepickerDisplay() {
      var propsData = setBackground(props.contentColor, {
        "class": {
          'v-datepicker__display': true
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

      return (0, _vue.h)(_VYears.VYears, propsData);
    }

    function genDatepickerMonthsTable() {
      var _h;

      return (0, _vue.h)(_VMonths.VMonths, (_h = {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        localeMonths: localeMonths
      }, _defineProperty(_h, 'onUpdate:month', onMonthUpdate), _defineProperty(_h, 'onUpdate:year', onYearUpdate), _h));
    }

    function genDatepickerDatesTable() {
      var _h2;

      return (0, _vue.h)(_VDates.VDates, (_h2 = {
        localeWeek: localeWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected
      }, _defineProperty(_h2, 'onUpdate:value', onDateUpdate), _defineProperty(_h2, 'onUpdate:month', onDateMonthUpdate), _h2));
    }

    function genDatepickerBody() {
      return (0, _vue.h)('div', {
        "class": {
          'v-datepicker__body': true
        }
      }, (0, _useTransition.useTransition)(data.isYears && genDatepickerYearsTable() || data.isMonths && genDatepickerMonthsTable() || data.isDates && genDatepickerDatesTable(), 'slide-in-left', 'out-in'));
    }

    function genDatepickerInput() {
      return (0, _vue.h)(_VTextField.VTextField, {
        value: computedValue.value,
        label: props.label,
        readonly: props.readonly,
        disabled: props.disabled,
        onFocus: function onFocus() {
          return data.isActive = true;
        }
      });
    }

    function genDatepickerTable() {
      var propsData = setBackground(props.color, {
        "class": classes.value
      });
      return (0, _vue.withDirectives)((0, _vue.h)('div', setTextColor(contentColor, propsData), [genDatepickerDisplay(), genDatepickerHeader(), genDatepickerBody()]), [[_vue.vShow, data.isActive]]);
    }

    function genDatepicker() {
      return (0, _vue.withDirectives)((0, _vue.h)('div', {
        "class": {
          'v-datepicker': true
        }
      }, [genDatepickerInput(), (0, _useTransition.useTransition)(genDatepickerTable(), 'fade')]), [[_directives.vClickOutside, directive.value]]);
    }

    return function () {
      return genDatepicker();
    };
  }
});
exports.VDatepicker = VDatepicker;
//# sourceMappingURL=VDatepicker.js.map