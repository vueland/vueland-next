"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VOverlay = void 0;

require("../../../src/components/VOverlay/VOverlay.scss");

var _vue = require("vue");

var _useColors2 = require("@/effects/use-colors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var overlayProps = _objectSpread({
  hide: Boolean,
  active: Boolean
}, (0, _useColors2.colorProps)());

var VOverlay = (0, _vue.defineComponent)({
  name: 'v-overlay',
  props: overlayProps,
  setup: function setup(props) {
    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-overlay': true,
        'v-overlay--hidden': props.hide,
        'v-overlay--active': props.active
      };
    });
    var dataObject = {
      "class": classes.value,
      style: [],
      ref: 'overlay'
    };
    return (0, _vue.h)('div', setBackground(props.color, dataObject));
  }
});
exports.VOverlay = VOverlay;
//# sourceMappingURL=VOverlay.js.map