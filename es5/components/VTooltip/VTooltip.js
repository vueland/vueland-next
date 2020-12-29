"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VTooltip = void 0;

require("../../../src/components/VTooltip/VTooltip.scss");

var _vue = require("vue");

var _useToggle2 = require("../../effects/use-toggle");

var _useColors2 = require("../../effects/use-colors");

var _useActivator2 = require("../../effects/use-activator");

var _useTransition = require("../../effects/use-transition");

var _useElevation2 = require("../../effects/use-elevation");

var _usePosition = require("../../effects/use-position");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VTooltip = (0, _vue.defineComponent)({
  name: 'v-tooltip',
  props: _objectSpread(_objectSpread({
    openOnHover: {
      type: Boolean,
      "default": true
    },
    color: {
      type: String,
      "default": 'grey lighten-1'
    },
    zIndex: [Number, String],
    maxWidth: [Number, String],
    minWidth: [Number, String],
    modelValue: Boolean
  }, (0, _useElevation2.elevationProps)()), (0, _usePosition.positionProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var tooltip = (0, _vue.reactive)({});
    var activator = (0, _vue.reactive)({});
    var innerActive = (0, _vue.ref)(false);
    var tooltipRef = (0, _vue.ref)(null);

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var _useActivator = (0, _useActivator2.useActivator)(),
        activatorRef = _useActivator.activatorRef,
        getActivatorSizes = _useActivator.getActivatorSizes,
        genActivatorListeners = _useActivator.genActivatorListeners;

    var listeners = genActivatorListeners(props, innerActive);
    var classes = (0, _vue.computed)(function () {
      return {
        'v-tooltip': true,
        'v-tooltip--top': props.top,
        'v-tooltip--right': props.right,
        'v-tooltip--left': props.left,
        'v-tooltip--bottom': props.bottom
      };
    });
    var contentClasses = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-tooltip__content': true
      }, elevationClasses.value);
    });
    var computeTopPosition = (0, _vue.computed)(function () {
      return (props.top ? activator.top - tooltip.height : props.bottom ? activator.top + activator.height : activator.top + (activator.height - tooltip.height) / 2) + +props.offsetY;
    });
    var computeLeftPosition = (0, _vue.computed)(function () {
      return (props.left ? activator.left - tooltip.width : props.right ? activator.left + activator.width : activator.left + (activator.width - tooltip.width) / 2) + +props.offsetX;
    });
    var styles = (0, _vue.computed)(function () {
      return {
        top: tooltip.top ? (0, _helpers.convertToUnit)(tooltip.top) : '',
        left: tooltip.top ? (0, _helpers.convertToUnit)(tooltip.left) : '',
        maxWidth: !!props.maxWidth ? "".concat(props.maxWidth, "px") : '',
        minWidth: !!props.minWidth ? "".concat(props.minWidth, "px") : '',
        zIndex: props.zIndex
      };
    });

    function genActivator() {
      var slotContent = (0, _vue.renderSlot)(slots, 'activator', {
        on: listeners
      });
      return (0, _vue.h)('div', {
        "class": 'v-tooltip__activator',
        ref: activatorRef
      }, slotContent);
    }

    function genContent() {
      var propsData = {
        "class": contentClasses.value,
        style: styles.value,
        ref: tooltipRef
      };
      return (0, _vue.withDirectives)((0, _vue.h)('span', setBackground(props.color, propsData), slots["default"] && slots["default"]()), [[_vue.vShow, innerActive.value]]);
    }

    function setTooltipPosition() {
      if (tooltipRef.value) {
        tooltip.width = tooltipRef.value.offsetWidth;
        tooltip.height = tooltipRef.value.offsetHeight;
        tooltip.top = computeTopPosition.value;
        tooltip.left = computeLeftPosition.value;
      }
    }

    (0, _vue.watch)(function () {
      return isActive.value;
    }, function (to) {
      return innerActive.value = to;
    }, {
      immediate: true
    });
    (0, _vue.onMounted)(function () {
      (0, _vue.watch)(function () {
        return innerActive.value;
      }, function (to) {
        if (to) {
          var _getActivatorSizes = getActivatorSizes(),
              left = _getActivatorSizes.left,
              top = _getActivatorSizes.top,
              height = _getActivatorSizes.height,
              width = _getActivatorSizes.width;

          activator.left = left;
          activator.top = top;
          activator.height = height;
          activator.width = width;
          tooltip.top = 0;
          tooltip.left = 0;
          requestAnimationFrame(setTooltipPosition);
        }
      }, {
        immediate: true
      });
    });
    return function () {
      var content = (0, _useTransition.useTransition)(genContent(), innerActive.value ? 'scale-in' : 'fade');
      return (0, _vue.h)('div', {
        "class": classes.value
      }, [genActivator(), content]);
    };
  }
});
exports.VTooltip = VTooltip;
//# sourceMappingURL=VTooltip.js.map