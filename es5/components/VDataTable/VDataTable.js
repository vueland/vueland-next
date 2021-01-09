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

var _VDataTableModal = require("./VDataTableModal");

var _VDataTableFooter = require("./VDataTableFooter");

var _VCheckbox = require("../VCheckbox");

var _VButton = require("../VButton");

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
    var cols = (0, _vue.ref)([]);
    var rows = (0, _vue.ref)([]);
    var checkedRows = (0, _vue.ref)([]);
    var rowsPerPage = (0, _vue.ref)(20);
    var page = (0, _vue.ref)(1);
    var isAllRowsChecked = (0, _vue.ref)(false);
    var settings = (0, _vue.ref)({
      cols: false
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
      var _rows$value;

      return Math.ceil(((_rows$value = rows.value) === null || _rows$value === void 0 ? void 0 : _rows$value.length) / rowsPerPage.value);
    });
    (0, _vue.watch)(function () {
      return props.cols;
    }, function (to) {
      return cols.value = to;
    }, {
      immediate: true
    });
    (0, _vue.watch)(function () {
      return props.rows;
    }, function (to) {
      return rows.value = to;
    }, {
      immediate: true
    });

    function onCheckAll(value) {
      isAllRowsChecked.value = value;
      rows.value.forEach(function (row) {
        return row.checked = value;
      });
    }

    function onCheck(rows) {
      checkedRows.value = rows;
      emit('checked', checkedRows.value);
    }

    function onPrevTable(num) {
      page.value = page.value > 1 ? page.value + num : page.value;
    }

    function onNextTable(num) {
      if (rows.value.length - page.value * rowsPerPage.value > 0) {
        page.value += num;
      }

      return;
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        rows.value.reverse();
      } else {
        cols.value.forEach(function (c) {
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
          return rows.value = props.rows;
        }

        rows.value = filterRows(props.rows);
      } else {
        emit('filter', filters);
      }

      page.value = 1;
    }

    function onSelectRowsCount(count) {
      rowsPerPage.value = count;
    }

    function colsSettings(val, col) {
      col.show = val;
      emit('cols-settings', cols.value);
    }

    function sortColumn(col) {
      rows.value.sort(function (a, b) {
        if (col.formatter) {
          if (col.formatter(a) > col.formatter(b)) return 1;
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
          var _cols$value$find = cols.value.find(function (col) {
            return col.key === key;
          }),
              formatter = _cols$value$find.formatter;

          var value = formatter ? formatter(row) : row[key];
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
        "class": {
          'v-data-table__toolbar': true
        }
      }, {
        "default": function _default() {
          return slots.toolbar && slots.toolbar();
        }
      });
    }

    function genTableHeader() {
      return (0, _vue.h)(_VDataTableHeader.VDataTableHeader, {
        cols: cols.value,
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
        cols: cols.value,
        rows: rows.value,
        page: page.value,
        rowsPerPage: rowsPerPage.value,
        checkbox: props.checkbox,
        checkAllRows: isAllRowsChecked.value,
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
      var _rows$value2;

      return (0, _vue.h)(_VDataTableFooter.VDataTableFooter, {
        pages: pages.value,
        page: page.value,
        counts: props.rowsOnTable,
        tableRowsCount: (_rows$value2 = rows.value) === null || _rows$value2 === void 0 ? void 0 : _rows$value2.length,
        allRowsCount: props.rows.length,
        rowsPerPage: rowsPerPage.value,
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
          return page.value += val;
        },
        onColsSettings: function onColsSettings() {
          return settings.value.cols = true;
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

    function genColsSettingsCheckboxes() {
      return cols.value.map(function (col) {
        return (0, _vue.h)(_VCheckbox.VCheckbox, {
          label: col.title,
          modelValue: col.show,
          dark: props.dark,
          color: props.dark ? 'white' : '',
          style: {
            margin: '10px 0'
          },
          onChecked: function onChecked(val) {
            return colsSettings(val, col);
          }
        });
      });
    }

    function genColsSettingsActions() {
      return (0, _vue.h)(_VButton.VButton, {
        dark: props.dark,
        color: props.dark ? 'white' : 'primary',
        outlined: props.dark,
        label: 'ok',
        onClick: function onClick() {
          return settings.value.cols = false;
        }
      });
    }

    function genColsSettingsModal() {
      return (0, _vue.h)(_VDataTableModal.VDataTableModal, {
        dark: props.dark,
        color: props.color,
        show: settings.value.cols
      }, {
        title: function title() {
          return 'Cols Settings';
        },
        content: function content() {
          return genColsSettingsCheckboxes();
        },
        actions: function actions() {
          return genColsSettingsActions();
        }
      });
    }

    return function () {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', setBackground(props.color, propsData), [slots.toolbar && genTableTools(), genTableInner(), genTableFooter(), genColsSettingsModal()]);
    };
  }
});
exports.VDataTable = VDataTable;
//# sourceMappingURL=VDataTable.js.map