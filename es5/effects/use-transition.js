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

function useTransition(_ref, vNode) {
  var transition = _ref.transition;
  return function () {
    return (0, _vue.createBlock)(_vue.Transition, {
      name: transition
    }, {
      "default": (0, _vue.withCtx)(function () {
        return vNode && [(0, _vue.h)(vNode)];
      })
    });
  };
}
//# sourceMappingURL=use-transition.js.map