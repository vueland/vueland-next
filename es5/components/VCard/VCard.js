"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCard = void 0;

require("../../../src/components/VCard/VCard.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VCard = (0, _vue.defineComponent)({
  name: 'v-card',
  props: _objectSpread(_objectSpread({
    width: {
      type: [String, Number],
      "default": 350
    }
  }, (0, _useColors2.colorProps)()), (0, _useElevation2.elevationProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-card': true
      }, elevationClasses.value);
    });
    var styles = (0, _vue.computed)(function () {
      return {
        width: "".concat(props.width, "px")
      };
    });
    var cachedCard = (0, _vue.computed)(function () {
      var propsData = {
        "class": classes.value,
        style: styles.value
      };
      return (0, _vue.h)('div', props.color ? setBackground(props.color, propsData) : propsData, slots["default"] && slots["default"]());
    });
    return function () {
      return cachedCard.value;
    };
  }
});
exports.VCard = VCard;
//# sourceMappingURL=VCard.js.map