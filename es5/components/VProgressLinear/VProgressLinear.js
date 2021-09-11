"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VProgressLinear = void 0;

require("../../../src/components/VProgressLinear/VProgressLinear.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var VProgressLinear = (0, _vue.defineComponent)({
  name: 'v-progress-linear',
  props: {
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
      "default": null
    },
    backgroundOpacity: {
      type: String,
      "default": null
    },
    indeterminate: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean
  },
  setup: function setup(props) {
    var _useColors = (0, _useColors2.useColors)();

    _objectDestructuringEmpty(_useColors);

    function genProgressBuffer() {
      return (0, _vue.h)('div', {
        "class": 'v-progress-linear__buffer'
      });
    }

    function genProgressLinear() {
      return (0, _vue.h)('div', {
        "class": 'v-progress-linear',
        style: {
          height: "".concat(props.height, "px")
        }
      }, genProgressBuffer());
    }

    return function () {
      return genProgressLinear();
    };
  }
});
exports.VProgressLinear = VProgressLinear;
//# sourceMappingURL=VProgressLinear.js.map