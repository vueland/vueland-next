"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VListItem = void 0;

require("../../../src/components/VList/VListItem.scss");

var _vue = require("vue");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VListItem = (0, _vue.defineComponent)({
  name: 'v-list-item',
  props: {
    value: String,
    modelValue: [String, Number],
    activeClass: String,
    active: Boolean
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var classes = (0, _vue.computed)(function () {
      return _defineProperty({
        'v-list-item': true,
        'v-list-item--active': !!props.activeClass
      }, props.activeClass, !!props.activeClass && props.active);
    });

    function onClick() {
      if (props.activeClass) {
        emit('update:active', !props.active);
        emit('active', !props.active);
      }
    }

    return function () {
      var content = props.value || props.modelValue || slots["default"] && slots["default"]();
      var propsData = {
        "class": classes.value,
        onClick: onClick
      };
      return (0, _vue.h)('div', propsData, content);
    };
  }
});
exports.VListItem = VListItem;
//# sourceMappingURL=VListItem.js.map