import { computed, reactive } from 'vue'

type State = {
  focused: boolean
}

export const useInputStates = (props, { attrs, emit }) => {
  const state = reactive<State>({
    focused: false,
  })

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

  const onFocus = (e) => {
    if (isReadonly.value) return

    state.focused = true
    emit('focus', e)
  }

  const onChange = () => {
    if (isReadonly.value) return

    emit('change')
  }

  const onBlur = (e) => {
    if (isReadonly.value) return

    state.focused = false
    emit('blur', e)
  }

  const onSelect = (val) => {
    state.focused = false
    emit('update:modelValue', val)
    onChange()
  }

  return {
    state,
    isReadonly,
    isDisabled,
    onFocus,
    onBlur,
    onChange,
    onSelect,
  }
}
