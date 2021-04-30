"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToggle = useToggle;

var _vue = require("vue");

function useToggle(props, propName) {
  var isActive = (0, _vue.ref)(false);
  var prop = propName ? propName : "modelValue";
  (0, _vue.watch)(function () {
    return props[prop];
  }, function (to) {
    return isActive.value = !!to;
  }, {
    immediate: true
  });
  return {
    isActive: isActive
  };
}
//# sourceMappingURL=use-toggle.js.map