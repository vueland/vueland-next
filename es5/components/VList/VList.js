"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VList = void 0;

require("../../../src/components/VList/VList.scss");

var _vue = require("vue");

var _useSelectMultiple = require("../../effects/use-select-multiple");

var VList = (0, _vue.defineComponent)({
  name: 'v-list',
  props: {
    multiple: Boolean
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useSelect = (0, _useSelectMultiple.useSelect)(),
        select = _useSelect.select;

    var listsGroup = (0, _vue.ref)([]);
    var listItems = (0, _vue.ref)([]);
    (0, _vue.provide)('lists-group', {
      items: listsGroup,
      register: register.bind(null, listsGroup),
      unregister: unregister.bind(null, listsGroup)
    });
    (0, _vue.provide)('list-items', {
      items: listItems,
      register: register.bind(null, listItems),
      unregister: unregister.bind(null, listItems)
    });
    (0, _vue.provide)('list-handlers', {
      listClick: listClick,
      itemClick: itemClick
    });
    (0, _vue.provide)('list-types', {
      isInGroup: false,
      isInList: false,
      isInMenu: false
    });

    function register(items, item) {
      items.value.push(item);
    }

    function unregister(items, item) {
      items.value.filter(function (it) {
        return it.ref !== item.ref;
      });
    }

    function listClick(groups, item) {
      if (groups.value.length) {
        groups.value.forEach(function (it) {
          if (it.ref === item.ref.value) {
            it.active = !it.active;
          }
        });
      }
    }

    function itemClick(items, item) {
      !props.multiple && select(items, item);
      props.multiple && (item.active.value = !item.active.value);
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