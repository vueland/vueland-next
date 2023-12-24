import { computed, reactive, unref, watch } from 'vue'
import { useValidation } from './use-validation'

type State = {
  value: string | number
  focused: boolean
}

export const useInputStates = (props: Record<string, any>, { attrs, emit }) => {
  const inputState = reactive<State>({
    value: props.modelValue ?? '',
    focused: false,
  })

  const { errorState, validate } = useValidation(props)

  const isDisabled = computed<boolean>(() => {
    if (props.disabled) return true
    console.log(props, attrs)
    return attrs.disabled !== undefined
  })

  const isReadonly = computed<boolean>(() => {
    if (props.readonly) return true

    return attrs.readonly !== undefined
  })

  const stateClasses = computed<Record<string, boolean>>(() => ({
    'primary--text': inputState.focused && !errorState.innerError,
    'error--text': !!errorState.innerError,
  }))

  watch(() => inputState.focused, (value) => {
    if (!value && props.rules) validate(inputState.value)
  })

  watch(() => inputState.value, validate)

  const onFocus = (e: InputEvent) => {
    if (unref(isDisabled)) return

    inputState.focused = true
    emit('focus', e)
  }

  const onChange = () => {
    if (unref(isDisabled)) return

    emit('change')
  }

  const onBlur = (e: InputEvent) => {
    inputState.focused = false
    emit('blur', e)
  }

  const onSelect = (val: any) => {
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
    validate,
  }
}
