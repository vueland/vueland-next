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
    headerColor: String,
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
    align: String,
    color: {
      type: String,
      "default": 'white'
    }
  },
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
        data.rows.reverse();
      } else {
        data.cols.forEach(function (c) {
          c.sorted = col.key === c.key;
        });
        sortColumn(col);
      }
    }

    function onFilter(_ref2) {
      var value = _ref2.value,
          col = _ref2.col;
      if (!value && filters[col.key]) delete filters[col.key];
      if (value) filters[col.key] = value;

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return data.rows = props.rows;
        }

        data.rows = filterRows(props.rows);
      } else {
        emit('filter', filters);
      }

      data.page = 1;
    }

    function onSelectRowsCount(count) {
      data.rowsPerPage = count;
    }

    function sortColumn(col) {
      data.rows.sort(function (a, b) {
        if (col.format) {
          if (col.format(a) > col.format(b)) return 1;
        } else {
          if (a[col.key] > b[col.key]) return 1;
        }

        return -1;
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
      return (0, _vue.h)('div', {
        "class": 'v-data-table__toolbar'
      }, {
        "default": function _default() {
          return slots.toolbar && slots.toolbar();
        }
      });
    }

    function genTableHeader() {
      return (0, _vue.h)(_VDataTableHeader.VDataTableHeader, {
        cols: data.cols,
        color: props.headerColor || props.color,
        checkbox: props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter: onFilter,
        onSort: onSort,
        onCheckAll: onCheckAll
      });
    }

    function genTableBody() {
      return (0, _vue.h)(_VDataTableBody.VDataTableBody, {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsPerPage: data.rowsPerPage,
        checkbox: props.checkbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        color: props.color,
        numbered: props.numbered,
        onCheck: onCheck
      }, props.cols.reduce(function (acc, col) {
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
      }, {}));
    }

    function genTableFooter() {
      var _data$rows2;

      return (0, _vue.h)(_VDataTableFooter.VDataTableFooter, {
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
      });
    }

    function genTableInner() {
      return (0, _vue.h)('div', {
        "class": {
          'v-data-table__inner': true
        }
      }, [genTableHeader(), genTableBody()]);
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