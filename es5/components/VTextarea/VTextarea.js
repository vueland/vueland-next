"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VTextarea = void 0;

require("../../../src/components/VTextarea/VTextarea.scss");

var _vue = require("vue");

var _VTextField = require("../VTextField");

var VTextarea = (0, _vue.defineComponent)({
  name: 'v-textarea',
  setup: function setup() {
    return function () {
      return (0, _vue.h)(_VTextField.VTextField, {
        tag: 'textarea',
        "class": 'v-textarea'
      });
    };
  }
});
exports.VTextarea = VTextarea;
//# sourceMappingURL=VTextarea.js.map