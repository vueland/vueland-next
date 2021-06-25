"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VListItem = void 0;

require("../../../src/components/VList/VListItem.scss");

var _vue = require("vue");

var _useToggle2 = require("../../effects/use-toggle");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VListItem = (0, _vue.defineComponent)({
  name: 'v-list-item',
  props: {
    activeClass: {
      type: String,
      "default": ''
    },
    dark: Boolean,
    inactive: Boolean,
    active: Boolean,
    link: Boolean,
    value: {
      type: [Object, String, Number, Boolean],
      "default": null
    }
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useToggle = (0, _useToggle2.useToggle)(props),
        isActive = _useToggle.isActive;

    var handlers = (0, _vue.inject)('list-handlers');
    var listTypes = (0, _vue.inject)('list-types');
    var listItems = (0, _vue.inject)('list-items');
    var groupItems = listTypes.isInGroup && (0, _vue.inject)('group-items');
    var itemRef = (0, _vue.ref)(null);
    var item = {
      ref: itemRef,
      active: isActive
    };
    listTypes.isInList = !listTypes.isInGroup;
    (0, _vue.watch)(function () {
      return props.active;
    }, function (to) {
      return isActive.value = to;
    }, {
      immediate: true
    });
    var classes = (0, _vue.computed)(function () {
      return _defineProperty({
        'v-list-item': true,
        'v-list-item--active': isActive.value,
        'v-list-item--link': props.link
      }, props.activeClass, isActive.value && !!props.activeClass);
    });

    function onClick() {
      if (item.active) {
        isActive.value = true;
      }

      if (!listTypes.isInGroup || props.link) {
        isActive.value = !isActive.value;
      }

      if (!props.link && listTypes.isInGroup) {
        handlers.itemClick(groupItems.items, item);
      }

      if (!props.link && listTypes.isInList) {
        handlers.itemClick(listItems.items, item);
      }

      emit('click');
    }

    (0, _vue.onMounted)(function () {
      if (groupItems && groupItems.parent.value === itemRef.value.parentNode.parentNode) {
        !props.link && (groupItems === null || groupItems === void 0 ? void 0 : groupItems.items.value.push(item));
      }

      if (listTypes.isInList && listItems) listItems.items.value.push(item);
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (listTypes.isInGroup) {
        groupItems.items.value = groupItems.items.value.filter(function (it) {
          return it !== item;
        });
      }

      if (listTypes.isInList) {
        listItems.items.value = listItems.items.value.filter(function (it) {
          return it !== item;
        });
      }
    });
    return function () {
      var content = slots["default"] && slots["default"]({
        active: isActive.value
      });
      var propsData = {
        "class": classes.value,
        ref: itemRef,
        onClick: onClick
      };
      return (0, _vue.h)('div', propsData, content);
    };
  }
});
exports.VListItem = VListItem;
//# sourceMappingURL=VListItem.js.map