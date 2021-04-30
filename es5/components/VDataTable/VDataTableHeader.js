"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableHeader = void 0;

require("../../../src/components/VDataTable/VDataTableHeader.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _VIcon = require("../VIcon");

var _VCheckbox = require("../VCheckbox");

var _VDataTableCell = require("./VDataTableCell");

var _VTextField = require("../VTextField");

var _vClickOutside = require("../../directives/v-click-outside");

var _icons = require("../../services/icons");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDataTableHeader = (0, _vue.defineComponent)({
  name: 'v-data-table-header',
  props: _objectSpread({
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      "default": 125
    },
    align: String,
    contentColor: String
  }, (0, _useColors2.colorProps)()),
  emits: ['sort', 'filter', 'check-all', 'update:cols'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table__header': true
      };
    });
    var computedColor = (0, _vue.computed)(function () {
      return props.contentColor || (props.dark ? 'white' : '');
    });
    var cols = (0, _vue.computed)(function () {
      return _toConsumableArray(props.cols);
    });

    function onSort(item) {
      emit('sort', item);
    }

    function _onInput($value, item) {
      item.filtered = !!$value;
      emit('filter', {
        value: $value,
        col: item
      });
    }

    function addFilter(item) {
      if (item.addFilter) return;
      item.addFilter = true;
    }

    function genSortButton(item) {
      var classes = {
        'v-data-table-col__actions-sort': true,
        'v-data-table-col__actions-sort--active': item.sorted
      };
      var propsData = {
        clickable: true,
        "class": classes,
        size: 14,
        icon: _icons.FaIcons.$arrowUp,
        color: computedColor.value,
        onClick: function onClick() {
          return onSort(item);
        }
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData);
    }

    function genFilterButton(item) {
      var classes = {
        'v-data-table-col__actions-filter': true,
        'v-data-table-col__actions-filter--active': item.filtered
      };
      var propsData = {
        clickable: true,
        "class": classes,
        size: 14,
        icon: _icons.FaIcons.$filter,
        color: computedColor.value,
        onClick: function onClick() {
          return addFilter(item);
        }
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData);
    }

    function genHeaderActions(item) {
      return (0, _vue.h)('span', {
        "class": 'v-data-table-col__actions'
      }, [item.sortable && genSortButton(item), item.filterable && genFilterButton(item)]);
    }

    function genFilterInput(item) {
      var propsData = {
        label: 'insert',
        dark: props.dark,
        color: computedColor.value,
        prependIcon: _icons.FaIcons.$search,
        clearable: true,
        onInput: function onInput($value) {
          return _onInput($value, item);
        }
      };
      return (0, _vue.h)(_VTextField.VTextField, propsData);
    }

    function genFilterHeader(item) {
      return (0, _vue.h)('span', {
        "class": 'v-data-table-col__filter-header'
      }, item.title);
    }

    function genFilterWrapper(item) {
      var colorClass = props.dark ? 'grey darken-3' : 'grey lighten-2';
      var filterClass = item.filterClass || colorClass;
      var directive = item.addFilter ? {
        handler: function handler() {
          return setTimeout(function () {
            return item.addFilter = false;
          });
        },
        closeConditional: false
      } : undefined;
      var propsData = {
        "class": _defineProperty({
          'v-data-table-col__filter': true
        }, filterClass, true)
      };
      return item.filterable && (0, _vue.withDirectives)((0, _vue.h)('div', propsData, [genFilterHeader(item), genFilterInput(item)]), [[_vClickOutside.clickOutside, directive], [_vue.vShow, item.addFilter]]);
    }

    function genHeaderTitle(item) {
      return (0, _vue.h)('div', {
        "class": 'v-data-table-col__title'
      }, item.title);
    }

    function genNumberCell() {
      var propsData = {
        align: 'center',
        "class": _defineProperty({
          'v-data-table-col__number': true
        }, props.cellClass, !!props.cellClass),
        color: computedColor.value,
        width: 50
      };
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, propsData, {
        "default": function _default() {
          return '№';
        }
      });
    }

    function genCheckboxCell() {
      var propsData = {
        align: 'center',
        "class": _defineProperty({
          'v-data-table-col__checkbox': true
        }, props.cellClass, !!props.cellClass),
        dark: props.dark,
        color: props.color,
        width: 50
      };
      var content = {
        "default": function _default() {
          return (0, _vue.h)(_VCheckbox.VCheckbox, {
            color: computedColor.value,
            onChecked: function onChecked(e) {
              return emit('check-all', e);
            }
          });
        }
      };
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, propsData, content);
    }

    function genHeaderCell(item) {
      var propsData = {
        dark: props.dark,
        "class": _defineProperty({
          'v-data-table-col': true,
          'v-data-table-col--sorted': item.sorted
        }, item.cellClass, !!item.cellClass),
        color: computedColor.value,
        width: item.width,
        resizeable: item.resizeable,
        align: item.align || props.align,
        onResize: function onResize($size) {
          return item.width = $size;
        }
      };
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, propsData, {
        "default": function _default() {
          return [genHeaderTitle(item), genHeaderActions(item), genFilterWrapper(item)];
        }
      });
    }

    function genHeaderCells() {
      var cells = [];
      props.numbered && cells.push(genNumberCell());
      props.checkbox && cells.push(genCheckboxCell());
      cols.value.forEach(function (item) {
        item.width = item.width || props.colWidth;

        if (!item.hasOwnProperty('show')) {
          item.show = !item.show;
        }

        item.show && cells.push(genHeaderCell(item));
      });
      return cells;
    }

    return function () {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', props.color ? setBackground(props.color, propsData) : propsData, genHeaderCells());
    };
  }
});
exports.VDataTableHeader = VDataTableHeader;
//# sourceMappingURL=VDataTableHeader.js.map