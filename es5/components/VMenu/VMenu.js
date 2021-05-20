"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VMenu = void 0;

require("../../../src/components/VMenu/VMenu.scss");

var _vue = require("vue");

var _useAutoPosition2 = require("../../effects/use-auto-position");

var _useActivator2 = require("../../effects/use-activator");

var _useDetachable2 = require("../../effects/use-detachable");

var _useTransition = require("../../effects/use-transition");

var _useElevation2 = require("../../effects/use-elevation");

var _useToggle2 = require("../../effects/use-toggle");

var _usePosition = require("../../effects/use-position");

var _helpers = require("../../helpers");

var _directives = require("../../directives");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VMenu = (0, _vue.defineComponent)({
  name: 'v-menu',
  props: _objectSpread({
    maxHeight: {
      type: [Number, String],
      "default": 200
    },
    width: {
      type: [Number, String],
      "default": 0
    },
    openOnHover: Boolean,
    openOnClick: Boolean,
    closeOnContentClick: {
      type: Boolean,
      "default": true
    },
    closeOnClick: {
      type: Boolean,
      "default": true
    },
    elevation: {
      type: [Number, String],
      "default": 10
    }
  }, (0, _usePosition.positionProps)()),
  emits: ['open', 'close'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var _useAutoPosition = (0, _useAutoPosition2.useAutoPosition)(props),
        contentRef = _useAutoPosition.contentRef,
        setDimensions = _useAutoPosition.setDimensions,
        dimensions = _useAutoPosition.dimensions;

    var _useDetachable = (0, _useDetachable2.useDetachable)(),
        setDetached = _useDetachable.setDetached,
        removeDetached = _useDetachable.removeDetached;

    var _useActivator = (0, _useActivator2.useActivator)(),
        activatorRef = _useActivator.activatorRef,
        genActivatorListeners = _useActivator.genActivatorListeners,
        addActivatorEvents = _useActivator.addActivatorEvents,
        removeActivatorEvents = _useActivator.removeActivatorEvents;

    var handlers = {
      click: function click() {
        setDimensions(activatorRef.value).then(function () {
          requestAnimationFrame(function () {
            return isActive.value = true;
          });
        });
      },
      mouseenter: function mouseenter() {
        return isActive.value = true;
      },
      mouseleave: function mouseleave() {
        return isActive.value = false;
      }
    };
    var listeners = genActivatorListeners(props, handlers);
    var directive = (0, _vue.computed)(function () {
      return isActive.value ? {
        handler: function handler(e) {
          if (activatorRef.value.contains(e.target)) return;
          isActive.value = false;
        },
        closeConditional: props.closeOnContentClick
      } : undefined;
    });
    var calcWidth = (0, _vue.computed)(function () {
      return props.width || dimensions.content.width;
    });
    (0, _vue.watch)(function () {
      return isActive.value;
    }, function (to) {
      to && emit('open');
      !to && emit('close');
    });

    function genActivatorSlot() {
      if (slots.activator) {
        var slotContent = slots.activator({
          on: listeners
        });

        if (_typeof(slotContent[0].type) === 'object') {
          return (0, _vue.h)('div', {
            ref: activatorRef
          }, (0, _vue.h)(slotContent[0]));
        }

        return (0, _vue.h)(slotContent[0], {
          ref: activatorRef
        });
      }

      return null;
    }

    function genContentSlot() {
      var propsData = {
        ref: contentRef,
        "class": _objectSpread({
          'v-menu__content': true
        }, elevationClasses.value),
        style: {
          maxHeight: (0, _helpers.convertToUnit)(props.maxHeight),
          width: (0, _helpers.convertToUnit)(calcWidth.value),
          top: (0, _helpers.convertToUnit)(dimensions.content.top),
          left: (0, _helpers.convertToUnit)(dimensions.content.left)
        },
        onClick: function onClick() {
          isActive.value = !props.closeOnContentClick;
        }
      };
      var content = (0, _vue.h)('div', propsData, [slots["default"] && slots["default"]()]);
      var directives = [[_vue.vShow, isActive.value], [_directives.resize, onResize]];
      if (props.closeOnClick) directives.push([_directives.clickOutside, directive.value]);
      return (0, _vue.withDirectives)(content, directives);
    }

    (0, _vue.onMounted)(function () {
      activatorRef.value = slots.activator ? activatorRef.value : contentRef.value.parentNode;
      addActivatorEvents();
      setDetached(contentRef.value);
    });
    (0, _vue.onBeforeUnmount)(function () {
      removeActivatorEvents();
      removeDetached(contentRef.value);
    });

    function onResize() {
      if (!isActive.value) return;
      requestAnimationFrame(function () {
        return setDimensions(activatorRef);
      });
    }

    return function () {
      return [(0, _vue.h)('div', {
        "class": {
          'v-menu': true
        }
      }), slots.activator && genActivatorSlot(), (0, _useTransition.useTransition)(genContentSlot(), 'fade')];
    };
  }
});
exports.VMenu = VMenu;
//# sourceMappingURL=VMenu.js.map