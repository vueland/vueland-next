"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableBody = void 0;

require("../../../src/components/VDataTable/VDataTableBody.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _VDataTableCell = require("./VDataTableCell");

var _VCheckbox = require("../VCheckbox");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDataTableBody = (0, _vue.defineComponent)({
  name: 'v-data-table-body',
  props: _objectSpread({
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    checkAllRows: Boolean,
    cols: Array,
    rows: Array,
    align: String,
    colWidth: {
      type: [String, Number],
      "default": 125
    },
    bodyHeight: {},
    page: Number,
    rowsPerPage: Number
  }, (0, _useColors2.colorProps)()),
  emits: ['check'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var checkedRows = (0, _vue.ref)([]);

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table__body': true
      };
    });
    var rowsOnTable = (0, _vue.computed)(function () {
      var _props$rows;

      return (_props$rows = props.rows) === null || _props$rows === void 0 ? void 0 : _props$rows.slice((props.page - 1) * props.rowsPerPage, props.page * props.rowsPerPage);
    });
    (0, _vue.watch)(function () {
      return props.checkAllRows;
    }, function (to) {
      if (to) onCheckRows(props.rows);else onCheckRows([]);
    });

    function onCheckRows(rows) {
      checkedRows.value = rows;
      emit('check', checkedRows.value);
    }

    function genTableRow(cells) {
      return (0, _vue.h)('div', {
        "class": {
          'v-data-table__row': true
        }
      }, cells);
    }

    function genNumberCell(count) {
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, {
        width: 50,
        align: 'center',
        dark: props.dark,
        "class": 'v-data-table__row-number'
      }, {
        "default": function _default() {
          return count + 1;
        }
      });
    }

    function genCheckboxCell(row) {
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, {
        width: 50,
        align: 'center',
        dark: props.dark,
        "class": 'v-data-table__row-checkbox'
      }, {
        "default": function _default() {
          return (0, _vue.h)(_VCheckbox.VCheckbox, _defineProperty({
            modelValue: checkedRows.value,
            color: props.dark ? 'white' : '',
            value: row
          }, 'onUpdate:modelValue', onCheckRows));
        }
      });
    }

    function genRowCell(col, row) {
      var format = col.format;
      var slotContent = slots[col.key] && slots[col.key](row);
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, {
        width: col.width,
        align: col.align || props.align,
        dark: props.dark,
        "class": _defineProperty({}, col.rowCellClass, !!col.rowCellClass)
      }, {
        "default": function _default() {
          return slotContent ? slotContent : format ? format(row) : String(row[col.key]);
        }
      });
    }

    function genTableRows() {
      var _rowsOnTable$value;

      var tableRows = [];
      var rowsLength = (_rowsOnTable$value = rowsOnTable.value) === null || _rowsOnTable$value === void 0 ? void 0 : _rowsOnTable$value.length;
      var colsLength = props.cols.length;
      var rowCells = [];
      var count = (props.page - 1) * props.rowsPerPage;

      for (var i = 0; i < rowsLength; i += 1) {
        props.numbered && rowCells.push(genNumberCell(count + i));
        props.checkbox && rowCells.push(genCheckboxCell(props.rows[i]));

        for (var j = 0; j < colsLength; j += 1) {
          props.cols[j].show && rowCells.push(genRowCell(props.cols[j], rowsOnTable.value[i]));
        }

        tableRows.push(genTableRow(rowCells));
        rowCells = [];
      }

      return tableRows;
    }

    return function () {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', props.color ? setBackground(props.color, propsData) : propsData, genTableRows());
    };
  }
});
exports.VDataTableBody = VDataTableBody;
//# sourceMappingURL=VDataTableBody.js.map