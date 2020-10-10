"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elevationProps = elevationProps;
exports.useElevation = useElevation;

var _vue = require("vue");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function elevationProps() {
  return {
    elevation: [String, Number]
  };
}

function useElevation(props) {
  var computedElevation = (0, _vue.computed)(function () {
    return props.elevation;
  });
  var elevationClasses = (0, _vue.computed)(function () {
    return _defineProperty({}, "elevation-".concat(props.elevation), !!computedElevation.value);
  });
  return {
    elevationClasses: elevationClasses
  };
}
//# sourceMappingURL=use-elevation.js.map