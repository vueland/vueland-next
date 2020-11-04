// Style
import './VInput.scss'

// Vue API
import {
  h,
  defineComponent,
  computed,
  reactive
} from 'vue'

// Components
import { VLabel } from '../VLabel'

// Types
import { SetupContext, VNode } from 'vue'

// Effects
import { useTransition } from '../../effects/use-transition'
import { colorProps, useColors } from '../../effects/use-colors'

import { validateProps, useValidate } from '../../effects/use-validate'

const vInputProps = {
  label: String,
  height: [String, Number],
  dark: Boolean,
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
  ...colorProps(),
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

    const {
      validate,
      focused,
      validateClasses,
      update,
      computedColor,
      validationState,
      errorState,
    } = useValidate(props)

    const { setTextColor } = useColors()

    const isDirty = computed<boolean>(() => {
      return errorState.isDirty
    })

    const isValid = computed<boolean>(() => {
      return errorState.isDirty && !errorState.innerError
    })

    const isNotValid = computed<boolean>(() => {
      return errorState.isDirty && errorState.innerError!
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

    const genLabel = (): VNode => {
      const labelProps = {
        absolute: true,
        hasState: !!state.value,
        disabled: props.disabled,
        focused: state.focused,
        color: validationState.value,
      }

      return h(
        VLabel.setup!(
          labelProps as typeof VLabel.props,
          ctx as SetupContext,
        ) as any,
        props.label,
      )
    }

    const genTextField = (): VNode => {
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

      return h('input', setTextColor(computedColor.value!, textFieldProps))
    }

    const genTextFieldSlot = (): VNode => {
      return h(
        'div',
        {
          class: {
            'v-input__text-slot': true,
          },
        },
        [genLabel(), genTextField()],
      )
    }

    const genStatusMessage = (): VNode => {
      return h(
        'span',
        {
          class: {
            'v-input__status-message': true,
          },
        },
        [errorState.innerErrorMessage],
      )
    }

    const genStatus = (): VNode => {
      const transitionedMessage = useTransition(
        { transition: 'fade' },
        errorState.innerErrorMessage! && genStatusMessage(),
      )

      return h(
        'div',
        {
          class: {
            'v-input__status': true,
          },
        },
        [transitionedMessage()],
      )
    }

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
        methods: {
          validateValue,
        },
      }
    }

    const genInput = () => {
      return h('div', genDataProps(), [genTextFieldSlot(), genStatus()])
    }

    return () => genInput()
  },
})
