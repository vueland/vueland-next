"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCheckbox = void 0;

require("../../../src/components/VCheckbox/VCheckbox.scss");

var _vue = require("vue");

var _useValidate2 = require("@/effects/use-validate");

var _VIcon = require("../VIcon");

var _VLabel = require("../VLabel");

var _icons = require("../../services/icons");

var _helpers = require("../../helpers");

var VCheckbox = (0, _vue.defineComponent)({
  name: 'v-checkbox',
  props: {
    onIcon: {
      type: String,
      "default": _icons.FaIcons.$checkOn
    },
    offIcon: {
      type: String,
      "default": _icons.FaIcons.$checkOff
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
          (0, _helpers.warning)('v-checkbox: set the "value" property');
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
      var icon = isChecked.value ? props.onIcon : props.offIcon;
      var propsData = {
        icon: icon,
        size: 20,
        color: validationState.value,
        disabled: props.disabled
      };
      return (0, _vue.h)(_VIcon.VIcon, propsData);
    }

    function genCheckbox() {
      var propsData = {
        "class": {
          'v-checkbox__square': true
        }
      };
      return (0, _vue.h)('div', propsData, genIcon());
    }

    function computeValue() {
      var modelValue = props.modelValue;

      if (isArray.value) {
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