"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableHeader = void 0;

require("../../../src/components/VDataTable/VDataTableHeader.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useIcons2 = require("../../effects/use-icons");

var _VIcon = require("../VIcon");

var _VCheckbox = require("../VCheckbox");

var _VDataTableCell = require("./VDataTableCell");

var _VTextField = require("../VTextField");

var _vClickOutside = require("../../directives/v-click-outside");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var VDataTableHeader = (0, _vue.defineComponent)({
  name: 'v-data-table-header',
  props: {
    showSequence: Boolean,
    showCheckbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      "default": 125
    },
    align: String,
    options: Object
  },
  emits: ['sort', 'filter', 'select-all', 'update:cols'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var _useIcons = (0, _useIcons2.useIcons)('s'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table__header': true
      };
    });
    var computedContentColor = (0, _vue.computed)(function () {
      var _props$options, _props$options2;

      return props.options.dark ? ((_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.contentColor) || 'white' : (_props$options2 = props.options) === null || _props$options2 === void 0 ? void 0 : _props$options2.contentColor;
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

    function showFilter(item) {
      if (item.showFilter) return;
      item.showFilter = true;
    }

    function genSortButton(item) {
      var classes = {
        'v-data-table-col__actions-sort': true,
        'v-data-table-col__actions-sort--active': item.sorted
      };
      var propsData = {
        clickable: true,
        "class": classes,
        size: iconSize,
        icon: icons.$arrowUp,
        color: !item.cellClass ? computedContentColor.value : '',
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
        size: iconSize,
        icon: icons.$filter,
        color: !item.cellClass ? computedContentColor.value : '',
        onClick: function onClick() {
          return showFilter(item);
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
        label: 'search',
        dark: props.options.dark,
        color: !item.cellClass ? computedContentColor.value : '',
        prependIcon: icons.$search,
        clearable: true,
        onInput: function onInput($value) {
          return _onInput($value, item);
        }
      };
      return (0, _vue.h)(_VTextField.VTextField, propsData);
    }

    function genFilterWrapper(col) {
      var _props$options3, _props$options4;

      var color = props.options.dark ? ((_props$options3 = props.options) === null || _props$options3 === void 0 ? void 0 : _props$options3.color) || 'grey darken-3' : ((_props$options4 = props.options) === null || _props$options4 === void 0 ? void 0 : _props$options4.color) || 'white';
      var slotName = "".concat(col.key, "-filter");
      var filterSlot = slots[slotName] && slots[slotName]({
        filter: function filter(event) {
          return _onInput(event, col);
        }
      });
      var directive = col.showFilter ? {
        handler: function handler() {
          return setTimeout(function () {
            return col.showFilter = false;
          });
        },
        closeConditional: false
      } : undefined;
      var propsData = {
        "class": _defineProperty({
          'v-data-table-col__filter': !filterSlot,
          'v-data-table-col__custom-filter': !!filterSlot,
          'elevation-5': true
        }, col.cellClass, !!col.cellClass)
      };
      return col.filterable && (0, _vue.withDirectives)((0, _vue.h)('div', !col.filterClass ? setBackground(color, propsData) : propsData, filterSlot || genFilterInput(col)), [[_vClickOutside.clickOutside, directive], [_vue.vShow, col.showFilter]]);
    }

    function genHeaderTitle(col) {
      return (0, _vue.h)('div', {
        "class": 'v-data-table-col__title'
      }, col.title);
    }

    function genNumberCell() {
      var propsData = {
        align: 'center',
        "class": _defineProperty({
          'v-data-table-col__number': true
        }, props.cellClass, !!props.cellClass),
        contentColor: computedContentColor.value,
        color: props.options.color,
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
        dark: props.options.dark,
        contentColor: computedContentColor.value,
        color: props.options.color,
        width: 50
      };
      var content = {
        "default": function _default() {
          return (0, _vue.h)(_VCheckbox.VCheckbox, {
            color: computedContentColor.value,
            onChecked: function onChecked(e) {
              return emit('select-all', e);
            }
          });
        }
      };
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, propsData, content);
    }

    function genHeaderCell(col) {
      var propsData = {
        dark: props.options.dark,
        "class": _defineProperty({
          'v-data-table-col': true,
          'v-data-table-col--sorted': col.sorted
        }, col.cellClass, !!col.cellClass),
        contentColor: !col.cellClass ? computedContentColor.value : '',
        color: !col.cellClass ? props.options.color : '',
        width: col.width,
        resizeable: col.resizeable,
        align: col.align || props.align,
        onResize: function onResize($size) {
          return col.width = $size;
        }
      };
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, propsData, {
        "default": function _default() {
          return [genHeaderTitle(col), genHeaderActions(col), genFilterWrapper(col)];
        }
      });
    }

    function genHeaderChildren() {
      var children = [];
      var headerSlot = slots.header && slots.header(props);
      props.showSequence && children.push(genNumberCell());
      props.showCheckbox && children.push(genCheckboxCell());
      cols.value.forEach(function (col) {
        col.width = col.width || props.colWidth;

        if (!col.hasOwnProperty('show')) {
          col.show = !col.show;
        }

        !headerSlot[0].children && col.show && children.push(genHeaderCell(col));
      });
      headerSlot[0].children && children.push(headerSlot);
      return children;
    }

    return function () {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', props.options.color ? setBackground(props.options.color, propsData) : propsData, genHeaderChildren());
    };
  }
});
exports.VDataTableHeader = VDataTableHeader;
//# sourceMappingURL=VDataTableHeader.js.map