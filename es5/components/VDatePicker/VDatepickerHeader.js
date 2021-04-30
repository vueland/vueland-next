"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatepickerHeader = void 0;

require("../../../src/components/VDatePicker/VDatePickerHeader.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _icons = require("../../services/icons");

var _VIcon = require("../VIcon");

var VDatepickerHeader = (0, _vue.defineComponent)({
  name: 'v-date-picker-header',
  props: {
    onNext: Function,
    onPrev: Function,
    color: String
  },
  emits: ['table'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var genHeaderButton = function genHeaderButton(isRight) {
      var icon = isRight ? _icons.FaIcons.$arrowRight : _icons.FaIcons.$arrowLeft;
      var propsData = {
        "class": 'v-date-picker__header-button'
      };
      var iconPropsData = {
        icon: icon,
        clickable: true,
        size: 18,
        onClick: function onClick() {
          return isRight ? props.onNext() : props.onPrev();
        }
      };
      var arrowBtn = (0, _vue.h)(_VIcon.VIcon, props.color ? setTextColor(props.color, iconPropsData) : iconPropsData);
      return (0, _vue.h)('div', propsData, arrowBtn);
    };

    var genHeaderDisplay = function genHeaderDisplay() {
      var propsData = {
        "class": {
          'v-date-picker__header-display': true
        },
        onClick: function onClick() {
          return emit('table');
        }
      };
      return (0, _vue.h)('div', props.color ? setTextColor(props.color, propsData) : propsData, slots["default"] && slots["default"]());
    };

    return function () {
      return (0, _vue.h)('div', {
        "class": 'v-date-picker__header'
      }, [genHeaderButton(false), genHeaderDisplay(), genHeaderButton(true)]);
    };
  }
});
exports.VDatepickerHeader = VDatepickerHeader;
//# sourceMappingURL=VDatepickerHeader.js.map