"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VAutocomplete = void 0;

require("../../../src/components/VAutocomplete/VAutocomplete.scss");

var _vue = require("vue");

var _useValidate = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _useTheme2 = require("../../effects/use-theme");

var _VInput = require("../VInput");

var _VSelect = require("../VSelect");

var _VMenu = require("../VMenu");

var _VProgressLinear = require("../VProgressLinear");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VAutocomplete = (0, _vue.defineComponent)({
  name: 'v-autocomplete',
  props: _objectSpread({
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    typeable: Boolean,
    loading: Boolean,
    modelValue: {
      "default": null
    },
    color: {
      type: String,
      "default": 'primary'
    }
  }, (0, _useValidate.validateProps)()),
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = (0, _vue.reactive)({
      focused: false,
      isMenuActive: false,
      search: '',
      select: null
    });

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useTheme = (0, _useTheme2.useTheme)(),
        base = _useTheme.base;

    var inputRef = (0, _vue.ref)(null);
    var classes = (0, _vue.computed)(function () {
      return {
        'v-autocomplete': true,
        'v-autocomplete--disabled': props.disabled,
        'v-autocomplete--focused': state.focused
      };
    });
    var valueProperty = (0, _vue.computed)(function () {
      return props.modelValue || props.value;
    });
    var inputValue = (0, _vue.computed)(function () {
      return props.valueKey && valueProperty.value ? (0, _helpers.getKeyValueFromTarget)(props.valueKey, valueProperty.value) : valueProperty.value;
    });

    function onFocus() {
      state.focused = true;
      state.isMenuActive = true;
      emit('focus');
    }

    function onBlur() {
      if (!valueProperty.value && !state.search) state.search = '';
      if (!state.search && valueProperty.value) state.search = inputValue.value;
      state.focused = false;
      emit('blur');
    }

    function onInput(e) {
      state.search = e.target.value;
      emit('input', e.target.value);
    }

    function onClear() {
      state.search = '';
      state.select = null;
      emit('select', null);
      emit('update:modelValue', null);
      emit('update:value', null);
    }

    function onSelect(it) {
      state.search = props.valueKey ? (0, _helpers.getKeyValueFromTarget)(props.valueKey, it) : it;
      state.select = it;
      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
    }

    function genInput() {
      var propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputRef,
        "class": 'v-autocomplete__input',
        onInput: onInput,
        onFocus: onFocus,
        onBlur: onBlur
      };
      return (0, _vue.h)('input', setTextColor(props.dark ? 'white' : base, propsData));
    }

    function genAutocompleteList() {
      var propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor,
        select: state.select,
        onSelect: onSelect
      };
      return (0, _vue.h)(_VSelect.VSelectList, propsData);
    }

    function genMenu() {
      return (0, _vue.h)(_VMenu.VMenu, {
        activator: inputRef,
        openOnClick: true,
        maxHeight: 240,
        bottom: true,
        onClose: function onClose() {
          return state.isMenuActive = state.focused;
        }
      }, {
        "default": genAutocompleteList
      });
    }

    function genLinearProgress() {
      return (0, _vue.h)('div', {
        "class": {
          'v-autocomplete__loading': true
        }
      }, (0, _vue.h)(_VProgressLinear.VProgressLinear, {
        height: 2,
        indeterminate: true,
        color: props.color,
        backgroundColor: props.color
      }));
    }

    function genAutocomplete() {
      return (0, _vue.h)('div', {
        "class": classes.value
      }, [genInput(), props.loading && genLinearProgress(), genMenu()]);
    }

    (0, _vue.onBeforeMount)(function () {
      state.select = valueProperty.value;
      state.search = inputValue.value;
    });
    return function () {
      var propsData = {
        label: props.label,
        focused: state.isMenuActive,
        hasState: !!state.search,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        color: props.color,
        rules: props.rules,
        value: valueProperty.value || state.search,
        onClear: onClear
      };
      return (0, _vue.h)(_VInput.VInput, propsData, {
        textField: function textField() {
          return genAutocomplete();
        }
      });
    };
  }
});
exports.VAutocomplete = VAutocomplete;
//# sourceMappingURL=VAutocomplete.js.map