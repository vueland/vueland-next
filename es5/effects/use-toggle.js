"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleProps = toggleProps;
exports.useToggle = useToggle;
exports.factory = factory;

var _vue = require("vue");

function toggleProps() {
  return {
    value: Boolean
  };
}

function useToggle(props, context) {
  console.log(props, context);
  return {};
}

function factory() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';
  var emit = arguments.length > 2 ? arguments[2] : undefined;
  var isActive = (0, _vue.ref)(false);
  var model = {
    prop: prop,
    event: event
  };
  (0, _vue.watch)([prop], function (val) {
    return isActive.value = !!val;
  });
  (0, _vue.watch)(isActive, function (val) {
    !!val !== isActive.value && emit(event, val);
  });
  return {
    model: model,
    isActive: isActive
  };
}
//# sourceMappingURL=use-toggle.js.map