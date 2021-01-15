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
  name: 'v-select',
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
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
  setup: function setup(props, _ref) {
    var _props$rules2;

    var emit = _ref.emit;
    var state = (0, _vue.reactive)({
      selected: null,
      focused: false,
      isMenuActive: false
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
    var computedInputValue = (0, _vue.computed)(function () {
      return state.selected ? props.valueKey ? state.selected[props.valueKey] : state.selected : '';
    });
    var computedValue = (0, _vue.computed)(function () {
      return props.modelValue || props.value;
    });
    (0, _vue.watch)(function () {
      return computedValue.value;
    }, function (value) {
      var _props$rules;

      state.selected = value;
      !state.focused && errorState.isDirty && ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validateValue();
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules2 = props.rules) !== null && _props$rules2 !== void 0 && _props$rules2.length) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      var _props$rules3;

      return ((_props$rules3 = props.rules) === null || _props$rules3 === void 0 ? void 0 : _props$rules3.length) && validate(computedInputValue.value[props.valueKey] || computedInputValue.value);
    }

    function clickOutsideHandler() {
      state.focused = false;
      state.isMenuActive = false;
      requestAnimationFrame(validateValue);
    }

    function onClick() {
      state.isMenuActive = !!props.items && !!props.items.length;
      dirty();
      update(errorState.innerError);
    }

    function onFocus() {
      state.focused = true;
      emit('focus');
    }

    function onBlur() {
      state.focused = false;
      emit('blur');
      requestAnimationFrame(validateValue);
    }

    function onInput(e) {
      setUpdatedValue(e.target.value);
      emit('update:modelValue', state.selected);
      emit('update:value', state.selected);
      emit('input', state.selected);
    }

    function onClear() {
      setUpdatedValue('');
      emit('update:modelValue', state.selected);
      emit('update:value', state.selected);
      requestAnimationFrame(validateValue);
    }

    function selectItem(it) {
      state.selected = it;
      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
    }

    function setUpdatedValue(value) {
      if (props.valueKey && state.selected) {
        state.selected[props.valueKey] = value;
      } else {
        state.selected = value;
      }
    }

    function genInput() {
      var color = props.dark ? 'white' : '';
      var propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        "class": {
          'v-autocomplete__input': true
        },
        onClick: onClick,
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
        onSelect: function onSelect(it) {
          return selectItem(it);
        }
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
        hasState: !!computedInputValue.value,
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