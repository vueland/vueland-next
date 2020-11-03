// Style
import './VInput.scss'

// Vue API
import { defineComponent, h, computed, reactive } from 'vue'

// Components
import { VLabel } from '../VLabel'

// Types
import { SetupContext } from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'

const inputProps = {
  label: String,
  height: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: [String, Number],
  ...validateProps(),
}

export const VInput = defineComponent({
  name: 'v-input',
  props: inputProps,

  setup(props, ctx) {

    const state = reactive({
      focused: false,
    })

    const { validate, focused, validState } = useValidate(props)

    const classes = computed((): Record<string, boolean> => {
      return {
        'v-input': true,
        'v-validatable': true,
        'v-input--required': props.required,
        'v-input--disabled': props.disabled,
        'v-input--dirty': validState.isDirty,
        'v-input--valid': validState.isDirty && props.required && !validState.innerError,
        'v-input--not-valid': validState.isDirty && props.required && validState.innerError!,
        'v-input--focused': state.focused
      }
    })

    const computedColor = computed((): string => {
      if (validState.innerError) return 'red darken-1'
      return 'blue darken-2'
    })

    const focusHandler = () => {
      focused()
      state.focused = true
      ctx.emit('focus')
    }

    const blurHandler = () => {
      ctx.emit('blur')
      state.focused = false

      requestAnimationFrame(() => {
        props.required && validate(props.modelValue)
      })
    }

    const inputHandler = (e) => {
      ctx.emit('update:modelValue', e.target.value)
    }

    const genLabel = () => {
      const labelProps = {
        absolute: true,
        left: 0,
        right: 'auto',
        color: computedColor.value,
        value: props.modelValue,
        focused: state.focused
      }

      return h(
        VLabel.setup!(labelProps as any, ctx as SetupContext) as any,
        props.label,
      )
    }

    const genField = () => {

      const fieldProps = {
        type: props.type,
        disabled: props.disabled,
        required: props.required,
        value: props.modelValue,
        class: {
          'v-input__field': true
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
      }

      return h('input', fieldProps)
    }

    const genFieldSlot = () => {
      return h('div', {
        class: {
          'v-input__text-slot': true
        }
      }, [genLabel(), genField()])
    }

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
      }
    }

    const genInput = () => {
      return h('div', genDataProps(), genFieldSlot())
    }

    return () => genInput()
  }
})
