"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VInput = void 0;

require("../../../src/components/VInput/VInput.scss");

var _vue = require("vue");

var _VLabel = require("../VLabel");

var _VIcon = require("../VIcon");

var _useTransition = require("../../effects/use-transition");

var _useColors2 = require("../../effects/use-colors");

var _icons = require("@/services/icons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VInput = (0, _vue.defineComponent)({
  name: 'v-input',
  props: {
    dark: Boolean,
    focused: Boolean,
    hasState: Boolean,
    hasError: Boolean,
    isDirty: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: String,
    prependIcon: String,
    appendIcon: String,
    message: String,
    type: {
      type: String,
      "default": 'text'
    },
    color: {
      type: String,
      "default": 'primary'
    },
    modelValue: [String, Number]
  },
  emits: ['clear'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var isValid = (0, _vue.computed)(function () {
      return props.isDirty && props.hasState && !props.hasError;
    });
    var isNotValid = (0, _vue.computed)(function () {
      return props.isDirty && props.hasError;
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-input': true,
        'v-input--disabled': props.disabled,
        'v-input--dirty': props.isDirty,
        'v-input--valid': isValid.value,
        'v-input--not-valid': isNotValid.value,
        'v-input--focused': props.focused
      };
    });

    function genLabel() {
      var propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: props.color
      };
      return (0, _vue.h)(_VLabel.VLabel, propsData, {
        "default": function _default() {
          return props.label;
        }
      });
    }

    function genIcon(iconName) {
      var clickable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return (0, _vue.h)(_VIcon.VIcon, {
        color: props.color,
        dark: props.dark,
        icon: iconName,
        size: 16,
        disabled: props.disabled,
        clickable: clickable
      });
    }

    function genPrependIcon() {
      return (0, _vue.h)('div', {
        "class": 'v-input__prepend-icon'
      }, genIcon(props.prependIcon));
    }

    function genAppendIcon() {
      return (0, _vue.h)('div', {
        "class": 'v-input__append-icon'
      }, genIcon(props.appendIcon));
    }

    function genClearIcon() {
      return (0, _vue.h)('div', {
        "class": 'v-input__clear',
        onClick: function onClick() {
          return !props.disabled && emit('clear');
        }
      }, genIcon(_icons.FaIcons.$close, true));
    }

    function genSlotContent() {
      var propsData = {
        "class": {
          'v-input__select-slot': !!slots.select,
          'v-input__field-slot': !!slots.textField
        }
      };
      return (0, _vue.h)('div', props.color ? setTextColor(props.color, propsData) : propsData, [props.prependIcon && genPrependIcon(), !props.clearable && props.appendIcon && genAppendIcon(), props.clearable && genClearIcon(), genLabel(), slots.select && slots.select(), slots.textField && slots.textField()]);
    }

    function genStatusMessage() {
      var propsData = {
        "class": {
          'v-input__status-message': true
        }
      };
      return (0, _vue.h)('span', propsData, props.message);
    }

    function genStatus() {
      var transitionedMessage = (0, _useTransition.useTransition)(props.message && genStatusMessage(), 'fade');
      var propsData = {
        "class": {
          'v-input__status': true
        }
      };
      return (0, _vue.h)('div', propsData, transitionedMessage);
    }

    function genPropsData() {
      return {
        "class": _objectSpread({}, classes.value)
      };
    }

    return function () {
      return (0, _vue.h)('div', genPropsData(), [genSlotContent(), genStatus()]);
    };
  }
});
exports.VInput = VInput;
//# sourceMappingURL=VInput.js.map