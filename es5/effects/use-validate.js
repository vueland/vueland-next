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
    value: [String, Number]
  };
};

exports.validateProps = validateProps;

function useValidate(props) {
  var validState = (0, _vue.reactive)({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false
  });
  var hasRules = (0, _vue.computed)(function () {
    return props.rules !== void 0 && props.rules !== null && props.rules.length > 0;
  });

  var focused = function focused() {
    validState.isDirty = true;
  };

  var validate = function validate() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.value;
    if (!hasRules.value) return true;
    focused();

    var update = function update(err) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (validState.innerError !== err) {
        validState.innerError = err;
      }

      if (msg && validState.innerErrorMessage !== msg) {
        validState.innerErrorMessage = msg;
      }
    };

    for (var i = 0; i < props.rules.length; i += 1) {
      var rule = props.rules[i];
      var result = void 0;

      if (typeof rule === 'function') {
        result = rule(val);
      }

      if (result === false || typeof result === 'string') {
        update(true, result);
        return false;
      }

      if (result === true) {
        update(false);
        return true;
      }
    }
  };

  return {
    validate: validate,
    focused: focused,
    validState: validState
  };
}
//# sourceMappingURL=use-validate.js.map