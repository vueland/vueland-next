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
    dark: Boolean,
    showSequence: Boolean,
    showCheckbox: Boolean,
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
    headerOptions: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    footerOptions: {
      type: Object,
      "default": function _default() {
        return {
          rowsPerPageOptions: [5, 10, 15, 20]
        };
      }
    },
    customFilter: Function
  },
  emits: ['last-page', 'select:row', 'click:row', 'dblclick:row', 'contextmenu:row'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var data = (0, _vue.reactive)({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsOnPage: 20,
      page: 1,
      isAllRowsChecked: false
    });

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var filters = {};
    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table': true
      };
    });
    var headerOptions = (0, _vue.computed)(function () {
      return _objectSpread({
        color: props.color,
        dark: props.dark
      }, props.headerOptions);
    });
    var footerOptions = (0, _vue.computed)(function () {
      return _objectSpread({
        color: props.color,
        dark: props.dark
      }, props.footerOptions);
    });
    var pages = (0, _vue.computed)(function () {
      var _data$rows;

      return Math.ceil(((_data$rows = data.rows) === null || _data$rows === void 0 ? void 0 : _data$rows.length) / data.rowsOnPage);
    });
    var firstOnPage = (0, _vue.computed)(function () {
      return data.page === 1 ? 1 : (data.page - 1) * data.rowsOnPage + 1;
    });
    var lastOnPage = (0, _vue.computed)(function () {
      var _data$rows2, _data$rows3;

      return data.page * data.rowsOnPage > ((_data$rows2 = data.rows) === null || _data$rows2 === void 0 ? void 0 : _data$rows2.length) ? (_data$rows3 = data.rows) === null || _data$rows3 === void 0 ? void 0 : _data$rows3.length : data.page * data.rowsOnPage;
    });
    var pageCorrection = (0, _vue.computed)(function () {
      var _data$rows4;

      if ((data.page - 1) * data.rowsOnPage > ((_data$rows4 = data.rows) === null || _data$rows4 === void 0 ? void 0 : _data$rows4.length)) {
        var _data$rows5;

        return Math.ceil((data.page * data.rowsOnPage - ((_data$rows5 = data.rows) === null || _data$rows5 === void 0 ? void 0 : _data$rows5.length)) / data.rowsOnPage);
      }

      return null;
    });
    (0, _vue.watch)(function () {
      return props.cols;
    }, function (to) {
      return data.cols = Object.assign([], to);
    }, {
      immediate: true
    });
    (0, _vue.watch)(function () {
      return props.rows;
    }, function (to) {
      return data.rows = Object.assign([], to);
    }, {
      immediate: true
    });

    function onSelectAll(value) {
      data.isAllRowsChecked = value;
      data.rows.forEach(function (row) {
        return row.checked = value;
      });
    }

    function onSelect(rows) {
      data.checkedRows = rows;
      emit('select:row', data.checkedRows);
    }

    function onPrevPage(num) {
      data.page = data.page > 1 ? data.page + num : data.page;
    }

    function onNextPage(num) {
      if (data.rows.length - data.page * data.rowsOnPage > 0) {
        data.page += num;
      }
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        return sortColumn(col);
      }

      data.cols.forEach(function (c) {
        return c.sorted = col.key === c.key;
      });
      sortColumn(col);
    }

    function sortColumn(col) {
      if (!col.sorted) {
        return data.rows.reverse();
      }

      var executor = col.sort || function (a, b) {
        if (col.format) return col.format(a) > col.format(b) ? 1 : -1;
        if (col.sorted) return a[col.key] > b[col.key] ? 1 : -1;
      };

      data.rows.sort(executor);
    }

    function onFilter(_ref2) {
      var value = _ref2.value,
          col = _ref2.col;
      if (!value && filters[col.key]) delete filters[col.key];
      if (value) filters[col.key] = value;

      if (col.filter) {
        return data.rows = col.filter({
          value: value,
          col: col
        });
      }

      if (props.customFilter) {
        return props.customFilter(filters);
      }

      if (!Object.keys(filters).length) {
        return data.rows = props.rows;
      }

      data.rows = filterRows(props.rows, props.cols);
      data.page = 1;
    }

    function onSelectRowsCount(count) {
      data.rowsOnPage = count;
    }

    function filterRows(rows, cols) {
      var filterKeys = Object.keys(filters);
      return rows.reduce(function (acc, row) {
        var rowResults = [];
        filterKeys.forEach(function (key) {
          var _cols$find = cols.find(function (col) {
            return col.key === key;
          }),
              format = _cols$find.format;

          var value = format ? format(row) : row[key];
          var rowKeyValue = "".concat(value).toLowerCase();
          var filterValue = "".concat(filters[key]).toLowerCase();

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(row[key]);
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
      var propsData = {
        cols: data.cols,
        color: props.color,
        showCheckbox: !!props.showCheckbox,
        dark: props.dark,
        align: props.align,
        showSequence: props.showSequence,
        options: headerOptions.value,
        onFilter: onFilter,
        onSort: onSort,
        onSelectAll: onSelectAll
      };
      var content = data.cols.reduce(function (acc, col) {
        var slotName = "".concat(col.key, "-filter");

        if (col && slots[slotName]) {
          acc[slotName] = (0, _helpers.addScopedSlot)(slotName, slots);
        }

        return acc;
      }, {});
      content.header = (0, _helpers.addScopedSlot)('header', slots);
      return (0, _vue.h)(_VDataTableHeader.VDataTableHeader, propsData, content);
    }

    function genTableBody() {
      var _propsData;

      var propsData = (_propsData = {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsOnPage: data.rowsOnPage,
        showCheckbox: props.showCheckbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        showSequence: props.showSequence,
        color: props.color,
        onSelect: onSelect
      }, _defineProperty(_propsData, 'onClick:row', function onClickRow(e) {
        return emit('click:row', e);
      }), _defineProperty(_propsData, 'onDblclick:row', function onDblclickRow(e) {
        return emit('dblclick:row', e);
      }), _defineProperty(_propsData, 'onContextmenu:row', function onContextmenuRow(e) {
        return emit('contextmenu:row', e);
      }), _propsData);
      var content = props.cols.reduce(function (acc, col) {
        if (col && slots[col.key]) {
          acc[col.key] = (0, _helpers.addScopedSlot)(col.key, slots);
        }

        return acc;
      }, {});
      return (0, _vue.h)(_VDataTableBody.VDataTableBody, propsData, content);
    }

    function genTableFooter() {
      var _data$rows6;

      var propsData = {
        pages: pages.value,
        page: data.page,
        firstOnPage: firstOnPage.value,
        lastOnPage: lastOnPage.value,
        pageCorrection: pageCorrection.value,
        rowsOnPage: data.rowsOnPage,
        rowsLength: (_data$rows6 = data.rows) === null || _data$rows6 === void 0 ? void 0 : _data$rows6.length,
        dark: props.dark,
        options: footerOptions.value,
        onPrevPage: onPrevPage,
        onNextPage: onNextPage,
        onSelectRowsCount: onSelectRowsCount,
        onLastPage: function onLastPage() {
          return emit('last-page', props.rows.length);
        },
        onCorrectPage: function onCorrectPage(val) {
          return data.page += val;
        }
      };
      var content = slots.paginationText ? {
        paginationText: function paginationText() {
          var _data$rows7;

          return slots.paginationText && slots.paginationText({
            start: firstOnPage.value,
            last: lastOnPage.value,
            length: (_data$rows7 = data.rows) === null || _data$rows7 === void 0 ? void 0 : _data$rows7.length
          });
        }
      } : '';
      return (0, _vue.h)(_VDataTableFooter.VDataTableFooter, propsData, content);
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