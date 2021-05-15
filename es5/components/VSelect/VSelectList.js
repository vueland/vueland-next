"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelectList = void 0;

require("../../../src/components/VSelect/VSelectList.scss");

var _vue = require("vue");

var _VList = require("../VList");

var _useToggle2 = require("../../effects/use-toggle");

var _useTransition = require("../../effects/use-transition");

var _useElevation2 = require("../../effects/use-elevation");

var _useColors2 = require("../../effects/use-colors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VSelectList = (0, _vue.defineComponent)({
  name: 'v-select-list',
  props: _objectSpread({
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: String,
    elevation: {
      type: [String, Number],
      "default": 4
    }
  }, (0, _useColors2.colorProps)()),
  emits: ['select'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useToggle = (0, _useToggle2.useToggle)(props, 'active'),
        isActive = _useToggle.isActive;

    var _useElevation = (0, _useElevation2.useElevation)(props),
        elevationClasses = _useElevation.elevationClasses;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    function genItems() {
      var key = props.valueKey;
      var propsData = {
        "class": {},
        style: {}
      };
      return props.items.map(function (it) {
        var item = (0, _vue.h)(_VList.VListItemTitle, props.color ? setTextColor(props.color, propsData) : propsData, {
          "default": function _default() {
            return key ? it[key] : it;
          }
        });
        return (0, _vue.h)(_VList.VListItem, {
          key: props.idKey,
          onClick: function onClick() {
            return emit('select', it);
          }
        }, {
          "default": function _default() {
            return item;
          }
        });
      });
    }

    function genSelectListItems() {
      return (0, _vue.h)(_VList.VList, {
        "class": 'v-select--items-list'
      }, {
        "default": function _default() {
          return genItems();
        }
      });
    }

    function genList() {
      var propsData = {
        "class": _objectSpread({
          'v-select-list': true
        }, elevationClasses.value),
        style: {}
      };
      return (0, _vue.withDirectives)((0, _vue.h)('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genSelectListItems()), [[_vue.vShow, isActive.value]]);
    }

    return function () {
      return (0, _useTransition.useTransition)(genList(), 'fade');
    };
  }
});
exports.VSelectList = VSelectList;
//# sourceMappingURL=VSelectList.js.map