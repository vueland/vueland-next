"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VOverlay = void 0;

require("../../../src/components/VOverlay/VOverlay.scss");

var _vue = require("vue");

var _useColors2 = require("@/effects/use-colors");

var VOverlay = (0, _vue.defineComponent)({
  name: "v-overlay",
  props: {
    hide: Boolean,
    active: Boolean,
    color: String
  },
  setup: function setup(props) {
    var _useColors = (0, _useColors2.useColors)(),
        setBackground = _useColors.setBackground;

    var classes = (0, _vue.computed)(function () {
      return {
        "v-overlay": true,
        "v-overlay--hidden": props.hide,
        "v-overlay--active": props.active
      };
    });

    function genDataProps() {
      return {
        "class": classes.value,
        style: [],
        ref: "overlay"
      };
    }

    return (0, _vue.h)("div", setBackground(props.color, genDataProps()));
  }
});
exports.VOverlay = VOverlay;
//# sourceMappingURL=VOverlay.js.map