"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VBadge = void 0;

require("../../../src/components/VBadge/VBadge.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _usePosition = require("../../effects/use-position");

var _useToggle2 = require("../../effects/use-toggle");

var _useElevation2 = require("../../effects/use-elevation");

var _useTransition = require("../../effects/use-transition");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vBadgeProps = _objectSpread(_objectSpread(_objectSpread({
  dot: Boolean,
  avatar: Boolean,
  border: Boolean,
  content: {
    required: false
  },
  color: {
    type: String,
    "default": 'primary'
  },
  transition: {
    type: String,
    "default": 'scaleIn'
  }
}, (0, _usePosition.positionProps)()), (0, _useElevation2.elevationProps)()), (0, _useToggle2.toggleProps)());

var VBadge = (0, _vue.defineComponent)({
  name: 'v-badge',
  props: vBadgeProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var offset = (0, _vue.computed)(function () {
      return props.dot ? 4 : 12;
    });

    var calcPosition = function calcPosition() {
      var offsetVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var value = offset.value + Number(offsetVal);
      return "calc(100% - ".concat(value, "px)");
    };

    var computedLeft = (0, _vue.computed)(function () {
      if (props.right) {
        return calcPosition(props.offsetX);
      }

      return false;
    });
    var computedRight = (0, _vue.computed)(function () {
      if (props.left) {
        return calcPosition(props.offsetX);
      }

      return false;
    });
    var computedTop = (0, _vue.computed)(function () {
      if (props.bottom) {
        return calcPosition(props.offsetY);
      }

      return false;
    });
    var computedBottom = (0, _vue.computed)(function () {
      if (props.top) {
        return calcPosition(props.offsetY);
      }

      return false;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-badge__badge': true,
        'v-badge--border': props.border,
        'v-badge--dot': props.dot,
        'v-badge--avatar': props.avatar
      }, elevationClasses.value);
    });
    var styles = (0, _vue.computed)(function () {
      return {
        top: computedTop.value,
        right: computedRight.value,
        bottom: computedBottom.value,
        left: computedLeft.value
      };
    });

    var content = function content() {
      if (props.dot) return undefined;
      var slot = slots.badge;
      if (slot) return slot;
      if (props.content) return String(props.content);
      return undefined;
    };

    var genBadge = function genBadge() {
      return (0, _vue.withDirectives)((0, _vue.h)('span', setBackground(props.color, {
        "class": _objectSpread({}, classes.value),
        style: [styles.value]
      }), [(0, _vue.h)('span', {
        "class": {
          'vue-badge__content': true
        }
      }, content())]), [[_vue.vShow, isActive.value]]);
    };

    return function () {
      var slotContent = slots["default"] && slots["default"]();
      var transitionedBadge = (0, _useTransition.useTransition)(props, genBadge());
      return (0, _vue.h)('span', {
        "class": {
          'v-badge': true
        }
      }, [(0, _vue.h)(transitionedBadge()), slotContent]);
    };
  }
});
exports.VBadge = VBadge;
//# sourceMappingURL=VBadge.js.map