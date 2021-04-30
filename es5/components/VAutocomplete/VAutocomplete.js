"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VAutocomplete = void 0;

require("../../../src/components/VAutocomplete/VAutocomplete.scss");

var _vue = require("vue");

var _useValidate2 = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _VInput = require("../VInput");

var _VAutocompleteList = require("./VAutocompleteList");

var _directives = require("../../directives");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VAutocomplete = (0, _vue.defineComponent)({
  name: 'v-autocomplete',
  props: _objectSpread(_objectSpread({
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    modelValue: [Array, String, Object, Number]
  }, (0, _useValidate2.validateProps)()), (0, _useColors2.colorProps)()),
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
  setup: function setup(props, _ref) {
    var _props$rules;

    var emit = _ref.emit;
    var state = (0, _vue.reactive)({
      focused: false,
      isMenuActive: false,
      search: ''
    });

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var inputTemplateRef = (0, _vue.ref)(null);

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        dirty = _useValidate.dirty,
        update = _useValidate.update,
        errorState = _useValidate.errorState,
        validateClasses = _useValidate.validateClasses,
        validationState = _useValidate.validationState;

    var fields = props.rules && (0, _vue.inject)('fields');
    var directive = (0, _vue.computed)(function () {
      return state.isMenuActive && !state.focused ? {
        handler: clickOutsideHandler,
        closeConditional: true
      } : undefined;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-autocomplete': true,
        'v-autocomplete--disabled': props.disabled,
        'v-autocomplete--focused': state.focused
      }, validateClasses.value);
    });
    var propValue = (0, _vue.computed)(function () {
      return props.modelValue || props.value;
    });
    var inputValue = (0, _vue.computed)(function () {
      return props.valueKey ? propValue.value[props.valueKey] : propValue.value;
    });
    var isListItemsExists = (0, _vue.computed)(function () {
      return !!props.items && !!props.items.length;
    });
    state.search = propValue.value ? inputValue.value : '';
    (0, _vue.watch)(function () {
      return isListItemsExists.value;
    }, function (to) {
      if (to && !state.isMenuActive && state.focused) {
        state.isMenuActive = true;
      }
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules = props.rules) !== null && _props$rules !== void 0 && _props$rules.length) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      var _props$rules2;

      return ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length) && validate(state.search);
    }

    function clickOutsideHandler() {
      state.focused = false;
      state.isMenuActive = false;
    }

    function onFocus() {
      state.focused = true;
      state.isMenuActive = isListItemsExists.value;
      dirty();
      update(errorState.innerError);
      emit('focus');
    }

    function onBlur() {
      if (!propValue.value) {
        state.search = '';
      }

      if (!state.search && propValue.value) {
        requestAnimationFrame(function () {
          state.search = inputValue.value;
        });
      }

      setTimeout(validateValue);
      state.focused = false;
      emit('blur');
    }

    function onInput(e) {
      state.search = e.target.value;
      emit('input', e.target.value);
    }

    function onClear() {
      state.search = '';
      emit('select', '');
      emit('update:modelValue', '');
      emit('update:value', '');
      requestAnimationFrame(validateValue);
    }

    function onSelect(it) {
      if (props.valueKey) {
        state.search = it[props.valueKey];
      } else {
        state.search = it;
      }

      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
      requestAnimationFrame(validateValue);
    }

    function genInput() {
      var color = props.dark ? 'white' : '';
      var propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        "class": 'v-autocomplete__input',
        onInput: onInput,
        onFocus: onFocus,
        onBlur: onBlur
      };
      return (0, _vue.h)('input', setTextColor(color, propsData));
    }

    function genAutocompleteList() {
      var propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : '',
        listColor: props.listColor,
        onSelect: onSelect
      };
      return (0, _vue.withDirectives)((0, _vue.h)(_VAutocompleteList.VAutocompleteList, propsData), [[_directives.clickOutside, directive.value]]);
    }

    function genAutocomplete() {
      return (0, _vue.h)('div', {
        "class": classes.value
      }, [genInput(), props.items && genAutocompleteList()]);
    }

    (0, _vue.onBeforeUnmount)(function () {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(function (v) {
          return v !== validateValue;
        });
      }
    });
    return function () {
      var propsData = {
        label: props.label,
        focused: state.focused || state.isMenuActive,
        hasState: !!state.search,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        onClear: onClear
      };
      return (0, _vue.h)(_VInput.VInput, propsData, {
        select: function select() {
          return genAutocomplete();
        }
      });
    };
  }
});
exports.VAutocomplete = VAutocomplete;
//# sourceMappingURL=VAutocomplete.js.map