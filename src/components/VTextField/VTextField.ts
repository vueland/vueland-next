import './VTextField.scss'

// Vue API
import { defineComponent, computed, h, reactive } from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VInput } from '../VInput'

// Types
import { VNode } from 'vue'
import { Props, VInputComponent } from '../../types'

const textFieldProps: Props = {
  dark: Boolean,
  type: {
    type: String,
    default: 'text',
  },

  isDirty: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: [String, Number]
  },

  label: String,

  disabled: {
    type: Boolean,
    default: false,
  },
  ...validateProps(),
  ...colorProps()
}

type TextFieldState = {
  value: string | number
  focused: boolean
}

export const VTextField = defineComponent({
  name: 'v-field',
  props: textFieldProps,

  setup(props, ctx) {

    const state: TextFieldState = reactive({
      value: '',
      focused: false,
    })

    const { setTextColor } = useColors()

    const {
      validate,
      focused,
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
        ...validateClasses.value
      }),
    )

    const validateValue = () => {
      return props.rules?.length && validate(state.value)
    }

    const focusHandler = () => {
      focused()
      update(errorState.innerError)
      state.focused = true
      ctx.emit('focus')
    }

    const blurHandler = () => {
      ctx.emit('blur')
      state.focused = false
      validateValue()
    }

    const inputHandler = e => {
      state.value = e.target.value
      ctx.emit('update:modelValue', state.value)
    }

    const genTextField = (): VNode => {
      const textFieldProps = {
        type: props.type,
        disabled: props.disabled,
        value: state.value,
        class: {
          'v-text-field__input': true
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
      }

      return h('input', setTextColor(computedColor.value!, textFieldProps))
    }

    const genFieldWrapper = () => {
      return h('div', {
        class: {
          ...classes.value
        },
        methods: {
          validateValue
        },
      }, [genTextField()])
    }

    return () => h(
      VInput as VInputComponent,
      {
        label: props.label,
        focused: state.focused,
        hasState: !!state.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        isDirty: errorState.isDirty,
        message: errorState.innerErrorMessage
      },
      {
        textField: () => genFieldWrapper(),
        autocomplete: () => h('div', {
          class: {
            autocomplete: true
          }
        })
      }
    )
  },
})
