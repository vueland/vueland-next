"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teleportProps = teleportProps;
exports.useTeleport = useTeleport;

var _vue = require("vue");

function teleportProps() {
  return {
    portTo: String
  };
}

function useTeleport(props, component) {
  return (0, _vue.createBlock)(_vue.Teleport, {
    to: props.portTo
  }, [(0, _vue.h)(component)]);
}
//# sourceMappingURL=use-teleport.js.map