"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VModal = void 0;

require("../../../src/components/VModal/VModal.scss");

var _vue = require("vue");

// Styles
// Vue API
var modalProps = {
  width: {
    type: [String, Number],
    "default": 400
  }
};
var VModal = (0, _vue.defineComponent)({
  name: 'v-modal',
  props: modalProps
});
exports.VModal = VModal;
//# sourceMappingURL=VModal.js.map