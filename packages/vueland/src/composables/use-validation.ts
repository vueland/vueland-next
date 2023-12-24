import { reactive, computed, unref } from 'vue'
// Types
import { PropType } from 'vue'

type ErrorsState = {
  innerError: Maybe<object>
  innerErrorMessage: Maybe<string>
  isDirty: boolean
}

export const validationProps = () => ({
  rules: {
    type: Array as PropType<Array<(val: any) => boolean | string>>,
    default: null,
  },
  modelValue: [ String, Number, Date, Object, Array ],
})

export const useValidation = (props) => {
  const errorState = reactive<ErrorsState>({
    innerError: null,
    innerErrorMessage: null,
    isDirty: false,
  })

  const validationClasses = () => ({
    'v-validatable': true,
  })

  const computedColor = computed<Maybe<string>>(() => props.disabled ? 'disabled' : 'primary')
  const hasRules = computed<boolean>(() => props.rules?.length ?? false)

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

  const validate = (val = props.modelValue): boolean => {
    if (!unref(hasRules)) return true

    dirty()

    for (let i = 0, len = props.rules.length; i < len; i += 1) {
      const rule = props.rules[i]

      const result = rule(val)

      if (result === false || typeof result === 'string') {
        update(true, result)
        return false
      }

      update(false)
    }

    return true
  }

  return {
    errorState,
    computedColor,
    validationClasses,
    validate,
    dirty,
  }
}
