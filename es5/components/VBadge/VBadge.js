"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VBadge = void 0;

require("../../../src/components/VBadge/VBadge.scss");

var _vue = require("vue");

var _usePosition = require("../../effects/use-position");

var _useColors2 = require("../../effects/use-colors");

var _useToggle2 = require("../../effects/use-toggle");

var _useElevation2 = require("../../effects/use-elevation");

var _useTransition = require("../../effects/use-transition");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VBadge = (0, _vue.defineComponent)({
  name: 'v-badge',
  props: _objectSpread(_objectSpread({
    dot: Boolean,
    avatar: Boolean,
    border: Boolean,
    toggle: Boolean,
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
  }, (0, _usePosition.positionProps)()), (0, _useElevation2.elevationProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var offset = (0, _vue.computed)(function () {
      return props.dot ? 4 : 12;
    });

    var calcPosition = function calcPosition() {
      var offsetVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var value = -offset.value - Number(offsetVal);
      return "".concat(value, "px");
    };

    var computedLeft = (0, _vue.computed)(function () {
      return props.left && calcPosition(props.offsetX);
    });
    var computedRight = (0, _vue.computed)(function () {
      return props.right && calcPosition(props.offsetX);
    });
    var computedTop = (0, _vue.computed)(function () {
      return props.top && calcPosition(props.offsetY);
    });
    var computedBottom = (0, _vue.computed)(function () {
      return props.bottom && calcPosition(props.offsetY);
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-badge': true,
        'v-badge--border': props.border,
        'v-badge--dot': props.dot,
        'v-badge--avatar': props.avatar
      };
    });
    var badgeClasses = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-badge__badge': true
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

    function addContent() {
      if (props.dot) return undefined;
      if (props.content) return String(props.content);
      return undefined;
    }

    function genBadgeSlot() {
      var propsData = {
        "class": {
          'v-badge__badge-slot': true
        }
      };
      return slots.badge ? (0, _vue.h)('div', propsData, slots.badge()) : null;
    }

    function genContent() {
      var propsData = {
        "class": {
          'v-badge__content': true
        }
      };
      return (0, _vue.h)('div', propsData, [addContent(), genBadgeSlot()]);
    }

    function genBadge() {
      var propsData = setBackground(props.color, {
        "class": badgeClasses.value,
        style: styles.value
      });
      return (0, _vue.h)('div', propsData, genContent());
    }

    return function () {
      var badge = genBadge();

      if (props.toggle && !slots.badge) {
        var _useToggle = (0, _useToggle2.useToggle)(props, 'content'),
            isActive = _useToggle.isActive;

        badge = (0, _vue.withDirectives)(badge, [[_vue.vShow, isActive.value]]);
      }

      var propsData = {
        "class": classes.value
      };
      var children = [(0, _useTransition.useTransition)(badge, props.transition), slots["default"] && slots["default"]()];
      return (0, _vue.h)('div', propsData, children);
    };
  }
});
exports.VBadge = VBadge;
//# sourceMappingURL=VBadge.js.map