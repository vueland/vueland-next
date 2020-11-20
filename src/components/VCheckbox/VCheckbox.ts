// Styles
import './VCheckbox.scss'

// Vue API
import { h, ref, defineComponent, inject } from 'vue'

// Effects
import { useValidate } from '@/effects/use-validate'

// Components
import { VIcon } from '../VIcon'
import { VLabel } from '../VLabel'

// Services
import { FaIcons } from '../../services/icons'

// Types
import { VNode, Ref } from 'vue'
import { Props } from '../../types'

export const vCheckboxProps: Props = {
  onIcon: {
    type: String,
    default: FaIcons.$checkOn,
  },
  offIcon: {
    type: String,
    default: FaIcons.$checkOff,
  },
  label: String,
  disabled: Boolean,
  validate: Boolean,
  modelValue: [Array, Boolean],
  value: [String, Number, Object],
  color: {
    type: String,
    default: 'primary',
  },
}

export const VCheckbox = defineComponent({
  name: 'v-checkbox',
  props: vCheckboxProps,

  setup(props, { emit }) {

    const state = ref(false)
    const fields: Ref<any[]> | undefined = props.validate && inject('fields')

    const { validate, validationState } = useValidate(props)

    const validateValue = () => validate(state.value)

    if (fields && fields.value) {
      fields!.value.push(validateValue)
    }

    if (Array.isArray(props.modelValue)) {
      state.value = props.modelValue.includes(props.value)
    } else {
      state.value = props.modelValue
    }

    const genLabel = (): VNode => {
      const propsData = {
        absolute: false,
        disabled: props.disabled,
        top: 0,
        class: 'v-checkbox__label',
      }

      return h(VLabel, propsData, {
          default: () => props.label,
        },
      )
    }


    const genCheckbox = (): VNode => {
      const icon = state.value ? props.onIcon : props.offIcon

      return h('div', {
        class: 'v-checkbox__square',
      }, [
        h(VIcon, {
          icon,
          color: validationState.value,
          disabled: props.disabled,
        }),
      ])
    }

    const computedValue = () => {
      const value = props.value
      let model = props.modelValue

      if (Array.isArray(model)) {
        state.value = !model.includes(value)
        if (!state.value) {
          model = model.filter(it => it !== value)
        } else {
          model.push(value)
        }

        return model
      }

      state.value = !state.value
      return state.value
    }

    // computedValue()

    const onClick = () => {
      const value = computedValue()
      props.validate && validateValue()
      emit('update:modelValue', value)
      emit('checked', value)
    }

    return (): VNode => h('div', {
      class: {
        'v-checkbox': true,
        'v-validatable': true,
      },
      onClick,
    }, [
      genCheckbox(),
      genLabel(),
    ])
  },
})
