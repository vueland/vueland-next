import { computed, reactive, watch } from 'vue'
import { useValidation } from './use-validation'

type State = {
  value: string | number
  focused: boolean
}

export const useInputStates = (props, { attrs, emit }) => {
  const inputState = reactive<State>({
    value: '',
    focused: false,
  })

  const { errorState, validate } = useValidation(props)

  const isDisabled = computed<boolean>(() => {
    if (props.disabled) return true

    if (typeof attrs.disabled === 'boolean') return attrs.disabled

    return attrs.disabled !== undefined
  })

  const isReadonly = computed<boolean>(() => {
    if (props.readonly) return true

    if (typeof attrs.readonly === 'boolean') return attrs.readonly

    return attrs.readonly !== undefined
  })

  const stateClasses = computed<Record<string, boolean>>(() => ({
    'primary--text': inputState.focused && !errorState.innerError,
    'error--text': !!errorState.innerError,
  }))

  watch(() => inputState.focused, (focused) => {
    if (!focused && props.rules) return validate(inputState.value)
  })

  watch(() => inputState.value, (val) => {
    if (props.rules) return validate(val)
  })

  const onFocus = (e) => {
    if (isReadonly.value) return

    inputState.focused = true
    emit('focus', e)
  }

  const onChange = () => {
    if (isReadonly.value) return

    emit('change')
  }

  const onBlur = (e) => {
    if (isReadonly.value) return

    inputState.focused = false
    emit('blur', e)
  }

  const onSelect = (val) => {
    inputState.focused = false

    emit('update:modelValue', val)
    emit('select', val)

    onChange()
  }

  return {
    inputState,
    errorState,
    isReadonly,
    isDisabled,
    stateClasses,
    onFocus,
    onBlur,
    onChange,
    onSelect,
    validate
  }
}
