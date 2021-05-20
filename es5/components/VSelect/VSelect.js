"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelect = void 0;

require("../../../src/components/VSelect/VSelect.scss");

var _vue = require("vue");

var _useValidate2 = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _useTheme2 = require("../../effects/use-theme");

var _VInput = require("../VInput");

var _VSelectList = require("./VSelectList");

var _VMenu = require("../VMenu");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VSelect = (0, _vue.defineComponent)({
  name: 'v-select',
  props: _objectSpread(_objectSpread({
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    modelValue: [Array, String, Object, Number]
  }, (0, _useValidate2.validateProps)()), (0, _useColors2.colorProps)()),
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
  setup: function setup(props, _ref) {
    var _props$rules2;

    var emit = _ref.emit,
        attrs = _ref.attrs;
    var state = (0, _vue.reactive)({
      selected: null,
      focused: false
    });

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useTheme = (0, _useTheme2.useTheme)(),
        base = _useTheme.base;

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        dirty = _useValidate.dirty,
        update = _useValidate.update,
        errorState = _useValidate.errorState,
        validationState = _useValidate.validationState;

    var fields = props.rules && (0, _vue.inject)('fields');
    var classes = (0, _vue.computed)(function () {
      return {
        'v-select': true,
        'v-select--disabled': props.disabled,
        'v-select--readonly': props.readonly,
        'v-select--focused': state.focused
      };
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

      return ((_props$rules3 = props.rules) === null || _props$rules3 === void 0 ? void 0 : _props$rules3.length) && validate(computedInputValue.value);
    }

    function toggleState() {
      state.focused = !state.focused;
    }

    function onBlur() {
      setTimeout(function () {
        requestAnimationFrame(validateValue);
        toggleState();
        emit('blur');
      });
    }

    function onClick() {
      dirty();
      update(errorState.innerError);
      toggleState();
      emit('focus');
    }

    function onClear() {
      state.selected = '';
      requestAnimationFrame(validateValue);
    }

    function selectItem(item) {
      state.selected = item;
      emit('select', item);
      emit('update:value', item);
      emit('update:modelValue', item);
    }

    function genInput() {
      var propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        "class": 'v-select__input',
        onClick: onClick
      };
      return (0, _vue.h)('input', setTextColor(props.dark ? 'white' : base, propsData));
    }

    function genSelectList() {
      var propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.focused,
        color: props.dark ? 'white' : base,
        listColor: props.listColor || 'white',
        onSelect: function onSelect(item) {
          return selectItem(item);
        }
      };
      return (0, _vue.h)(_VSelectList.VSelectList, propsData);
    }

    function genMenu() {
      return (0, _vue.h)(_VMenu.VMenu, {
        openOnClick: true,
        maxHeight: 240,
        onClose: onBlur
      }, {
        "default": function _default() {
          return genSelectList();
        }
      });
    }

    function genSelect() {
      var propsData = {
        "class": classes.value
      };
      return (0, _vue.h)('div', propsData, [genInput(), genMenu()]);
    }

    (0, _vue.onBeforeUnmount)(function () {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(function (v) {
          return v !== validateValue;
        });
      }
    });
    return function () {
      var propsData = _objectSpread({
        label: props.label,
        focused: state.focused,
        hasState: !!computedInputValue.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        disabled: props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        clearable: props.clearable,
        onClear: onClear
      }, attrs);

      return (0, _vue.h)(_VInput.VInput, propsData, {
        select: function select() {
          return genSelect();
        }
      });
    };
  }
});
exports.VSelect = VSelect;
//# sourceMappingURL=VSelect.js.map