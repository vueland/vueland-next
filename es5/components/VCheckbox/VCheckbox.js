"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCheckbox = void 0;

require("../../../src/components/VCheckbox/VCheckbox.scss");

var _vue = require("vue");

var _useValidate2 = require("../../effects/use-validate");

var _useIcons2 = require("../../effects/use-icons");

var _VIcon = require("../VIcon");

var _VLabel = require("../VLabel");

var _helpers = require("../../helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var VCheckbox = (0, _vue.defineComponent)({
  name: 'v-checkbox',
  props: {
    onIcon: {
      type: String
    },
    offIcon: {
      type: String
    },
    dark: Boolean,
    label: String,
    disabled: Boolean,
    validate: Boolean,
    modelValue: [Array, Boolean],
    value: {
      "default": null
    },
    color: {
      type: String,
      "default": 'primary'
    }
  },
  emits: ['checked', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var isChecked = (0, _vue.ref)(false);
    var fields = props.validate && (0, _vue.inject)('fields');

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        validationState = _useValidate.validationState;

    var _useIcons = (0, _useIcons2.useIcons)('l'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var isArray = (0, _vue.computed)(function () {
      return Array.isArray(props.modelValue);
    });
    var isValueSet = (0, _vue.computed)(function () {
      return props.value !== null;
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-checkbox': true,
        'v-checkbox--disabled': props.disabled,
        'v-checkbox--checked': isChecked.value,
        'v-validatable': props.validate
      };
    });
    (0, _vue.watch)(function () {
      return props.modelValue;
    }, function () {
      if (isArray.value) {
        if (isValueSet.value) {
          isChecked.value = props.modelValue.includes(props.value);
        } else {
          (0, _helpers.warning)('v-checkbox: set the "value" prop');
        }
      } else {
        isChecked.value = !!props.modelValue;
      }
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      return validate(isChecked.value);
    }

    function genLabel() {
      var propsData = {
        absolute: false,
        color: props.dark ? 'white' : '',
        disabled: props.disabled,
        "class": 'v-checkbox__label'
      };
      return (0, _vue.h)(_VLabel.VLabel, propsData, {
        "default": function _default() {
          return props.label;
        }
      });
    }

    function genIcon() {
      var onIcon = props.onIcon || icons.$checkOn;
      var offIcon = props.offIcon || icons.$checkOff;
      var icon = isChecked.value ? onIcon : offIcon;
      var propsData = {
        icon: icon,
        size: iconSize,
        color: validationState.value,
        disabled: props.disabled
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData);
    }

    function genCheckbox() {
      var propsData = {
        "class": 'v-checkbox__square'
      };
      return (0, _vue.h)('div', propsData, genIcon());
    }

    function computeValue() {
      if (isArray.value) {
        var modelValue = _toConsumableArray(props.modelValue);

        isChecked.value = !modelValue.includes(props.value);

        if (!isChecked.value) {
          modelValue = modelValue.filter(function (it) {
            return it !== props.value;
          });
        } else {
          modelValue.push(props.value);
        }

        return modelValue;
      }

      return isChecked.value = !isChecked.value;
    }

    function onClick() {
      if (props.disabled) return;
      var value = computeValue();
      props.validate && validateValue();
      emit('update:modelValue', value);
      emit('checked', value);
    }

    return function () {
      var dataProps = {
        "class": classes.value,
        onClick: onClick
      };
      return (0, _vue.h)('div', dataProps, [genCheckbox(), props.label && genLabel()]);
    };
  }
});
exports.VCheckbox = VCheckbox;
//# sourceMappingURL=VCheckbox.js.map