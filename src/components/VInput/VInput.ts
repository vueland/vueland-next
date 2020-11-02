// Style
import './VInput.scss'

// Vue API
import { defineComponent, h, computed, reactive } from 'vue'

// Components
import { VField } from '../VField'
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
  placeholder: String,
  disabled: Boolean,
  required: {
    type: Boolean,
    default: false,
  },
  valid: Boolean,
  modelValue: [String, Number],
  ...validateProps(),
}

export const VInput = defineComponent({
  name: 'v-input',
  props: inputProps,

  setup(props, ctx) {

    const state = reactive({
      isValid: false,
    })

    const {
      validate,
      focused,
      validState,
    } = useValidate(props)

    const classes = computed((): Record<string, boolean> => {
      return {
        'v-input': true,
      }
    })

    const computedColor = computed((): string => {
      if (validState.innerError) return 'red darken-1'
      return 'blue darken-2'
    })

    const focusHandler = () => {
      focused()
      ctx.emit('focus')
    }

    const blurHandler = () => {
      ctx.emit('blur')
      requestAnimationFrame(() => {
        state.isValid = props.required && validate(props.modelValue) as boolean
      })
    }

    const inputHandler = (e) => {
      ctx.emit('update:modelValue', e.target.value)
    }

    const genLabel = () => {
      VLabel.props = {
        absolute: true,
        color: computedColor.value,
      }
      return h(
        VLabel.setup!(props as any, ctx as SetupContext) as any,
        VLabel.props,
        props.label,
      )
    }

    const genField = () => {
      const fieldProps = {
        type: props.type,
        disabled: props.disabled,
        required: props.required,
        placeholder: props.placeholder,
        value: props.modelValue,
        isDirty: validState.isDirty,
        valid: state.isValid,
      }

      return h(VField.setup!(fieldProps as any, ctx as SetupContext) as any,
        {
          onFocus: focusHandler,
          onBlur: blurHandler,
          onInput: inputHandler,
        })
    }

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
      }
    }

    const genInput = () => {
      return h(
        'div',
        genDataProps(),
        [
          genLabel(),
          genField(),
        ],
      )
    }

    return () => genInput()
  }
})
