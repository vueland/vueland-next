"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VListItem = void 0;

require("../../../src/components/VList/VListItem.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useToggle2 = require("../../effects/use-toggle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VListItem = (0, _vue.defineComponent)({
  name: 'v-list-item',
  props: _objectSpread({
    activeClass: {
      type: String,
      "default": ''
    },
    dark: Boolean,
    inactive: Boolean,
    value: {
      type: [Object, String, Number, Boolean],
      "default": null
    }
  }, (0, _useColors2.colorProps)()),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-list-item': true,
        'v-list-item--active': isActive.value
      };
    });

    function onClick(e) {
      e.preventDefault();
      isActive.value = !isActive.value;
      emit('click', e);
    }

    return function () {
      var content = slots["default"] && slots["default"]({
        active: isActive.value
      });
      var propsData = {
        "class": classes.value,
        onClick: onClick
      };
      var color = props.dark ? 'white' : props.color;
      return (0, _vue.h)('div', color && isActive.value ? setTextColor(color, propsData) : propsData, content);
    };
  }
});
exports.VListItem = VListItem;
//# sourceMappingURL=VListItem.js.map