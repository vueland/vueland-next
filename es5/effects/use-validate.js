"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValidate = useValidate;
exports.validateProps = void 0;

var _vue = require("vue");

var validateProps = function validateProps() {
  return {
    rules: {
      type: Array,
      "default": null
    },
    value: [String, Number, Date, Object]
  };
};

exports.validateProps = validateProps;

function useValidate(props) {
  var errorState = (0, _vue.reactive)({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false
  });
  var validateClasses = (0, _vue.computed)(function () {
    return {
      "v-validatable": true
    };
  });
  var computedColor = (0, _vue.computed)(function () {
    if (props.disabled) return undefined;
    if (props.color) return props.color;
    if (props.dark) return "white";
  });
  var validationState = (0, _vue.computed)(function () {
    if (errorState.innerError) return "danger";
    if (!errorState.innerError && errorState.innerError !== null) return computedColor.value;
    return computedColor.value || "primary";
  });
  var hasRules = (0, _vue.computed)(function () {
    return props.rules !== void 0 && props.rules !== null && props.rules.length > 0;
  });
  var validatable = (0, _vue.computed)(function () {
    return props.validate;
  });

  var dirty = function dirty() {
    errorState.isDirty = true;
  };

  var update = function update(err) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (errorState.innerError !== err) {
      errorState.innerError = err;
    }

    if (msg && errorState.innerErrorMessage !== msg) {
      errorState.innerErrorMessage = msg;
    }

    if (!msg) errorState.innerErrorMessage = msg;
    return errorState.innerError;
  };

  var validate = function validate() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.value;
    if (validatable.value) return !update(!val);
    if (!hasRules.value) return true;
    dirty();

    for (var i = 0, len = props.rules.length; i < len; i += 1) {
      var rule = props.rules[i];
      var result = void 0;

      if (typeof rule === "function") {
        result = rule(val);
      }

      if (result === false || typeof result === "string") {
        update(true, result);
        return false;
      }

      if (result === true && i === len - 1) {
        update(false);
        return true;
      }
    }
  };

  return {
    validate: validate,
    dirty: dirty,
    update: update,
    validateClasses: validateClasses,
    computedColor: computedColor,
    validationState: validationState,
    errorState: errorState
  };
}
//# sourceMappingURL=use-validate.js.map