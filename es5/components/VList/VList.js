"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VList = void 0;

require("../../../src/components/VList/VList.scss");

var _vue = require("vue");

var _useGroup2 = require("../../effects/use-group");

var VList = (0, _vue.defineComponent)({
  name: 'v-list',
  setup: function setup(_, _ref) {
    var slots = _ref.slots;

    var _useGroup = (0, _useGroup2.useGroup)(),
        provideGroup = _useGroup.provideGroup;

    provideGroup('list-groups', {
      listClick: listClick
    });

    function listClick(groups, listGroup) {
      groups.value.length && groups.value.forEach(function (group) {
        if (group.ref === listGroup.ref.value) {
          group.active = !group.active;
        }
      });
    }

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