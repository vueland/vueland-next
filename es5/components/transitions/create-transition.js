"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVTransition = createVTransition;

var _vue = require("vue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createVTransition(hooks) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "in-out";
  return function (vNode) {
    return (0, _vue.createBlock)(_vue.Transition, _objectSpread({
      mode: mode
    }, hooks), {
      "default": (0, _vue.withCtx)(function () {
        return [vNode && (0, _vue.h)(vNode)];
      })
    });
  };
}
//# sourceMappingURL=create-transition.js.map