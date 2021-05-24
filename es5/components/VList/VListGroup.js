"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VListGroup = void 0;

require("../../../src/components/VList/VListGroup.scss");

var _vue = require("vue");

var _useIcons2 = require("../../effects/use-icons");

var _useColors2 = require("../../effects/use-colors");

var _useGroup2 = require("../../effects/use-group");

var _useElevation2 = require("../../effects/use-elevation");

var _VIcon = require("../VIcon");

var _VListItem = require("./VListItem");

var _index = require("./index");

var _transitions = require("../transitions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VListGroup = (0, _vue.defineComponent)({
  name: 'v-list-group',
  props: _objectSpread({
    activeClass: {
      type: String,
      "default": ''
    },
    appendIcon: {
      type: String,
      "default": ''
    },
    prependIcon: {
      type: String,
      "default": ''
    },
    color: {
      type: String,
      "default": ''
    },
    dark: Boolean,
    multiple: Boolean,
    group: String,
    disabled: Boolean,
    active: Boolean,
    noAction: Boolean,
    expanded: Boolean,
    subGroup: Boolean,
    value: Boolean,
    modelValue: Boolean
  }, (0, _useElevation2.elevationProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useIcons = (0, _useIcons2.useIcons)('md'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var _useGroup = (0, _useGroup2.useGroup)(),
        injectGroup = _useGroup.injectGroup,
        provideGroup = _useGroup.provideGroup;

    var refGroup = (0, _vue.ref)(null);
    var isActive = (0, _vue.ref)(false);
    var childrenGroups = (0, _vue.ref)([]);
    provideGroup('subgroups');
    provideGroup('selected');
    provideGroup('items');
    var groups = injectGroup('list-groups');
    var subgroups = props.subGroup && injectGroup('subgroups');
    var listGroup = genListGroupParams();
    var isNotActive = (0, _vue.computed)(function () {
      return !props.subGroup && !props.active;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread(_defineProperty({
        'v-list-group': true,
        'v-list-group__sub-group': props.subGroup,
        'v-list-group--active': isActive.value,
        'v-list-group--no-action': props.noAction
      }, props.activeClass, isActive.value), elevationClasses.value);
    });

    function onClick() {
      if (isNotActive.value) return;
      if (groups) groups.listClick(listGroup);

      if (childrenGroups.value.length) {
        childrenGroups.value.forEach(function (it) {
          return it.active = false;
        });
      }
    }

    function genListGroupParams() {
      return {
        ref: refGroup,
        active: isActive
      };
    }

    function genIcon(icon) {
      var propsData = {
        size: iconSize
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData, {
        "default": function _default() {
          return icon;
        }
      });
    }

    function genAppendIcon() {
      var slotAppendIcon = slots.appendIcon && slots.appendIcon();
      var propsAppendIcon = !props.subGroup ? icons.$expand : props.appendIcon;
      if (!propsAppendIcon && !slotAppendIcon) return null;
      var propsData = {
        "class": 'v-list-group__append-icon'
      };
      return (0, _vue.h)(_index.VListItemIcon, propsData, {
        "default": function _default() {
          return slotAppendIcon || genIcon(propsAppendIcon);
        }
      });
    }

    function genPrependIcon() {
      var icon = props.subGroup ? icons.$subgroup : props.prependIcon;
      var slotIcon = slots.prependIcon && slots.prependIcon();
      if (!icon && !slotIcon) return null;
      var propsData = {
        "class": 'v-list-group__prepend-icon'
      };
      return (0, _vue.h)(_index.VListItemIcon, propsData, {
        "default": function _default() {
          return slotIcon || genIcon(icon);
        }
      });
    }

    function genGroupHeader() {
      var propsData = {
        "class": {
          'v-list-group__header': true
        },
        onClick: onClick
      };
      return (0, _vue.h)(_VListItem.VListItem, propsData, {
        "default": function _default() {
          return [genPrependIcon(), slots.title && slots.title(), genAppendIcon()];
        }
      });
    }

    function genItems() {
      var propsData = {
        "class": 'v-list-group__items'
      };
      return (0, _vue.withDirectives)((0, _vue.h)('div', propsData, slots["default"] && slots["default"]()), [[_vue.vShow, isActive.value]]);
    }

    (0, _vue.onMounted)(function () {
      if (groups) groups.register(listGroup);
      if (subgroups) subgroups.register(listGroup);
      if (isNotActive.value) isActive.value = true;
    });
    (0, _vue.onBeforeUnmount)(function () {
      groups.unregister(listGroup);
    });
    return function () {
      var items = slots["default"] && (0, _transitions.VExpandTransition)(genItems());
      var header = slots.title && genGroupHeader();
      var propsData = {
        "class": classes.value,
        ref: refGroup
      };
      var children = [header, items];
      var color = props.dark ? 'white' : props.color;
      return (0, _vue.h)('div', color ? setTextColor(color, propsData) : propsData, children);
    };
  }
});
exports.VListGroup = VListGroup;
//# sourceMappingURL=VListGroup.js.map