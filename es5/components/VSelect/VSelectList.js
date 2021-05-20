"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelectList = void 0;

require("../../../src/components/VSelect/VSelectList.scss");

var _vue = require("vue");

var _VList = require("../VList");

var _useColors2 = require("../../effects/use-colors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VSelectList = (0, _vue.defineComponent)({
  name: 'v-select-list',
  props: _objectSpread({
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: {
      type: String,
      "default": 'white'
    },
    elevation: {
      type: [String, Number],
      "default": 4
    }
  }, (0, _useColors2.colorProps)()),
  emits: ['select'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var selected = (0, _vue.ref)(null);

    function genItems() {
      var _props$items;

      var key = props.valueKey;
      var propsData = {
        "class": {},
        style: {}
      };
      return (_props$items = props.items) === null || _props$items === void 0 ? void 0 : _props$items.map(function (it) {
        var item = (0, _vue.h)(_VList.VListItemTitle, props.color ? setTextColor(props.color, propsData) : propsData, {
          "default": function _default() {
            return key ? it[key] : it;
          }
        });
        return (0, _vue.h)(_VList.VListItem, {
          key: props.idKey,
          "class": {
            'v-select-item--selected': it === selected.value
          },
          onClick: function onClick() {
            selected.value = it;
            emit('select', it);
          }
        }, {
          "default": function _default() {
            return item;
          }
        });
      });
    }

    function genSelectListItems() {
      return (0, _vue.h)(_VList.VList, {}, {
        "default": function _default() {
          return genItems();
        }
      });
    }

    function genList() {
      var propsData = {
        "class": {
          'v-select-list': true
        },
        style: {}
      };
      return (0, _vue.h)('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genSelectListItems());
    }

    return function () {
      return genList();
    };
  }
});
exports.VSelectList = VSelectList;
//# sourceMappingURL=VSelectList.js.map