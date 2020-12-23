"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VList = void 0;

require("../../../src/components/VList/VList.scss");

var _vue = require("vue");

var VList = (0, _vue.defineComponent)({
  name: 'v-list',
  setup: function setup(_, _ref) {
    var slots = _ref.slots;
    var groups = (0, _vue.reactive)({
      items: [],
      register: function register(group) {
        this.items.push(group);
      },
      unRegister: function unRegister(group) {
        this.items.filter(function (it) {
          return it.ref !== group._value;
        });
      },
      listClick: function listClick(ref) {
        this.items.length && this.items.forEach(function (group) {
          if (group.ref === ref._value) {
            group.active = !group.active;
          }
        });
      }
    });
    (0, _vue.provide)('groups', groups);
    return function () {
      var dataProps = {
        "class": {
          'v-list': true
        }
      };
      return (0, _vue.h)('div', dataProps, slots["default"] && slots["default"]());
    };
  }
});
exports.VList = VList;
//# sourceMappingURL=VList.js.map