"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VListGroup = void 0;

require("../../../src/components/VList/VListGroup.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useElevation2 = require("../../effects/use-elevation");

var _VIcon = require("../VIcon");

var _VListItem = require("./VListItem");

var _index = require("./index");

var _transitions = require("../transitions");

var _icons = require("../../services/icons");

var _sizes = require("../../services/sizes");

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
      "default": _icons.FaIcons.$expand
    },
    prependIcon: {
      type: String,
      "default": ''
    },
    color: {
      type: String
    },
    disabled: Boolean,
    group: String,
    expanded: Boolean,
    noAction: Boolean,
    subGroup: Boolean
  }, (0, _useElevation2.elevationProps)()),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var refGroup = (0, _vue.ref)(null);
    var isActive = (0, _vue.ref)(false);
    var children = (0, _vue.ref)([]);

    var _inject = (0, _vue.inject)('groups'),
        groups = _inject.groups,
        register = _inject.register,
        unRegister = _inject.unRegister,
        listClick = _inject.listClick;

    (0, _vue.provide)('subgroups', children);
    var subgroups = props.subGroup && (0, _vue.inject)('subgroups');
    var listGroup = {
      ref: refGroup,
      active: isActive
    };
    if (groups) register(listGroup);
    if (subgroups) subgroups.value.push(listGroup);

    if (!props.noAction && props.expanded) {
      requestAnimationFrame(onClick);
    }

    var classes = (0, _vue.computed)(function () {
      return _objectSpread(_defineProperty({
        'v-list-group': true,
        'v-list-group__sub-group': props.subGroup,
        'v-list-group--expanded': isActive.value && !props.noAction
      }, props.activeClass, isActive.value), elevationClasses.value);
    });

    function onClick() {
      if (props.noAction) return;
      (groups === null || groups === void 0 ? void 0 : groups.value.length) && listClick(refGroup);
      children.value.length && children.value.forEach(function (it) {
        return it.active = false;
      });
    }

    function genIcon(icon) {
      var propsData = {
        size: _sizes.Sizes.small
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData, {
        "default": function _default() {
          return icon;
        }
      });
    }

    function genAppendIcon() {
      var slotIcon = slots.appendIcon && slots.appendIcon();
      var icon = !props.subGroup && !props.noAction ? props.appendIcon : false;
      if (!icon && !slotIcon || !props.subGroup && props.noAction) return null;
      var propsData = {
        "class": 'v-list-group__append-icon'
      };
      return (0, _vue.h)(_index.VListItemIcon, propsData, {
        "default": function _default() {
          return slotIcon || genIcon(icon);
        }
      });
    }

    function genPrependIcon() {
      var icon = props.subGroup && !props.noAction ? _icons.FaIcons.$subgroup : props.prependIcon;
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
          'v-list-group__header': !props.subGroup,
          'v-list-group__header--sub-group': props.subGroup
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

    function genPropsData() {
      return {
        "class": classes.value,
        ref: refGroup
      };
    }

    (0, _vue.onBeforeUnmount)(function () {
      unRegister(refGroup);
    });
    return function () {
      var items = slots["default"] && (0, _transitions.VExpandTransition)(genItems());
      var header = slots.title && genGroupHeader();
      var propsData = props.color ? setTextColor(props.color, genPropsData()) : genPropsData();
      var children = [header, items];
      return (0, _vue.h)('div', propsData, children);
    };
  }
});
exports.VListGroup = VListGroup;
//# sourceMappingURL=VListGroup.js.map