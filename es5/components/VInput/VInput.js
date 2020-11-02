"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VInput = void 0;

require("../../../src/components/VInput/VInput.scss");

var _vue = require("vue");

var _VField = require("../VField");

var _VLabel = require("../VLabel");

var _useValidate2 = require("../../effects/use-validate");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputProps = _objectSpread({
  label: String,
  height: [String, Number],
  type: {
    type: String,
    "default": 'text'
  },
  placeholder: String,
  disabled: Boolean,
  required: {
    type: Boolean,
    "default": false
  },
  valid: {
    type: Boolean
  }
}, (0, _useValidate2.validateProps)());

var VInput = (0, _vue.defineComponent)({
  name: 'v-input',
  props: inputProps,
  setup: function setup(props, ctx) {
    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        focused = _useValidate.focused,
        validState = _useValidate.validState;

    var classes = (0, _vue.computed)(function () {
      return {
        'v-input': true
      };
    });
    var computedColor = (0, _vue.computed)(function () {
      if (validState.innerError) return 'red darken-1';
      return 'blue darken-2';
    });

    var focusHandler = function focusHandler() {
      focused();
      ctx.emit('focus');
    };

    var blurHandler = function blurHandler() {
      ctx.emit('blur');
    };

    var inputHandler = function inputHandler(e) {
      props.required && validate(e.target.value);
      ctx.emit('input', e.target.value);
      ctx.emit('update:modelValue', e.target.value);
    };

    var genLabel = function genLabel() {
      _VLabel.VLabel.props = {
        absolute: true,
        color: computedColor.value
      };
      return (0, _vue.h)(_VLabel.VLabel.setup(props, ctx), _VLabel.VLabel.props, props.label);
    };

    var genField = function genField() {
      var fieldProps = {
        type: props.type,
        disabled: props.disabled,
        required: props.required,
        placeholder: props.placeholder,
        isDirty: validState.isDirty
      };
      return (0, _vue.h)(_VField.VField.setup(fieldProps, ctx), {
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler
      });
    };

    var genDataProps = function genDataProps() {
      return {
        "class": _objectSpread({}, classes.value)
      };
    };

    var genInput = function genInput() {
      return (0, _vue.h)('div', genDataProps(), [genLabel(), genField()]);
    };

    return function () {
      return genInput();
    };
  }
});
exports.VInput = VInput;
//# sourceMappingURL=VInput.js.map