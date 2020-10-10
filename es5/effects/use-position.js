"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePosition = exports.positionProps = void 0;

var _vue = require("vue");

// Vue API
var positionProps = function positionProps() {
  return {
    absolute: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,
    bottom: Boolean,
    offsetX: [String, Number],
    offsetY: [String, Number]
  };
};

exports.positionProps = positionProps;

var usePosition = function usePosition(props) {
  var positionClasses = (0, _vue.computed)(function () {
    return {
      'position--absolute': props.absolute,
      'to--left': props.left,
      'to--right': props.right,
      'to--top': props.top,
      'to--bottom': props.bottom
    };
  });
  return {
    positionClasses: positionClasses
  };
};

exports.usePosition = usePosition;
//# sourceMappingURL=use-position.js.map