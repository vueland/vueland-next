"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatePickerDates = void 0;

require("../../../src/components/VDatePicker/VDatePickerDates.scss");

var _vue = require("vue");

var _helpers = require("./helpers");

var _useTransition = require("../../effects/use-transition");

var VDatePickerDates = (0, _vue.defineComponent)({
  name: 'v-date-picker-dates',
  props: {
    localWeek: Array,
    year: [String, Number],
    month: [String, Number],
    date: [String, Number],
    value: Object,
    mondayFirst: Boolean
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var FIRST_MONTH = 0;
    var LAST_MONTH = 11;
    var WEEK = [0, 1, 2, 3, 4, 5, 6];
    var ANIMATION_TIMEOUT = 100;
    var dates = (0, _vue.ref)([]);
    var isDatesChanged = (0, _vue.ref)(false);
    var today = (0, _helpers.parseDate)(new Date());
    var handlers = (0, _vue.inject)('handlers');
    handlers.value = {
      onNext: function onNext() {
        return updateMonth(true);
      },
      onPrev: function onPrev() {
        return updateMonth(false);
      }
    };

    if (props.mondayFirst) {
      WEEK.push(WEEK.splice(0, 1)[0]);
    }

    var daysInMonth = (0, _vue.computed)(function () {
      return new Date(props.year, props.month + 1, 0).getDate();
    });
    (0, _vue.watch)(function () {
      return props.month;
    }, function () {
      return genTableDates();
    }, {
      immediate: true
    });
    (0, _vue.watch)(function () {
      return isDatesChanged.value;
    }, function () {
      return setTimeout(function () {
        isDatesChanged.value = false;
      }, ANIMATION_TIMEOUT);
    });

    function updateMonth(isNext) {
      var params = {};
      params.month = props.month + (isNext ? 1 : -1);
      if (!isNext && params.month < FIRST_MONTH) params.month = LAST_MONTH;
      if (isNext && params.month > LAST_MONTH) params.month = FIRST_MONTH;
      if (isNext && !params.month) params.year = props.year + 1;
      if (!isNext && params.month === LAST_MONTH) params.year = props.year - 1;
      isDatesChanged.value = true;
      emit('update:month', params);
    }

    function genWeekDays() {
      var propsData = {
        "class": 'v-date-picker-dates__day'
      };
      return WEEK.map(function (day) {
        return (0, _vue.h)('span', propsData, props.localWeek[day]);
      });
    }

    function genDateObject(date) {
      var year = props.year,
          month = props.month;
      return (0, _helpers.parseDate)(new Date(year, month, date));
    }

    function setEmptiesBeforeFirstDate(dateObject) {
      var firstDay = WEEK[0];
      var startDay = firstDay && !dateObject.day ? dateObject.day : firstDay;
      var tillDay = firstDay && !dateObject.day ? WEEK.length - 1 : dateObject.day;

      for (var i = startDay; i <= tillDay; i += 1) {
        dates.value[i] = {
          date: null
        };
      }

      dates.value[tillDay] = dateObject;
    }

    function genTableDates() {
      dates.value = [];

      for (var i = 1; i <= daysInMonth.value; i += 1) {
        var dateObject = genDateObject(i);

        if (i === 1) {
          setEmptiesBeforeFirstDate(dateObject);
        } else {
          dates.value[dates.value.length] = dateObject;
        }
      }
    }

    function compareDates(date1, date2) {
      return date1.date === date2.date && date1.month === date2.month && date1.year === date2.year;
    }

    function genDateCell(dateObject) {
      var propsData = {
        "class": {
          'v-date-picker-dates__cell': !!dateObject.date,
          'v-date-picker-dates__cell--empty': !dateObject.date,
          'v-date-picker-dates__cell--selected': compareDates(dateObject, props.value),
          'v-date-picker-dates__cell--current-date': compareDates(dateObject, today),
          'v-date-picker-dates__cell--holiday': dateObject.isHoliday
        },
        onClick: function onClick() {
          return dateObject.date && emit('update:value', dateObject);
        }
      };
      return (0, _vue.h)('div', propsData, dateObject.date);
    }

    function genDateCells() {
      return dates.value.reduce(function (acc, dateObject) {
        acc.push(genDateCell(dateObject));
        return acc;
      }, []);
    }

    function genDateRows() {
      var datesVNodes = genDateCells();
      return (0, _helpers.genTableRows)(datesVNodes, 'v-date-picker-dates__row', WEEK.length);
    }

    function genDates() {
      return !isDatesChanged.value && (0, _vue.h)('div', {
        "class": 'v-date-picker-dates__dates'
      }, genDateRows()) || null;
    }

    function genWeek() {
      return (0, _vue.h)('div', {
        "class": 'v-date-picker-dates__week'
      }, genWeekDays());
    }

    return function () {
      return (0, _vue.h)('div', {
        "class": 'v-date-picker-dates'
      }, [genWeek(), (0, _useTransition.useTransition)(genDates(), 'fade')]);
    };
  }
});
exports.VDatePickerDates = VDatePickerDates;
//# sourceMappingURL=VDatePickerDates.js.map