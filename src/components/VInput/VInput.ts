// Style
import './VInput.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Components
import { VLabel } from '../VLabel'

// Types
import { VNode } from 'vue'

// Effects
import { useTransition } from '../../effects/use-transition'
import { colorProps, useColors } from '../../effects/use-colors'

const vInputProps: any = {
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
    const { setTextColor } = useColors()
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
      const propsData = {
        class: {
          'v-input__select-slot': !!slots.select,
          'v-input__field-slot': !!slots.textField,
        },
      }
      const slotContent = [
        genLabel(),
        slots.select && slots.select(),
        slots.textField && slots.textField(),
      ]

      return h('div', setTextColor(props.color, propsData), slotContent)
    }

    const genStatusMessage = (): VNode => {
      const propsData = {
        class: {
          'v-input__status-message': true,
        },
      }

      return h('span', propsData, props.message)
    }

    const genStatus = (): VNode => {
      const transitionedMessage = useTransition(
        (props.message && genStatusMessage()) as VNode,
        'fade'
      )

      const propsData = {
        class: {
          'v-input__status': true,
        },
      }

      return h('div', propsData, transitionedMessage)
    }

    const genPropsData = () => {
      return {
        class: {
          ...classes.value,
        },
      }
    }

    return (): VNode =>
      h('div', genPropsData(), [genSlotContent(), genStatus()])
  },
})
