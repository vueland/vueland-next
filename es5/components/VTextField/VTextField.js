"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VTextField = void 0;

require("../../../src/components/VTextField/VTextField.scss");

var _vue = require("vue");

var _useValidate = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _useTheme2 = require("../../effects/use-theme");

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
  }, (0, _useValidate.validateProps)()), (0, _useColors2.colorProps)()),
  emits: ['input', 'focus', 'blur', 'change', 'clear', 'update:value', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs;
    var state = (0, _vue.reactive)({
      value: '',
      focused: false
    });
    state.value = props.modelValue || props.value;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useTheme = (0, _useTheme2.useTheme)(),
        base = _useTheme.base;

    var computedValue = (0, _vue.computed)(function () {
      return props.modelValue || props.value;
    });
    (0, _vue.watch)(function () {
      return computedValue.value;
    }, function (value) {
      return state.value = value;
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-text-field': true,
        'v-text-field--disabled': props.disabled
      };
    });

    function onClear() {
      state.value = '';
      emit('update:modelValue', state.value);
      emit('update:value', state.value);
      emit('input', state.value);
      emit('clear', state.value);
    }

    function onBlur() {
      setTimeout(function () {
        state.focused = false;
        emit('blur');
      });
    }

    function onFocus() {
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
        "class": 'v-text-field__input',
        onFocus: onFocus,
        onBlur: onBlur,
        onInput: onInput,
        onChange: onChange
      };

      if (props.tag === 'input') {
        propsData.type = props.type;
      }

      return (0, _vue.h)(props.tag, setTextColor(props.dark ? 'white' : base, propsData));
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
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        rules: props.rules,
        value: computedValue.value,
        color: props.color,
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