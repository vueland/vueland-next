"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIcon = void 0;

require("../../../src/components/VIcon/VIcon.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useSizes = require("../../effects/use-sizes");

var _helpers = require("../../helpers");

var _sizes = require("../../services/sizes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VIcon = (0, _vue.defineComponent)({
  name: 'v-icon',
  props: _objectSpread(_objectSpread({
    disabled: Boolean,
    active: Boolean,
    clickable: Boolean,
    size: [String, Number],
    dense: Boolean,
    icon: String,
    iconType: String,
    tag: {
      type: String,
      "default": 'i'
    }
  }, (0, _useColors2.colorProps)()), (0, _useSizes.sizeProps)()),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var iconTag = props.clickable ? 'button' : props.tag;
    var icon = (0, _vue.computed)(function () {
      return props.icon || slots["default"] && slots["default"]()[0].children;
    });
    var classes = (0, _vue.computed)(function () {
      var _ref2;

      return _ref2 = {
        'v-icon': true,
        'v-icon--disabled': props.disabled,
        'v-icon--link': props.clickable,
        'v-icon--dense': props.dense,
        'v-icon--clickable': props.clickable
      }, _defineProperty(_ref2, props.iconType, !!props.iconType), _defineProperty(_ref2, icon.value, !!icon.value), _ref2;
    });
    var isMedium = (0, _vue.computed)(function () {
      return !props.large && !props.small && !props.xLarge && !props.xSmall && !props.size;
    });

    function getSizes() {
      var sizeProps = {
        large: props.large,
        small: props.small,
        xLarge: props.xLarge,
        xSmall: props.xSmall,
        medium: isMedium.value
      };
      var explicitSize = Object.keys(sizeProps).find(function (key) {
        return sizeProps[key];
      });
      return explicitSize && _sizes.Sizes[explicitSize] || (0, _helpers.convertToUnit)(props.size);
    }

    function onClick() {
      if (!props.disabled && props.clickable) {
        emit('click');
      }
    }

    function genDataProps() {
      return {
        "class": classes.value,
        style: {
          fontSize: getSizes()
        },
        onClick: onClick
      };
    }

    return function () {
      return (0, _vue.h)(iconTag, setTextColor(props.color, genDataProps()));
    };
  }
});
exports.VIcon = VIcon;
//# sourceMappingURL=VIcon.js.map