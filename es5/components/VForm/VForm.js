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

    var validate = function validate() {
      var promises = [];
      var fields = document.getElementsByClassName('v-validatable');
      Array.prototype.forEach.call(fields, function (it) {
        var validateValue = it.__vnode.props.methods.validateValue;
        promises.push(validateValue());
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
      return (0, _vue.h)('div', {
        "class": {
          'v-form': true
        }
      }, genSlot());
    };
  }
});
exports.VForm = VForm;
//# sourceMappingURL=VForm.js.map