// Styles
import './VTextField.scss'

// Vue API
import { h, watch, computed, reactive, defineComponent } from 'vue'

// Effects
import { useValidate, validateProps } from '../../effects/use-validate'
import { useColors, colorProps } from '../../effects/use-colors'

// Components
import { VInput } from '../VInput'

// Types
import { VNode } from 'vue'
import { Props } from '../../types'

const vTextFieldProps: Props = {
  dark: Boolean,
  disabled: Boolean,
  label: String,
  isDirty: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
  },
  ...validateProps(),
  ...colorProps(),
}

type TextFieldState = {
  value: string | number
  focused: boolean
}

export const VTextField = defineComponent({
  name: 'v-text-field',
  props: vTextFieldProps,

  setup(props, { emit }) {
    const state: TextFieldState = reactive({
      value: '',
      focused: false,
    })

    state.value = props.modelValue

    const { setTextColor } = useColors()

    const {
      validate,
      dirty,
      update,
      errorState,
      computedColor,
      validateClasses,
      validationState,
    } = useValidate(props)

    const classes = computed(
      (): Record<string, boolean> => ({
        'v-text-field': true,
        'v-text-field--disabled': props.disabled,
        'v-text-field--dirty': props.isDirty,
        'v-text-field--valid': props.isDirty && !errorState.innerError,
        'v-text-field--not-valid': props.isDirty && !!errorState.innerError,
        ...validateClasses.value,
      }),
    )

    const validateValue = () => {
      props.rules?.length && validate(state.value || props.modelValue)
    }

    const focusHandler = () => {
      dirty()
      update(errorState.innerError)
      state.focused = true
      emit('focus')
    }

    const blurHandler = () => {
      state.focused = false
      emit('blur')
      validateValue()
    }

    const inputHandler = e => {
      state.value = e.target.value
      emit('update:modelValue', state.value)
    }

    const genInput = (): VNode => {
      const textFieldProps = {
        type: props.type,
        disabled: props.disabled,
        value: props.modelValue,
        class: {
          'v-text-field__input': true,
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
      }

      return h('input', setTextColor(computedColor.value!, textFieldProps))
    }

    const genTextField = () => {
      return h(
        'div',
        {
          class: {
            ...classes.value,
          },
          methods: {
            validateValue,
          },
        },
        [genInput()],
      )
    }

    watch(
      () => props.modelValue,
      value => {
        state.value = value
        if (!value) return validateValue()
      },
    )

    return () =>
      h(
        VInput,
        {
          label: props.label,
          focused: state.focused,
          hasState: !!state.value,
          hasError: errorState.innerError,
          dark: props.dark,
          color: validationState.value,
          isDirty: errorState.isDirty,
          disabled: props.disabled,
          message: errorState.innerErrorMessage,
        } as Props,
        {
          textField: () => genTextField(),
        },
      )
  },
})