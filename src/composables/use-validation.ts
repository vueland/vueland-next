import { reactive, computed } from 'vue'
// Types
import { PropType } from 'vue'
import { Maybe } from '../../types/base'

type ErrorsState = {
  innerError: Maybe<object>
  innerErrorMessage: Maybe<string>
  isDirty: boolean
}

export const validationProps = () => ({
  rules: {
    type: Array as PropType<Array<(val: any) => boolean>>,
    default: null,
  },
  value: [String, Number, Date, Object],
})

export const useValidation = (props) => {
  const errorState = reactive<ErrorsState>({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false,
  })

  const validationClasses = () => ({
    'e-validatable': true,
  })

  const computedColor = computed<Maybe<string>>(() => {
    return props.disabled ? 'disabled' : 'primary'
  })

  const hasRules = computed<boolean>(() => {
    return !!props.rules && props.rules.length > 0
  })

  const dirty = () => (errorState.isDirty = true)

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
    if (!hasRules.value) return true

    dirty()

    for (let i = 0, len = props.rules.length; i < len; i += 1) {
      const rule = props.rules[i]

      let result

      if (typeof rule === 'function') result = rule(val)

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
    errorState,
    computedColor,
    validationClasses,
    validate,
    dirty,
  }
}
