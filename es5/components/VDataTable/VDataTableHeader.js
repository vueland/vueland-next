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
    align: String
  }, (0, _useColors2.colorProps)()),
  emits: ['sort', 'filter', 'check-all'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var cols = (0, _vue.ref)([]);

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    cols.value = props.cols;
    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table__header': true
      };
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
      return (0, _vue.h)(_VIcon.VIcon, {
        clickable: true,
        "class": {
          'v-data-table-col__actions-sort': true,
          'v-data-table-col__actions-sort--active': item.sorted
        },
        size: 14,
        icon: _icons.FaIcons.$arrowUp,
        color: item.sorted ? props.dark ? 'white' : '' : '',
        onClick: function onClick() {
          return onSort(item);
        }
      });
    }

    function genFilterButton(item) {
      return (0, _vue.h)(_VIcon.VIcon, {
        clickable: true,
        "class": {
          'v-data-table-col__actions-filter': true,
          'v-data-table-col__actions-filter--active': item.filtered
        },
        size: 14,
        icon: _icons.FaIcons.$filter,
        color: item.filtered ? props.dark ? 'white' : '' : '',
        onClick: function onClick() {
          return addFilter(item);
        }
      });
    }

    function genHeaderActions(item) {
      return (0, _vue.h)('span', {
        "class": {
          'v-data-table-col__actions': true
        }
      }, [item.sortable && genSortButton(item), item.filterable && genFilterButton(item)]);
    }

    function genFilterInput(item) {
      return (0, _vue.h)(_VTextField.VTextField, {
        label: 'insert',
        dark: props.dark,
        color: props.dark ? 'white' : '',
        prependIcon: _icons.FaIcons.$search,
        clearable: true,
        onInput: function onInput($value) {
          return _onInput($value, item);
        }
      });
    }

    function genFilterHeader(item) {
      return (0, _vue.h)('span', {
        "class": {
          'v-data-table-col__filter-header': true
        }
      }, item.title);
    }

    function genFilterWrapper(item) {
      var directive = item.addFilter ? {
        handler: function handler() {
          return setTimeout(function () {
            return item.addFilter = false;
          });
        },
        closeConditional: false
      } : undefined;
      var propsData = {
        "class": {
          'v-data-table-col__filter': true
        }
      };
      return item.filterable && (0, _vue.withDirectives)((0, _vue.h)('div', setBackground(props.color, propsData), [genFilterHeader(item), genFilterInput(item)]), [[_vClickOutside.clickOutside, directive], [_vue.vShow, item.addFilter]]);
    }

    function genHeaderTitle(item) {
      return (0, _vue.h)('div', {
        "class": 'v-data-table-col__title'
      }, [item.title]);
    }

    function genHeaderCell(item) {
      return (0, _vue.h)(_VDataTableCell.VDataTableCell, {
        dark: props.dark,
        "class": {
          'v-data-table-col': true,
          'v-data-table-col--sorted': item.sorted
        },
        width: item.width,
        resizeable: item.resizeable,
        align: props.align || item.align,
        onResize: function onResize($size) {
          return item.width = $size;
        }
      }, {
        "default": function _default() {
          return [genHeaderTitle(item), genHeaderActions(item), genFilterWrapper(item)];
        }
      });
    }

    function genHeaderCells() {
      var cells = [];
      props.numbered && cells.push((0, _vue.h)(_VDataTableCell.VDataTableCell, {
        align: 'center',
        "class": 'v-data-table-col__number',
        dark: props.dark,
        color: props.color,
        width: 50
      }, {
        "default": function _default() {
          return '№';
        }
      }));
      props.checkbox && cells.push((0, _vue.h)(_VDataTableCell.VDataTableCell, {
        align: 'center',
        "class": 'v-data-table-col__checkbox',
        dark: props.dark,
        color: props.color,
        width: 50
      }, {
        "default": function _default() {
          return (0, _vue.h)(_VCheckbox.VCheckbox, {
            color: props.dark ? 'white' : '',
            onChecked: function onChecked(e) {
              return emit('check-all', e);
            }
          });
        }
      }));
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