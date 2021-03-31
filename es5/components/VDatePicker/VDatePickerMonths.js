"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatePickerMonths = void 0;

require("../../../src/components/VDatePicker/VDatePickerMonths.scss");

var _vue = require("vue");

var _helpers = require("./helpers");

var VDatePickerMonths = (0, _vue.defineComponent)({
  name: 'v-date-picker-months',
  props: {
    lang: {
      type: String,
      "default": 'en'
    },
    month: [String, Number],
    year: [String, Number],
    localMonths: [Array]
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var CELLS_IN_ROW = 3;
    var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var CURRENT_MONTH = new Date().getMonth();
    var handlers = (0, _vue.inject)('handlers');
    handlers.value = {
      onNext: function onNext() {
        return updateYear(true);
      },
      onPrev: function onPrev() {
        return updateYear(false);
      }
    };
    var computedMonth = (0, _vue.computed)({
      get: function get() {
        return props.month !== undefined ? +props.month : CURRENT_MONTH;
      },
      set: function set(val) {
        emit('update:month', val);
      }
    });

    function updateYear(isNext) {
      var year = +props.year + (isNext ? 1 : -1);
      emit('update:year', year);
    }

    function genMonthCell(month) {
      var isSelected = month === computedMonth.value;
      var propsData = {
        "class": {
          'v-date-picker-months__cell': true,
          'v-date-picker-months__cell--selected': isSelected,
          'v-date-picker-months__cell--current-month': month === CURRENT_MONTH
        },
        onClick: function onClick() {
          return computedMonth.value = month;
        }
      };
      return (0, _vue.h)('div', propsData, props.localMonths[month]);
    }

    function genMonthRows() {
      var monthsVNodes = MONTHS.map(genMonthCell);
      return (0, _helpers.genTableRows)(monthsVNodes, 'v-date-picker-months__row', CELLS_IN_ROW);
    }

    return function () {
      var propsData = {
        "class": {
          'v-date-picker-months': true
        }
      };
      return (0, _vue.h)('div', propsData, genMonthRows());
    };
  }
});
exports.VDatePickerMonths = VDatePickerMonths;
//# sourceMappingURL=VDatePickerMonths.js.map