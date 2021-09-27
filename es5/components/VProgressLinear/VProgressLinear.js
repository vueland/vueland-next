"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VProgressLinear = void 0;

require("../../../src/components/VProgressLinear/VProgressLinear.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VProgressLinear = (0, _vue.defineComponent)({
  name: 'v-progress-linear',
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    modelValue: {
      type: [String, Number],
      "default": null
    },
    bufferValue: {
      type: [String, Number],
      "default": null
    },
    height: {
      type: [Number, String],
      "default": 4
    },
    color: {
      type: String,
      "default": 'primary'
    },
    backgroundColor: {
      type: String,
      "default": 'primary'
    },
    backgroundOpacity: {
      type: String,
      "default": '0.3'
    },
    indeterminate: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean
  },
  setup: function setup(props) {
    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    function genProgressBar() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var barWidth = props.value || props.modelValue;
      var propsData = {
        "class": _defineProperty({
          'v-progress-linear__bar': true
        }, type, !!type),
        style: {
          width: !props.indeterminate ? barWidth + '%' : ''
        }
      };
      return (0, _vue.h)('div', setBackground(props.color, propsData));
    }

    function genProgressBuffer() {
      var bufferWidth = props.value || props.modelValue;
      var propsData = {
        "class": {
          'v-progress-linear__buffer': true
        },
        style: {
          width: bufferWidth ? bufferWidth + '%' : ''
        }
      };
      return (0, _vue.h)('div', propsData);
    }

    function genProgressBackground() {
      var propsData = {
        "class": {
          'v-progress-linear__background': true
        },
        style: {
          opacity: props.backgroundOpacity
        }
      };
      return (0, _vue.h)('div', setBackground(props.backgroundColor, propsData));
    }

    function genProgressIndeterminate() {
      return (0, _vue.h)('div', {
        "class": {
          'v-progress-linear__indeterminate': true
        }
      }, [genProgressBar('long'), genProgressBar('short')]);
    }

    function genProgressLinear() {
      return (0, _vue.h)('div', {
        "class": 'v-progress-linear',
        style: {
          height: "".concat(props.height, "px")
        }
      }, [genProgressBackground(), genProgressBuffer(), props.indeterminate ? genProgressIndeterminate() : genProgressBar()]);
    }

    return function () {
      return genProgressLinear();
    };
  }
});
exports.VProgressLinear = VProgressLinear;
//# sourceMappingURL=VProgressLinear.js.map