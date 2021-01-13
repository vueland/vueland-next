"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VModal = void 0;

require("../../../src/components/VModal/VModal.scss");

var _vue = require("vue");

var _useOverlay2 = require("../../effects/use-overlay");

var _useTransition = require("../../effects/use-transition");

var _useToggle2 = require("../../effects/use-toggle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VModal = (0, _vue.defineComponent)({
  name: 'v-modal',
  props: _objectSpread(_objectSpread({
    modelValue: Boolean
  }, (0, _useOverlay2.overlayProps)()), (0, _useTransition.transitionProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var modalRef = (0, _vue.ref)(null);
    (0, _vue.onMounted)(function () {
      if (props.overlay) {
        var _useOverlay = (0, _useOverlay2.useOverlay)(props, modalRef.value),
            createOverlay = _useOverlay.createOverlay,
            removeOverlay = _useOverlay.removeOverlay;

        isActive.value && createOverlay();
        (0, _vue.watch)(function () {
          return isActive.value;
        }, function (to) {
          to && createOverlay();
          !to && removeOverlay();
        });
      }
    });

    function genContent() {
      var propsData = {
        "class": 'v-modal__content'
      };
      return (0, _vue.h)('div', propsData, slots["default"] && slots["default"]());
    }

    function genModal() {
      var propsData = _defineProperty({
        "class": 'v-modal',
        ref: modalRef
      }, 'onUpdate:modelValue', function onUpdateModelValue(val) {
        return emit('update:modelValue', val);
      });

      return (0, _vue.withDirectives)((0, _vue.h)('div', propsData, genContent()), [[_vue.vShow, isActive.value]]);
    }

    return function () {
      return (0, _useTransition.useTransition)(genModal(), props.transition);
    };
  }
});
exports.VModal = VModal;
//# sourceMappingURL=VModal.js.map