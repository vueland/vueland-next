import { reactive, computed } from 'vue';
export const validateProps = () => {
  return {
    rules: {
      type: Array,
      default: null
    },
    value: [String, Number]
  };
};
export function useValidate(props) {
  const validState = reactive({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false
  });
  const hasRules = computed(() => {
    return props.rules !== void 0 && props.rules !== null && props.rules.length > 0;
  });

  const focused = () => {
    validState.isDirty = true;
  };

  const validate = (val = props.value) => {
    if (!hasRules.value) return true;
    focused();

    const update = (err, msg = null) => {
      if (validState.innerError !== err) {
        validState.innerError = err;
      }

      if (msg && validState.innerErrorMessage !== msg) {
        validState.innerErrorMessage = msg;
      }
    };

    for (let i = 0; i < props.rules.length; i += 1) {
      const rule = props.rules[i];
      let result;

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
    validate,
    focused,
    validState
  };
}
//# sourceMappingURL=use-validate.js.map