"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VInput = void 0;

require("../../../src/components/VInput/VInput.scss");

var _vue = require("vue");

var _VLabel = require("../VLabel");

var _useTransition = require("../../effects/use-transition");

var _useColors2 = require("../../effects/use-colors");

var _useValidate2 = require("../../effects/use-validate");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vInputProps = _objectSpread(_objectSpread({
  label: String,
  height: [String, Number],
  dark: Boolean,
  type: {
    type: String,
    "default": 'text'
  },
  disabled: {
    type: Boolean,
    "default": false
  },
  required: {
    type: Boolean,
    "default": false
  },
  modelValue: [String, Number]
}, (0, _useValidate2.validateProps)()), (0, _useColors2.colorProps)());

var VInput = (0, _vue.defineComponent)({
  name: 'v-input',
  props: vInputProps,
  setup: function setup(props, ctx) {
    var state = (0, _vue.reactive)({
      value: '',
      focused: false
    });
    state.value = props.modelValue;

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        focused = _useValidate.focused,
        validateClasses = _useValidate.validateClasses,
        update = _useValidate.update,
        computedColor = _useValidate.computedColor,
        validationState = _useValidate.validationState,
        errorState = _useValidate.errorState;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var isDirty = (0, _vue.computed)(function () {
      return errorState.isDirty;
    });
    var isValid = (0, _vue.computed)(function () {
      return errorState.isDirty && !errorState.innerError;
    });
    var isNotValid = (0, _vue.computed)(function () {
      return errorState.isDirty && errorState.innerError;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-input': true,
        'v-input--disabled': props.disabled,
        'v-input--dirty': isDirty.value,
        'v-input--valid': isValid.value,
        'v-input--not-valid': isNotValid.value,
        'v-input--focused': state.focused
      }, validateClasses());
    });

    var validateValue = function validateValue() {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.value);
    };

    var focusHandler = function focusHandler() {
      focused();
      update(errorState.innerError);
      state.focused = true;
      ctx.emit('focus');
    };

    var blurHandler = function blurHandler() {
      ctx.emit('blur');
      state.focused = false;
      validateValue();
    };

    var inputHandler = function inputHandler(e) {
      state.value = e.target.value;
      ctx.emit('update:modelValue', state.value);
    };

    var genLabel = function genLabel() {
      var labelProps = {
        absolute: true,
        hasState: !!state.value,
        disabled: props.disabled,
        focused: state.focused,
        color: validationState.value
      };
      return (0, _vue.h)(_VLabel.VLabel.setup(labelProps, ctx), props.label);
    };

    var genTextField = function genTextField() {
      var textFieldProps = {
        type: props.type,
        disabled: props.disabled,
        value: state.value,
        "class": {
          'v-input__field': true
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler
      };
      return (0, _vue.h)('input', setTextColor(computedColor.value, textFieldProps));
    };

    var genTextFieldSlot = function genTextFieldSlot() {
      return (0, _vue.h)('div', {
        "class": {
          'v-input__text-slot': true
        }
      }, [genLabel(), genTextField()]);
    };

    var genStatusMessage = function genStatusMessage() {
      return (0, _vue.h)('span', {
        "class": {
          'v-input__status-message': true
        }
      }, [errorState.innerErrorMessage]);
    };

    var genStatus = function genStatus() {
      var transitionedMessage = (0, _useTransition.useTransition)({
        transition: 'fade'
      }, errorState.innerErrorMessage && genStatusMessage());
      return (0, _vue.h)('div', {
        "class": {
          'v-input__status': true
        }
      }, [transitionedMessage()]);
    };

    var genDataProps = function genDataProps() {
      return {
        "class": _objectSpread({}, classes.value),
        methods: {
          validateValue: validateValue
        }
      };
    };

    var genInput = function genInput() {
      return (0, _vue.h)('div', genDataProps(), [genTextFieldSlot(), genStatus()]);
    };

    return function () {
      return genInput();
    };
  }
});
exports.VInput = VInput;
//# sourceMappingURL=VInput.js.map