"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VField = void 0;

require("../../../src/components/VField/VField.scss");

var _vue = require("vue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fieldProps = {
  value: [Number, String],
  type: {
    type: String,
    "default": 'text'
  },
  placeholder: {
    type: String,
    "default": ''
  },
  required: {
    type: Boolean,
    "default": false
  },
  valid: {
    type: Boolean
  },
  isDirty: {
    type: Boolean,
    "default": false
  },
  disabled: {
    type: Boolean,
    "default": false
  }
};
var VField = (0, _vue.defineComponent)({
  name: 'v-field',
  props: fieldProps,
  setup: function setup(props, ctx) {
    var search = (0, _vue.ref)('');
    (0, _vue.watch)(function () {
      return props.value;
    }, function (to) {
      search.value = to;
    });
    var classes = (0, _vue.computed)(function () {
      return {
        'v-field': true,
        'v-field--required': props.required,
        'v-field--disabled': props.disabled,
        'v-field--dirty': props.isDirty,
        'v-field--valid': props.isDirty && props.required && !!props.valid,
        'v-field--not-valid': props.isDirty && props.required && !props.valid
      };
    });

    var genField = function genField() {
      return (0, _vue.h)('input', {
        type: props.type,
        placeholder: props.placeholder,
        disabled: props.disabled,
        required: props.required,
        value: search.value,
        "class": _objectSpread({}, classes.value),
        modelValue: search.value,
        'onUpdate:modelValue': function onUpdateModelValue(val) {
          return ctx.emit('update:modelValue', val);
        }
      });
    };

    return function () {
      return (0, _vue.h)(genField());
    };
  }
});
exports.VField = VField;
//# sourceMappingURL=VField.js.map