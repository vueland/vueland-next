"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VYears = void 0;

require("../../../src/components/VDatePicker/VYears.scss");

var _vue = require("vue");

var _helpers = require("./helpers");

var _useTransition = require("../../effects/use-transition");

var VYears = (0, _vue.defineComponent)({
  name: 'v-years',
  props: {
    year: [Number, String]
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var LIMIT = 100;
    var ON_TABLE = 20;
    var CELLS_IN_ROW = 4;
    var CURRENT_YEAR = new Date().getFullYear();
    var ANIMATION_TIMEOUT = 100;
    var years = (0, _vue.ref)([]);
    var onTableIndex = (0, _vue.ref)(0);
    var isListChanged = (0, _vue.ref)(false);
    var transition = (0, _vue.ref)('');
    var handlers = (0, _vue.inject)('handlers');
    (0, _vue.watchEffect)(function () {
      return isListChanged.value && setTimeout(function () {
        isListChanged.value = false;
      }, ANIMATION_TIMEOUT);
    });
    var computedYear = (0, _vue.computed)({
      get: function get() {
        return +props.year || CURRENT_YEAR;
      },
      set: function set(val) {
        emit('update:year', val);
      }
    });

    if (handlers !== null && handlers !== void 0 && handlers.value) {
      handlers.value = {
        onNext: function onNext() {
          return changeYearsList(true);
        },
        onPrev: function onPrev() {
          return changeYearsList(false);
        }
      };
    }

    function setCurrentTransition(isNext) {
      transition.value = isNext ? 'fade-in-down' : 'fade-in-up';
    }

    function setTableIndex() {
      onTableIndex.value = years.value.findIndex(function (row) {
        return row.find(function (year) {
          return year === computedYear.value;
        });
      });
    }

    function changeYearsList(isNext) {
      var max = years.value.length - 1;
      var val = isNext ? 1 : -1;
      if (onTableIndex.value === max && val > 0 || onTableIndex.value === 0 && val < 0) return;
      setCurrentTransition(isNext);
      onTableIndex.value += val;
      isListChanged.value = true;
    }

    function genTableYears() {
      var fromYear = CURRENT_YEAR - LIMIT;
      var maxYears = LIMIT * 2;
      var yearsList = [];

      for (var i = 0; i <= maxYears; i += 1) {
        if (yearsList.length === ON_TABLE) {
          years.value.push(yearsList);
          yearsList = [];
        }

        yearsList.push(fromYear + i);
      }
    }

    function genYearCell(year) {
      var isSelected = year === computedYear.value;
      var propsData = {
        "class": {
          'v-years__cell': true,
          'v-years__cell--selected': isSelected,
          'v-years__cell--current-year': year === CURRENT_YEAR
        },
        onClick: function onClick() {
          return computedYear.value = year;
        }
      };
      return (0, _vue.h)('div', propsData, year);
    }

    function genYearsRows() {
      var currentYears = years.value[onTableIndex.value];
      var yearsVNodes = currentYears.map(genYearCell);
      return (0, _helpers.genTableRows)(yearsVNodes, 'v-years__row', CELLS_IN_ROW);
    }

    function genYears() {
      var propsData = {
        "class": 'v-years__years'
      };
      return !isListChanged.value && (0, _vue.h)('div', propsData, genYearsRows()) || null;
    }

    genTableYears();
    setTableIndex();
    return function () {
      var content = (0, _useTransition.useTransition)(genYears(), transition.value);
      var propsData = {
        "class": {
          'v-years': true
        }
      };
      return (0, _vue.h)('div', propsData, content);
    };
  }
});
exports.VYears = VYears;
//# sourceMappingURL=VYears.js.map