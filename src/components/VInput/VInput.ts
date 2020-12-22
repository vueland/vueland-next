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

export const VInput = defineComponent({
  name: 'v-input',

  props: {
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
  } as any,

  setup(props, { slots }): () => VNode {
    const { setTextColor } = useColors()
    const isValid = computed<boolean>(() => {
      return props.isDirty && props.hasState && !props.hasError
    })

    const isNotValid = computed<boolean>(() => {
      return props.isDirty && props.hasError
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-input': true,
      'v-input--disabled': props.disabled,
      'v-input--dirty': props.isDirty,
      'v-input--valid': isValid.value,
      'v-input--not-valid': isNotValid.value,
      'v-input--focused': props.focused,
    }))

    function genLabel(): VNode {
      const propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: props.color,
      }

      return h(VLabel, propsData, {
        default: () => props.label,
      })
    }

    function genSlotContent(): VNode {
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

    function genStatusMessage(): VNode {
      const propsData = {
        class: {
          'v-input__status-message': true,
        },
      }

      return h('span', propsData, props.message)
    }

    function genStatus(): VNode {
      const transitionedMessage = useTransition(
        (props.message && genStatusMessage()) as VNode,
        'fade',
      )

      const propsData = {
        class: {
          'v-input__status': true,
        },
      }

      return h('div', propsData, transitionedMessage)
    }

    function genPropsData() {
      return {
        class: {
          ...classes.value,
        },
      }
    }

    return () => h('div', genPropsData(), [genSlotContent(), genStatus()])
  },
})
