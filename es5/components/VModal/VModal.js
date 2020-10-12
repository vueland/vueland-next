"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VModal = void 0;

require("../../../src/components/VModal/VModal.scss");

var _vue = require("vue");

var _useOverlay2 = require("../../effects/use-overlay");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modalProps = _objectSpread({
  width: {
    type: [String, Number],
    "default": 400
  }
}, (0, _useOverlay2.overlayProps)());

var VModal = (0, _vue.defineComponent)({
  name: 'v-modal',
  props: modalProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useOverlay = (0, _useOverlay2.useOverlay)(props),
        createOverlay = _useOverlay.createOverlay;

    var genContent = function genContent() {
      return (0, _vue.h)('div', {
        "class": {
          'v-modal__container': true
        }
      }, slots["default"] && slots["default"]());
    };

    return function () {
      return [(0, _vue.h)('div', {
        "class": {
          'v-modal': true
        }
      }, genContent()), props.overlay && createOverlay()];
    };
  }
});
exports.VModal = VModal;
//# sourceMappingURL=VModal.js.map