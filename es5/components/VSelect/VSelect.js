"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSelect = void 0;

require("../../../src/components/VSelect/VSelect.scss");

var _vue = require("vue");

var _useColors2 = require("../../effects/use-colors");

var _useTheme2 = require("../../effects/use-theme");

var _useActivator = require("../../effects/use-activator");

var _useValidate = require("../../effects/use-validate");

var _VInput = require("../VInput");

var _VSelectList = require("./VSelectList");

var _VMenu = require("../VMenu");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VSelect = (0, _vue.defineComponent)({
  name: 'v-select',
  props: _objectSpread(_objectSpread(_objectSpread({
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    modelValue: {
      "default": null
    }
  }, (0, _useColors2.colorProps)()), (0, _useActivator.activatorProps)()), (0, _useValidate.validateProps)()),
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
  setup: function setup(props, _ref) {
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

    var inputRef = (0, _vue.ref)(null);
    var classes = (0, _vue.computed)(function () {
      return {
        'v-select': true,
        'v-select--disabled': props.disabled,
        'v-select--readonly': props.readonly,
        'v-select--focused': state.focused
      };
    });
    var computedInputValue = (0, _vue.computed)(function () {
      return state.selected ? props.valueKey ? (0, _helpers.getKeyValueFromTarget)(props.valueKey, state.selected) : state.selected : '';
    });
    var computedValue = (0, _vue.computed)(function () {
      return props.modelValue || props.value;
    });
    (0, _vue.watch)(function () {
      return computedValue.value;
    }, function (to) {
      return state.selected = to;
    }, {
      immediate: true
    });

    function toggleState() {
      state.focused = !state.focused;
    }

    function onBlur() {
      setTimeout(function () {
        toggleState();
        emit('blur');
      });
    }

    function onClick() {
      toggleState();
      emit('focus');
    }

    function onClear() {
      state.selected = '';
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
        ref: inputRef,
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
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor || 'white',
        select: state.selected,
        dark: props.dark,
        onSelect: function onSelect(item) {
          return selectItem(item);
        }
      };
      return (0, _vue.h)(_VSelectList.VSelectList, propsData);
    }

    function genMenu() {
      return (0, _vue.h)(_VMenu.VMenu, {
        activator: inputRef,
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

    return function () {
      var propsData = _objectSpread({
        label: props.label,
        focused: state.focused,
        hasState: !!computedInputValue.value,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        value: computedInputValue.value,
        color: props.color,
        rules: props.rules,
        onClear: onClear
      }, attrs);

      return (0, _vue.h)(_VInput.VInput, propsData, {
        textField: function textField() {
          return genSelect();
        }
      });
    };
  }
});
exports.VSelect = VSelect;
//# sourceMappingURL=VSelect.js.map