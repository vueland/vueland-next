"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VLabel = void 0;

require("../../../src/components/VLabel/VLabel.scss");

var _vue = require("vue");

var _helpers = require("../../helpers");

var _useColors2 = require("../../effects/use-colors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var labelProps = _objectSpread({
  absolute: Boolean,
  disabled: Boolean,
  focused: Boolean,
  "for": String,
  left: {
    type: [Number, String],
    "default": 0
  },
  right: {
    type: [Number, String],
    "default": 'auto'
  },
  value: Boolean
}, (0, _useColors2.colorProps)());

var VLabel = (0, _vue.defineComponent)({
  name: 'v-label',
  props: labelProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(props),
        setTextColor = _useColors.setTextColor;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-label--active': !!props.value,
        'v-label--is-disabled': !!props.disabled
      };
    });

    var genDataProps = function genDataProps() {
      return {
        "class": _objectSpread({}, classes.value),
        style: {
          left: (0, _helpers.convertToUnit)(props.left),
          right: (0, _helpers.convertToUnit)(props.right),
          position: props.absolute ? 'absolute' : 'relative'
        }
      };
    };

    return (0, _vue.h)('label', setTextColor(props.color, genDataProps()), slots["default"] && slots["default"]());
  }
});
exports.VLabel = VLabel;
//# sourceMappingURL=VLabel.js.map