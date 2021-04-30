"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTable = void 0;

require("../../../src/components/VDataTable/VDataTable.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _VDataTableHeader = require("./VDataTableHeader");

var _VDataTableBody = require("./VDataTableBody");

var _VDataTableFooter = require("./VDataTableFooter");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDataTable = (0, _vue.defineComponent)({
  name: 'v-data-table',
  props: {
    cols: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    rows: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    rowsOnTable: {
      type: Array,
      "default": function _default() {
        return [10, 15, 20, 25];
      }
    },
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    align: {
      type: String,
      validator: function validator(val) {
        return ['left', 'center', 'right'].includes(val);
      }
    },
    color: {
      type: String,
      "default": 'white'
    },
    headerProps: Object,
    footerProps: Object
  },
  emits: ['checked', 'filter', 'last-page'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var data = (0, _vue.reactive)({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsPerPage: 20,
      page: 1,
      isAllRowsChecked: false
    });
    var filters = {};

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table': true
      };
    });
    var pages = (0, _vue.computed)(function () {
      var _data$rows;

      return Math.ceil(((_data$rows = data.rows) === null || _data$rows === void 0 ? void 0 : _data$rows.length) / data.rowsPerPage);
    });
    (0, _vue.watch)(function () {
      return props.cols;
    }, function (to) {
      return data.cols = to;
    }, {
      immediate: true
    });
    (0, _vue.watch)(function () {
      return props.rows;
    }, function (to) {
      return data.rows = to;
    }, {
      immediate: true
    });

    function onCheckAll(value) {
      data.isAllRowsChecked = value;
      data.rows.forEach(function (row) {
        return row.checked = value;
      });
    }

    function onCheck(rows) {
      data.checkedRows = rows;
      emit('checked', data.checkedRows);
    }

    function onPrevTable(num) {
      data.page = data.page > 1 ? data.page + num : data.page;
    }

    function onNextTable(num) {
      if (data.rows.length - data.page * data.rowsPerPage > 0) {
        data.page += num;
      }
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        return data.rows.reverse();
      }

      data.cols.forEach(function (c) {
        c.sorted = col.key === c.key;
      });
      sortColumn(col);
    }

    function onFilter(_ref2) {
      var value = _ref2.value,
          col = _ref2.col;

      if (!value && filters[col.key]) {
        delete filters[col.key];
      }

      if (value) filters[col.key] = value;
      if (props.stateOut) emit('filter', filters);

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return data.rows = props.rows;
        }

        data.rows = filterRows(props.rows);
      }

      data.page = 1;
    }

    function onSelectRowsCount(count) {
      data.rowsPerPage = count;
    }

    function sortColumn(col) {
      data.rows.sort(function (a, b) {
        if (col.format) {
          return col.format(a) > col.format(b) ? 1 : -1;
        }

        return a[col.key] > b[col.key] ? 1 : -1;
      });
    }

    function filterRows(rows) {
      var filterKeys = Object.keys(filters);
      return rows.reduce(function (acc, row) {
        var rowResults = [];
        filterKeys.forEach(function (key) {
          var _data$cols$find = data.cols.find(function (col) {
            return col.key === key;
          }),
              format = _data$cols$find.format;

          var value = format ? format(row) : row[key];
          var rowKeyValue = (0, _helpers.toComparableStringFormat)(value);
          var filterValue = (0, _helpers.toComparableStringFormat)(filters[key]);

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(!!row[key]);
          }
        });

        if (rowResults.length === filterKeys.length && rowResults.every(function (value) {
          return !!value;
        })) {
          acc.push(row);
        }

        return acc;
      }, []);
    }

    function genTableTools() {
      var propsData = {
        "class": 'v-data-table__toolbar'
      };
      return (0, _vue.h)('div', propsData, {
        "default": function _default() {
          return slots.toolbar && slots.toolbar();
        }
      });
    }

    function genTableHeader() {
      var propsData = _objectSpread({
        cols: data.cols,
        color: props.headerColor || props.color,
        checkbox: props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter: onFilter,
        onSort: onSort,
        onCheckAll: onCheckAll
      }, props.headerProps);

      return (0, _vue.h)(_VDataTableHeader.VDataTableHeader, propsData);
    }

    function genTableBody() {
      var propsData = {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsPerPage: data.rowsPerPage,
        checkbox: props.checkbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        numbered: props.numbered,
        onCheck: onCheck
      };
      var content = props.cols.reduce(function (acc, col) {
        var slotContent = function slotContent(row) {
          var scoped = {
            row: row
          };

          if (col.format) {
            scoped.format = col.format;
          }

          return slots[col.key] && slots[col.key](scoped);
        };

        if (slots[col.key]) acc[col.key] = slotContent;
        return acc;
      }, {});
      return (0, _vue.h)(_VDataTableBody.VDataTableBody, propsData, content);
    }

    function genTableFooter() {
      var _data$rows2;

      var propsData = {
        pages: pages.value,
        page: data.page,
        counts: props.rowsOnTable,
        tableRowsCount: (_data$rows2 = data.rows) === null || _data$rows2 === void 0 ? void 0 : _data$rows2.length,
        allRowsCount: props.rows.length,
        rowsPerPage: data.rowsPerPage,
        dark: props.dark,
        color: props.color,
        toolbar: props.toolbar,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
        onLastPage: function onLastPage(val) {
          return emit('last-page', val);
        },
        onResetPage: function onResetPage(val) {
          return data.page += val;
        }
      };
      return (0, _vue.h)(_VDataTableFooter.VDataTableFooter, propsData);
    }

    function genTableInner() {
      var propsData = {
        "class": 'v-data-table__inner'
      };
      return (0, _vue.h)('div', propsData, [genTableHeader(), genTableBody()]);
    }

    return function () {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', setBackground(props.color, propsData), [slots.toolbar && genTableTools(), genTableInner(), genTableFooter()]);
    };
  }
});
exports.VDataTable = VDataTable;
//# sourceMappingURL=VDataTable.js.map