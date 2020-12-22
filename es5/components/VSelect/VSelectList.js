"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelectList = void 0;

require("../../../src/components/VSelect/VSelectList.scss");

var _vue = require("vue");

var _VList = require("../VList");

var _transitions = require("../transitions");

var _useToggle2 = require("@/effects/use-toggle");

var VSelectList = (0, _vue.defineComponent)({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useToggle = (0, _useToggle2.useToggle)(props, 'active'),
        isActive = _useToggle.isActive;

    function genItems() {
      var key = props.valueKey;
      return props.items.map(function (it) {
        var item = (0, _vue.h)(_VList.VListItemTitle, {}, {
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

    function genSelectList() {
      var listVNode = (0, _vue.h)(_VList.VList, {
        "class": 'v-select--items-list'
      }, {
        "default": function _default() {
          return genItems();
        }
      });
      return (0, _vue.withDirectives)((0, _vue.h)('div', {
        "class": 'v-select-list'
      }, listVNode), [[_vue.vShow, isActive.value]]);
    }

    return function () {
      return (0, _transitions.VFadeTransition)(genSelectList());
    };
  }
});
exports.VSelectList = VSelectList;
//# sourceMappingURL=VSelectList.js.map