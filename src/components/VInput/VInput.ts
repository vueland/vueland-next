// Style
import './VInput.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Components
import { VLabel } from '../VLabel'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

// Effects
import { useTransition } from '../../effects/use-transition'
import { colorProps } from '../../effects/use-colors'

const vInputProps: Props = {
  dark: Boolean,
  focused: Boolean,
  hasState: Boolean,
  hasError: Boolean,
  isDirty: Boolean,
  label: String,
  message: String,
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: [String, Number],
  ...colorProps(),
}

export const VInput = defineComponent({
  name: 'v-input',
  props: vInputProps,

  setup(props, { slots }) {
    const isValid = computed<boolean>(() => {
      return props.isDirty && props.hasState && !props.hasError
    })

    const isNotValid = computed<boolean>(() => {
      return props.isDirty && props.hasError
    })

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-input': true,
        'v-input--disabled': props.disabled,
        'v-input--dirty': props.isDirty,
        'v-input--valid': isValid.value,
        'v-input--not-valid': isNotValid.value,
        'v-input--focused': props.focused,
      }
    })

    const genLabel = (): VNode => {
      const labelProps = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: props.color,
      }

      return h(VLabel, labelProps, {
        default: () => props.label,
      })
    }

    const genSlotContent = (): VNode => {
      return h(
        'div',
        {
          class: {
            'v-input__select-slot': !!slots.select,
            'v-input__field-slot': !!slots.textField,
          },
        },
        [
          genLabel(),
          slots.select && slots.select(),
          slots.textField && slots.textField(),
        ],
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
        [props.message],
      )
    }

    const genStatus = (): VNode => {
      const transitionedMessage = useTransition(
        { transition: 'fade' } as Props,
        (props.message && genStatusMessage()) as VNode,
      )

      return h(
        'div',
        {
          class: {
            'v-input__status': true,
          },
        },
        [transitionedMessage],
      )
    }

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
      }
    }

    return (): VNode =>
      h('div', genDataProps(), [genSlotContent(), genStatus()])
  },
})
