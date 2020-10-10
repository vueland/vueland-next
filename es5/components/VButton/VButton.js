"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VButton = void 0;

require("../../../src/components/VButton/VButton.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

var _usePosition2 = require("../../effects/use-position");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buttonProps = _objectSpread(_objectSpread(_objectSpread({
  disabled: {
    type: Boolean,
    "default": false
  },
  outlined: {
    type: Boolean,
    "default": false
  },
  absolute: {
    type: Boolean,
    "default": false
  },
  left: {
    type: Boolean,
    "default": false
  },
  right: {
    type: Boolean,
    "default": false
  },
  text: {
    type: Boolean,
    "default": false
  }
}, (0, _useColors2.colorProps)()), (0, _useElevation2.elevationProps)()), (0, _usePosition2.positionProps)());

var VButton = (0, _vue.defineComponent)({
  name: 'v-button',
  props: buttonProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(props),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _usePosition = (0, _usePosition2.usePosition)(props),
        positionClasses = _usePosition.positionClasses;

    var isFlat = (0, _vue.computed)(function () {
      return props.text || props.outlined;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread(_objectSpread({
        'v-button': true,
        'v-button--disabled': props.disabled,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined
      }, elevationClasses.value), positionClasses.value);
    });

    var propsObject = function propsObject() {
      return {
        "class": _objectSpread({}, classes.value),
        onClick: function onClick() {
          return emit('click');
        }
      };
    };

    var setColor = isFlat.value ? setTextColor : setBackground;
    var data = props.color ? setColor(props.color, propsObject()) : propsObject();
    var content = slots["default"] && slots["default"]();
    return function () {
      return (0, _vue.h)('button', data, content);
    };
  }
});
exports.VButton = VButton;
//# sourceMappingURL=VButton.js.map