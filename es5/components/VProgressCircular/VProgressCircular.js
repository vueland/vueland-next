"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VProgressCircular = void 0;

require("../../../src/components/VProgressCircular/VProgressCircular.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VProgressCircular = (0, _vue.defineComponent)({
  name: 'v-progress-circular',
  props: _objectSpread({
    indeterminate: Boolean,
    size: {
      type: [Number, String],
      "default": 32
    },
    width: {
      type: [Number, String],
      "default": 4
    },
    value: {
      type: [Number, String],
      "default": 0
    },
    rotate: {
      type: [Number, String],
      "default": 0
    }
  }, (0, _useColors2.colorProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var radius = 20;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var normalizedValue = (0, _vue.computed)(function () {
      if (props.value < 0) return 0;
      if (props.value > 100) return 100;
      return parseFloat(props.value);
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-progress-circular': true,
        'v-progress-circular--indeterminate': props.indeterminate
      };
    });
    var circumference = (0, _vue.computed)(function () {
      return 2 * Math.PI * radius;
    });
    var strokeDashArray = (0, _vue.computed)(function () {
      return Math.round(circumference.value * 1000) / 1000;
    });
    var strokeDashOffset = (0, _vue.computed)(function () {
      return (100 - normalizedValue.value) / 100 * circumference.value + 'px';
    });
    var viewBoxSize = (0, _vue.computed)(function () {
      return radius / (1 - Number(props.width) / +props.size);
    });
    var strokeWidth = (0, _vue.computed)(function () {
      return Number(props.width) / +props.size * viewBoxSize.value * 2;
    });
    var styles = (0, _vue.computed)(function () {
      return {
        width: (0, _helpers.convertToUnit)(props.size),
        height: (0, _helpers.convertToUnit)(props.size)
      };
    });
    var svgStyle = (0, _vue.computed)(function () {
      return {
        transform: "rotate(".concat(+props.rotate, "deg)")
      };
    });

    function genCircle(name, offset) {
      return (0, _vue.h)('circle', {
        "class": "v-progress-circular__".concat(name),
        fill: 'transparent',
        cx: 2 * viewBoxSize.value,
        cy: 2 * viewBoxSize.value,
        r: radius,
        'stroke-width': strokeWidth.value,
        'stroke-dasharray': strokeDashArray.value,
        'stroke-dashoffset': offset
      });
    }

    function genSvg() {
      var children = [props.indeterminate || genCircle('underlay', 0), genCircle('overlay', strokeDashOffset.value)];
      var propsData = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: "".concat(viewBoxSize.value, " ").concat(viewBoxSize.value, " ").concat(2 * viewBoxSize.value, " ").concat(2 * viewBoxSize.value),
        style: svgStyle.value
      };
      return (0, _vue.h)('svg', propsData, children);
    }

    function genInfo() {
      var propsData = {
        "class": 'v-progress-circular__info'
      };
      return (0, _vue.h)('div', propsData, slots["default"] && slots["default"]());
    }

    return function () {
      var propsData = setTextColor(props.color, {
        "class": classes.value,
        style: styles.value
      });
      return (0, _vue.h)('div', propsData, [genSvg(), genInfo()]);
    };
  }
});
exports.VProgressCircular = VProgressCircular;
//# sourceMappingURL=VProgressCircular.js.map