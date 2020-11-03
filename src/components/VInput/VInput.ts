// Style
import './VInput.scss'

// Vue API
import {
  h,
  defineComponent,
  computed,
  reactive,
} from 'vue'

// Components
import { VLabel } from '../VLabel'

// Types
import { SetupContext } from 'vue'

// Effects
import {
  validateProps,
  validateClasses,
  useValidate,
} from '../../effects/use-validate'

const vInputProps = {
  label: String,
  height: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: [String, Number],
  ...validateProps(),
}

type InputState = {
  value: string | number
  focused: boolean
}

export const VInput = defineComponent({
  name: 'v-input',
  props: vInputProps,

  setup(props, ctx) {

    const state: InputState = reactive({
      value: '',
      focused: false,
    })

    state.value = props.modelValue!

    const { validate, focused, validState } = useValidate(props)

    const isDirty = computed<boolean>(() => {
      return validState.isDirty
    })

    const isValid = computed<boolean>(() => {
      return validState.isDirty && !validState.innerError
    })

    const isNotValid = computed<boolean>(() => {
      return validState.isDirty && validState.innerError!
    })

    const computedColor = computed((): string => {
      if (validState.innerError) return 'red darken-1'
      return 'blue darken-2'
    })

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-input': true,
        'v-input--disabled': props.disabled,
        'v-input--dirty': isDirty.value,
        'v-input--valid': isValid.value,
        'v-input--not-valid': isNotValid.value,
        'v-input--focused': state.focused,
        ...validateClasses(),
      }
    })

    const validateValue = () => {
      requestAnimationFrame(() => {
        props.rules.length && validate(state.value)
      })
    }

    const focusHandler = () => {
      focused()
      state.focused = true
      ctx.emit('focus')
    }

    const blurHandler = () => {
      ctx.emit('blur')
      state.focused = false
      validateValue()
    }

    const inputHandler = (e) => {
      state.value = e.target.value
      ctx.emit('update:modelValue', state.value)
    }

    const genLabel = () => {
      const labelProps = {
        absolute: true,
        color: computedColor.value,
        value: state.value,
        focused: state.focused,
      }

      return h(
        VLabel.setup!(
          labelProps as typeof VLabel.props,
          ctx as SetupContext,
        ) as any,
        props.label,
      )
    }

    const genTextField = () => {

      const textFieldProps = {
        type: props.type,
        disabled: props.disabled,
        value: state.value,
        class: {
          'v-input__field': true,
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
      }

      return h('input', textFieldProps)
    }

    const genTextFieldSlot = () => {
      return h('div', {
        class: {
          'v-input__text-slot': true,
        },
      }, [genLabel(), genTextField()])
    }

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
        methods: {
          validateValue,
        }
      }
    }

    const genInput = () => {
      return h('div', genDataProps(), genTextFieldSlot())
    }

    return () => genInput()
  },
})
