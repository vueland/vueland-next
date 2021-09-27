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

var _useIcons2 = require("../../effects/use-icons");

var _useTheme = require("../../effects/use-theme");

var _useValidate2 = require("@/effects/use-validate");

var _transitions = require("../../services/transitions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VInput = (0, _vue.defineComponent)({
  name: 'v-input',
  inheritAttrs: false,
  props: _objectSpread(_objectSpread(_objectSpread({
    inputSlotRef: Object,
    focused: Boolean,
    hasState: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: String,
    prependIcon: String,
    appendIcon: String,
    type: {
      type: String,
      "default": 'text'
    },
    modelValue: [String, Number, Object]
  }, (0, _useColors2.colorProps)()), (0, _useTheme.themeProps)()), (0, _useValidate2.validateProps)()),
  emits: ['clear', 'focus'],
  setup: function setup(props, _ref) {
    var _props$rules;

    var slots = _ref.slots,
        emit = _ref.emit,
        attrs = _ref.attrs;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useIcons = (0, _useIcons2.useIcons)('md'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var _useValidate = (0, _useValidate2.useValidate)(props),
        validate = _useValidate.validate,
        dirty = _useValidate.dirty,
        errorState = _useValidate.errorState,
        validationState = _useValidate.validationState;

    var fields = props.rules && (0, _vue.inject)('fields');

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules = props.rules) !== null && _props$rules !== void 0 && _props$rules.length) {
      fields.value.push(validateValue);
    }

    var isValid = (0, _vue.computed)(function () {
      return errorState.isDirty && props.hasState && !errorState.innerError;
    });
    var isNotValid = (0, _vue.computed)(function () {
      return errorState.isDirty && !!errorState.innerError;
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-input': true,
        'v-input--disabled': props.disabled,
        'v-input--dirty': errorState.isDirty,
        'v-input--valid': isValid.value,
        'v-input--not-valid': isNotValid.value,
        'v-input--focused': props.focused
      };
    });
    (0, _vue.watch)(function () {
      return props.value;
    }, function () {
      return requestAnimationFrame(validateValue);
    });
    (0, _vue.watch)(function () {
      return props.focused;
    }, function (to) {
      return !to && requestAnimationFrame(validateValue);
    });

    function onClick() {
      dirty();
      emit('focus');
    }

    function validateValue() {
      var _props$rules2;

      return ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length) && validate(props.value);
    }

    function genLabel() {
      var propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: validationState.value
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
        color: validationState.value,
        dark: props.dark,
        icon: iconName,
        size: iconSize,
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
      var propsData = {
        "class": 'v-input__append-icon'
      };
      return (0, _vue.h)('div', propsData, genIcon(props.appendIcon));
    }

    function genClearIcon() {
      var propsData = {
        "class": 'v-input__clear',
        onClick: function onClick() {
          !props.disabled && props.hasState && emit('clear');
        }
      };
      return (0, _vue.h)('div', propsData, genIcon(icons.$close, true));
    }

    function genInputSlot() {
      var propsData = {
        "class": 'v-input__slot',
        onClick: onClick
      };
      return (0, _vue.h)('div', setTextColor(validationState.value, propsData), [genSlotContent(), genStatus()]);
    }

    function genSlotContent() {
      var propsData = {
        "class": {
          'v-input__field-slot': true
        }
      };
      return (0, _vue.h)('div', propsData, [props.prependIcon && genPrependIcon(), !props.clearable && props.appendIcon && genAppendIcon(), props.clearable && genClearIcon(), genLabel(), slots.textField && slots.textField()]);
    }

    function genStatusMessage() {
      var propsData = {
        "class": {
          'v-input__status-message': true
        }
      };
      return (0, _vue.h)('span', propsData, errorState.innerErrorMessage);
    }

    function genStatus() {
      var transitionedMessage = (0, _useTransition.useTransition)(errorState.innerErrorMessage && genStatusMessage(), _transitions.Transitions.FADE);
      var propsData = {
        "class": 'v-input__status'
      };
      return (0, _vue.h)('div', propsData, transitionedMessage);
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
        "class": classes.value,
        style: attrs.style
      };
      return (0, _vue.h)('div', propsData, genInputSlot());
    };
  }
});
exports.VInput = VInput;
//# sourceMappingURL=VInput.js.map