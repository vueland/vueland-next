"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VApp = void 0;

require("../../../src/components/VApp/VApp.scss");

var _vue = require("vue");

var VApp = (0, _vue.defineComponent)({
  name: 'v-app',
  setup: function setup(_, _ref) {
    var slots = _ref.slots;
    return function () {
      return (0, _vue.h)('div', {
        "class": 'v-app'
      }, slots["default"] && slots["default"]());
    };
  }
});
exports.VApp = VApp;
//# sourceMappingURL=VApp.js.map