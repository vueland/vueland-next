"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VModal = void 0;

require("../../../src/components/VModal/VModal.scss");

var _vue = require("vue");

var _useOverlay = require("../../effects/use-overlay");

var _useTransition = require("../../effects/use-transition");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modalProps = _objectSpread(_objectSpread({
  width: {
    type: [String, Number],
    "default": 400
  },
  show: Boolean
}, (0, _useOverlay.overlayProps)()), (0, _useTransition.transitionProps)());

var VModal = (0, _vue.defineComponent)({
  name: 'v-modal',
  props: modalProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    if (props.overlay) {
      var overlay = (0, _useOverlay.useOverlay)(props, 'v-modal');
      (0, _vue.watch)(function () {
        return props.show;
      }, function (to) {
        to && overlay.createOverlay();
        !to && overlay.removeOverlay();
      });
    }

    var genContent = function genContent() {
      return (0, _vue.h)('div', {
        "class": {
          'v-modal__content': true
        }
      }, slots["default"] && slots["default"]());
    };

    var genModal = function genModal() {
      return (0, _vue.h)('div', {
        "class": {
          'v-modal': true
        },
        'onUpdate:show': function onUpdateShow(val) {
          return emit('update:show', val);
        }
      }, [content]);
    };

    var content = genContent();
    var modal = genModal();

    if (!!props.transition) {
      var createTransition = (0, _useTransition.useTransition)(props, modal);
      modal = createTransition();
    }

    return function () {
      return (0, _vue.withDirectives)((0, _vue.h)(modal), [[_vue.vShow, props.show]]);
    };
  }
});
exports.VModal = VModal;
//# sourceMappingURL=VModal.js.map