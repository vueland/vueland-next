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

function useTransition(props, vnode) {
  return function () {
    return (0, _vue.createBlock)(_vue.Transition, {
      name: props.transition
    }, {
      "default": (0, _vue.withCtx)(function () {
        return [(0, _vue.h)(vnode)];
      })
    });
  };
}
//# sourceMappingURL=use-transition.js.map