"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleProps = toggleProps;
exports.useToggle = useToggle;

var _vue = require("vue");

function toggleProps() {
  return {
    modelValue: [String, Boolean, Number]
  };
}

function useToggle(props) {
  var isActive = (0, _vue.ref)(false);
  (0, _vue.watch)(function () {
    return props.modelValue;
  }, function (to) {
    isActive.value = !!to;
  }, {
    immediate: true
  });
  return {
    isActive: isActive
  };
}
//# sourceMappingURL=use-toggle.js.map