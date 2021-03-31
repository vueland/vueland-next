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
    var groups = (0, _vue.ref)([]);

    function register(group) {
      groups.value.push(group);
    }

    function unRegister(group) {
      groups.value.filter(function (it) {
        return it.ref !== group.value;
      });
    }

    function listClick(ref) {
      groups.value.length && groups.value.forEach(function (group) {
        if (group.ref === ref.value) {
          group.active = !group.active;
        }

        console.log(groups.value[0].ref);
      });
    }

    (0, _vue.provide)('groups', {
      groups: groups,
      register: register,
      unRegister: unRegister,
      listClick: listClick
    });
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