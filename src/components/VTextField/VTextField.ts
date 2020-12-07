// Styles
import './VTextField.scss'

// Vue API
import {
  h,
  inject,
  watch,
  computed,
  reactive,
  defineComponent,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useValidate, validateProps } from '../../effects/use-validate'
import { useColors, colorProps } from '../../effects/use-colors'

// Components
import { VInput } from '../VInput'

// Types
import { VNode, Ref } from 'vue'
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
  modelValue: [String, Number],
  tag: {
    type: String,
    default: 'input',
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

    const fields: Ref<any[]> | undefined = props.rules?.length && inject('fields')

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
        'v-text-field--dirty': errorState.isDirty,
        'v-text-field--valid': errorState.isDirty && !errorState.innerError,
        'v-text-field--not-valid':
          errorState.isDirty && !!errorState.innerError,
        ...validateClasses.value,
      }),
    )

    const validateValue = () => {
      return props.rules?.length && validate(state.value)
    }

    if (fields?.value && props.rules?.length) {
      fields!.value.push(validateValue)
    }

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields.value = fields.value.filter(v => v !== validateValue)
      }
    })

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
        disabled: props.disabled,
        value: state.value,
        class: {
          'v-text-field__input': true,
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
      }

      if (props.tag === 'input') {
        (textFieldProps as any).type = props.type
      }

      return h(props.tag, setTextColor(computedColor.value!, textFieldProps))
    }

    const genTextField = () => {

      return h('div', {
        class: classes.value,
      }, genInput())

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
        } as any,
        {
          textField: () => genTextField(),
        },
      )
  },
})
