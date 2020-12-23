"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VForm = void 0;

require("../../../src/components/VForm/VForm.scss");

var _vue = require("vue");

var VForm = (0, _vue.defineComponent)({
  name: 'v-form',
  setup: function setup(_, _ref) {
    var slots = _ref.slots;
    var fields = (0, _vue.ref)([]);
    (0, _vue.provide)('fields', fields);

    var validate = function validate() {
      var promises = [];
      fields.value.forEach(function (it) {
        promises.push(it());
      });
      return Promise.resolve(!promises.some(function (f) {
        return !f;
      }));
    };

    var genSlot = function genSlot() {
      return (0, _vue.renderSlot)(slots, 'default', {
        validate: validate
      });
    };

    return function () {
      return (0, _vue.h)('span', {
        "class": 'v-form'
      }, genSlot());
    };
  }
});
exports.VForm = VForm;
//# sourceMappingURL=VForm.js.map