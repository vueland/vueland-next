"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableModal = void 0;

var _vue = require("vue");

var _VCard = require("../VCard");

var _VModal = require("../VModal");

var VDataTableModal = (0, _vue.defineComponent)({
  name: 'v-data-table-modal',
  props: {
    dark: Boolean,
    color: String,
    show: Boolean
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    function genModalTitle() {
      return (0, _vue.h)(_VCard.VCardTitle, {
        "class": props.dark ? 'white--text' : ''
      }, {
        "default": function _default() {
          return slots.title && slots.title();
        }
      });
    }

    function genModalContent() {
      return (0, _vue.h)(_VCard.VCardContent, {}, {
        "default": function _default() {
          return slots.content && slots.content();
        }
      });
    }

    function genModalActions() {
      return (0, _vue.h)(_VCard.VCardActions, {}, {
        "default": function _default() {
          return slots.actions && slots.actions();
        }
      });
    }

    function genModal() {
      return (0, _vue.h)(_VCard.VCard, {
        width: 400,
        elevation: 15,
        color: props.color
      }, {
        "default": function _default() {
          return [slots.title && genModalTitle(), slots.content && genModalContent(), slots.actions && genModalActions()];
        }
      });
    }

    function genTableModal() {
      return (0, _vue.h)(_VModal.VModal, {
        overlay: true,
        transition: 'scale-in',
        modelValue: props.show
      }, {
        "default": function _default() {
          return genModal();
        }
      });
    }

    return function () {
      return genTableModal();
    };
  }
});
exports.VDataTableModal = VDataTableModal;
//# sourceMappingURL=VDataTableModal.js.map