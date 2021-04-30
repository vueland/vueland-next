"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeProps = sizeProps;
exports.useSizes = useSizes;

var _vue = require("vue");

function sizeProps() {
  return {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  };
}

function useSizes(props) {
  var medium = (0, _vue.computed)(function () {
    return !props.large && !props.small && !props.xLarge && !props.xSmall && !props.size;
  });
  var sizeClasses = (0, _vue.computed)(function () {
    return {
      "v-size--x-small": props.xSmall,
      "v-size--small": props.small,
      "v-size--default": medium.value,
      "v-size--large": props.large,
      "v-size--x-large": props.xLarge
    };
  });
  return {
    sizeClasses: sizeClasses
  };
}
//# sourceMappingURL=use-sizes.js.map