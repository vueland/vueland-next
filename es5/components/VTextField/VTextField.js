"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VTextField = void 0;

require("../../../src/components/VTextField/VTextField.scss");

var _vue = require("vue");

var _useValidate2 = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _VInput = require("../VInput");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VTextField = (0, _vue.defineComponent)({
  name: 'v-text-field',
  props: _objectSpread(_objectSpread({
    dark: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    label: String,
    isDirty: Boolean,
    type: {
      type: String,
      "default": 'text'
    },
    modelValue: [String, Number, Date],
    tag: {
      type: String,
      "default": 'input'
    }
  }, (0, _useValidate2.validateProps)()), (0, _useColors2.colorProps)()),
  emits: ['input', 'focus', 'blur', 'change', 'clear', 'update:value', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var _props$rules2;

    var emit = _ref.emit,
        attrs = _ref.attrs;
    var state = (0, _vue.reactive)({
      value: '',
      focused: false
    });
    state.value = props.modelValue || props.value;
    var fields = props.rules && (0, _vue.inject)('fields');

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        dirty = _useValidate.dirty,
        update = _useValidate.update,
        errorState = _useValidate.errorState,
        validateClasses = _useValidate.validateClasses,
        validationState = _useValidate.validationState;

    (0, _vue.watch)(function () {
      return props.modelValue || props.value;
    }, function (value) {
      state.value = value;
      !state.focused && validateValue();
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-text-field': true,
        'v-text-field--disabled': props.disabled,
        'v-text-field--dirty': errorState.isDirty,
        'v-text-field--valid': errorState.isDirty && !errorState.innerError,
        'v-text-field--not-valid': errorState.isDirty && !!errorState.innerError
      }, validateClasses.value);
    });

    function validateValue() {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.value);
    }

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules2 = props.rules) !== null && _props$rules2 !== void 0 && _props$rules2.length) {
      fields.value.push(validateValue);
    }

    (0, _vue.onBeforeUnmount)(function () {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(function (v) {
          return v !== validateValue;
        });
      }
    });

    function onClear() {
      state.value = '';
      emit('update:modelValue', state.value);
      emit('update:value', state.value);
      emit('input', state.value);
      emit('clear', state.value);
      requestAnimationFrame(validateValue);
    }

    function onBlur() {
      state.focused = false;
      emit('blur');
      requestAnimationFrame(validateValue);
    }

    function onFocus() {
      dirty();
      update(errorState.innerError);
      state.focused = true;
      emit('focus');
    }

    function onChange() {
      emit('change', state.value);
    }

    function onInput(e) {
      state.value = e.target.value;
      emit('update:modelValue', state.value);
      emit('update:value', state.value);
      emit('input', state.value);
    }

    function genInput() {
      var propsData = {
        disabled: props.disabled,
        readonly: props.readonly,
        value: state.value,
        autocomplete: attrs.autocomplete,
        "class": {
          'v-text-field__input': true
        },
        onFocus: onFocus,
        onBlur: onBlur,
        onInput: onInput,
        onChange: onChange
      };

      if (props.tag === 'input') {
        ;
        propsData.type = props.type;
      }

      return (0, _vue.h)(props.tag, props.dark ? setTextColor('white', propsData) : propsData);
    }

    function genTextField() {
      return (0, _vue.h)('div', {
        "class": classes.value
      }, genInput());
    }

    return function () {
      var propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        isDirty: errorState.isDirty,
        disabled: props.disabled,
        message: errorState.innerErrorMessage,
        onClear: onClear
      };
      return (0, _vue.h)(_VInput.VInput, propsData, {
        textField: function textField() {
          return genTextField();
        }
      });
    };
  }
});
exports.VTextField = VTextField;
//# sourceMappingURL=VTextField.js.map