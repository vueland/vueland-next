import { reactive, computed } from 'vue';
import { useTheme } from './use-theme';
export const validateProps = () => {
  return {
    rules: {
      type: Array,
      default: null
    },
    value: [String, Number, Date, Object]
  };
};
export function useValidate(props) {
  const errorState = reactive({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false
  });
  const {
    primary,
    error
  } = useTheme();
  const validateClasses = computed(() => {
    return {
      'v-validatable': true
    };
  });
  const computedColor = computed(() => {
    if (props.disabled) return undefined;
    if (props.color) return props.color;
    return props.dark ? 'white' : primary;
  });
  const validationState = computed(() => {
    console.log(error);
    if (errorState.innerError) return error;
    if (!errorState.innerError && errorState.innerError !== null) return computedColor.value;
    return computedColor.value || primary;
  });
  const hasRules = computed(() => {
    return props.rules !== void 0 && props.rules !== null && props.rules.length > 0;
  });
  const validatable = computed(() => {
    return props.validate;
  });

  const dirty = () => {
    errorState.isDirty = true;
  };

  const update = (err, msg = null) => {
    if (errorState.innerError !== err) {
      errorState.innerError = err;
    }

    if (msg && errorState.innerErrorMessage !== msg) {
      errorState.innerErrorMessage = msg;
    }

    if (!msg) errorState.innerErrorMessage = msg;
    return errorState.innerError;
  };

  const validate = (val = props.value) => {
    if (validatable.value) return !update(!val);
    if (!hasRules.value) return true;
    dirty();

    for (let i = 0, len = props.rules.length; i < len; i += 1) {
      const rule = props.rules[i];
      let result;

      if (typeof rule === 'function') {
        result = rule(val);
      }

      if (result === false || typeof result === 'string') {
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
    validate,
    dirty,
    update,
    validateClasses,
    computedColor,
    validationState,
    errorState
  };
}
//# sourceMappingURL=use-validate.js.map