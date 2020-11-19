// Vue API
import { reactive, computed } from 'vue'

export const validateProps = () => {
  return {
    rules: {
      type: Array,
      default: null,
    },
    value: [String, Number],
  }
}

export function useValidate(props) {
  const errorState = reactive({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false,
  })

  const validateClasses = computed<Record<string, boolean>>(() => {
    return {
      'v-validatable': true,
    }
  })

  const computedColor = computed<string | undefined>(() => {
    if (props.disabled) return undefined
    if (props.color) return props.color
    if (props.dark) return 'white'
  })

  const validationState = computed<string | undefined>(() => {
    if (errorState.innerError) return 'danger'
    if (!errorState.innerError && errorState.innerError !== null)
      return 'success'
    return computedColor.value || 'primary'
  })

  const hasRules = computed<boolean>(() => {
    return (
      props.rules !== void 0 && props.rules !== null && props.rules.length > 0
    )
  })

  const validatable = computed<boolean>(() => {
    return props.validate
  })

  const dirty = () => {
    errorState.isDirty = true
  }

  const update = (err, msg = null) => {
    if (errorState.innerError !== err) {
      errorState.innerError = err
    }

    if (msg && errorState.innerErrorMessage !== msg) {
      errorState.innerErrorMessage = msg
    }

    if (!msg) errorState.innerErrorMessage = msg

    return errorState.innerError
  }

  const validate = (val = props.value): boolean | void => {

    if (validatable.value) return !update(!val)

    if (!hasRules.value) return true

    dirty()

    for (let i = 0, len = props.rules.length; i < len; i += 1) {
      const rule = props.rules[i]

      let result

      if (typeof rule === 'function') {
        result = rule(val)
      }

      if (result === false || typeof result === 'string') {
        update(true, result)
        return false
      }

      if (result === true && i === len - 1) {
        update(false)
        return true
      }
    }
  }

  return {
    validate,
    dirty,
    update,
    validateClasses,
    computedColor,
    validationState,
    errorState,
  }
}
