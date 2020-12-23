"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelect = void 0;

require("../../../src/components/VSelect/VSelect.scss");

var _vue = require("vue");

var _useValidate2 = require("../../effects/use-validate");

var _useColors2 = require("../../effects/use-colors");

var _VInput = require("../VInput");

var _VSelectList = require("./VSelectList");

var _directives = require("../../directives");

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
    modelValue: [Array, String, Object]
  }, (0, _useValidate2.validateProps)()), (0, _useColors2.colorProps)()),
  setup: function setup(props, _ref) {
    var _props$rules2;

    var emit = _ref.emit,
        attrs = _ref.attrs;
    var state = (0, _vue.reactive)({
      selected: null,
      focused: false,
      isMenuActive: false
    });

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        dirty = _useValidate.dirty,
        update = _useValidate.update,
        errorState = _useValidate.errorState,
        computedColor = _useValidate.computedColor,
        validateClasses = _useValidate.validateClasses,
        validationState = _useValidate.validationState;

    var fields = (0, _vue.inject)('fields');

    var validateValue = function validateValue() {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.selected || props.modelValue);
    };

    var directive = (0, _vue.computed)(function () {
      return state.focused ? {
        handler: onBlur,
        closeConditional: true
      } : undefined;
    });
    var classes = (0, _vue.computed)(function () {
      return _objectSpread({
        'v-select': true,
        'v-select--disabled': props.disabled,
        'v-select--focused': state.focused
      }, validateClasses.value);
    });
    (0, _vue.watch)(function () {
      return props.modelValue;
    }, function (value) {
      return state.selected = value;
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules2 = props.rules) !== null && _props$rules2 !== void 0 && _props$rules2.length) {
      fields.value.push(validateValue);
    }

    function toggleState() {
      state.focused = !state.focused;
      state.isMenuActive = !state.isMenuActive;
    }

    function onBlur() {
      requestAnimationFrame(validateValue);
      setTimeout(toggleState, 50);
      emit('blur');
    }

    function onClick() {
      dirty();
      update(errorState.innerError);
      toggleState();
      emit('focus');
    }

    function selectItem(it) {
      state.selected = it;
      emit('select', it);
      emit('update:modelValue', it);
    }

    function genInput() {
      var selectedValue = typeof state.selected === 'string' ? state.selected : state.selected[props.valueKey];

      var inputProps = _objectSpread(_objectSpread({
        value: selectedValue,
        disabled: props.disabled,
        readonly: props.readonly,
        "class": {
          'v-select__input': true
        }
      }, attrs), {}, {
        onClick: onClick
      });

      return (0, _vue.h)('input', setTextColor(computedColor.value, inputProps));
    }

    function genSelectList() {
      var propsData = {
        "class": {},
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
      return (0, _vue.h)(_VSelectList.VSelectList, propsData);
    }

    function genSelect() {
      var selectVNode = (0, _vue.h)('div', {
        "class": classes.value
      }, [genInput(), genSelectList()]);
      return (0, _vue.withDirectives)(selectVNode, [[_directives.clickOutside, directive.value]]);
    }

    (0, _vue.onBeforeUnmount)(function () {
      if (fields.value) {
        fields.value = fields.value.filter(function (v) {
          return v !== validateValue;
        });
      }
    });
    return function () {
      var propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.selected,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage
      };
      return (0, _vue.h)(_VInput.VInput, propsData, {
        select: function select() {
          var _props$items;

          return (_props$items = props.items) !== null && _props$items !== void 0 && _props$items.length ? genSelect() : null;
        }
      });
    };
  }
});
exports.VSelect = VSelect;
//# sourceMappingURL=VSelect.js.map