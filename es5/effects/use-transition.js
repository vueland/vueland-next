"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionProps = transitionProps;
exports.useTransition = useTransition;

var _vue = require("vue");

function transitionProps() {
  return {
    transition: String
  };
}

function useTransition(vNode, transition) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var props = {
    name: transition,
    mode: mode
  };
  return (0, _vue.createBlock)(_vue.Transition, props, {
    "default": (0, _vue.withCtx)(function () {
      return vNode && [(0, _vue.h)(vNode)];
    })
  });
}
//# sourceMappingURL=use-transition.js.map