"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableCell = void 0;

require("../../../src/components/VDataTable/VDataTableCell.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _helpers = require("../../helpers");

var _VResize = require("../VResize");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDataTableCell = (0, _vue.defineComponent)({
  name: 'v-data-table-cell',
  props: _objectSpread({
    dark: Boolean,
    resizeable: Boolean,
    align: {
      type: String,
      "default": 'start'
    },
    width: {
      type: [String, Number],
      "default": 75
    },
    contentColor: String
  }, (0, _useColors2.colorProps)()),
  emits: ['resize'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-data-table__cell': true
      };
    });

    function genResize() {
      return (0, _vue.h)(_VResize.VResize, {
        right: true,
        emit: true,
        "class": {
          white: props.dark,
          primary: !props.dark
        },
        onResize: function onResize($size) {
          return emit('resize', $size);
        }
      });
    }

    function genCellContent() {
      return (0, _vue.h)('div', {
        "class": _defineProperty({
          'v-data-table__cell-content': true
        }, "text-align--".concat(props.align), !!props.align)
      }, slots["default"] && slots["default"]());
    }

    return function () {
      var color = props.color || (props.dark ? 'white' : '');
      var propsData = setTextColor(color, {
        "class": classes.value,
        style: {
          width: (0, _helpers.convertToUnit)(+props.width)
        }
      });
      return (0, _vue.h)('div', propsData, [genCellContent(), props.resizeable && genResize()]);
    };
  }
});
exports.VDataTableCell = VDataTableCell;
//# sourceMappingURL=VDataTableCell.js.map