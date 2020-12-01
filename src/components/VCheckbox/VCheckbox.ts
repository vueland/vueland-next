// Styles
import './VCheckbox.scss'

// Vue API
import { h, ref, computed, defineComponent, inject } from 'vue'

// Effects
import { useValidate } from '@/effects/use-validate'

// Components
import { VIcon } from '../VIcon'
import { VLabel } from '../VLabel'

// Services
import { FaIcons } from '../../services/icons'

// Helpers
import { warning } from '../../helpers'

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
  value: {
    type: [String, Number, Object],
    default: null,
  },
  color: {
    type: String,
    default: 'primary',
  },
}

export const VCheckbox = defineComponent({
  name: 'v-checkbox',
  props: vCheckboxProps,

  setup(props, { emit }) {
    const isChecked = ref(false)
    const fields: Ref<any[]> | undefined = props.validate && inject('fields')

    const { validate, validationState } = useValidate(props)

    const validateValue = () => validate(isChecked.value)

    const isArray = computed<boolean>(() => {
      return Array.isArray(props.modelValue)
    })

    const isValueSet = computed<boolean>(() => {
      return props.value !== null
    })

    if (fields && fields.value) {
      fields!.value.push(validateValue)
    }

    if (isArray.value) {
      if (isValueSet.value) {
        isChecked.value = props.modelValue.includes(props.value)
      } else {
        warning('v-checkbox: set the "value" property')
      }
    } else {
      isChecked.value = !!props.modelValue
    }

    const genLabel = (): VNode => {
      const propsData = {
        absolute: false,
        disabled: props.disabled,
        class: 'v-checkbox__label',
      }

      return h(VLabel, propsData, {
        default: () => props.label,
      })
    }

    const genCheckbox = (): VNode => {
      const icon = isChecked.value ? props.onIcon : props.offIcon

      return h(
        'div',
        {
          class: 'v-checkbox__square',
        },
        [
          h(VIcon, {
            icon,
            color: validationState.value,
            disabled: props.disabled,
          }),
        ],
      )
    }

    const computedValue = () => {
      let modelValue = props.modelValue

      if (isArray.value) {
        if (isValueSet.value) {
          isChecked.value = !modelValue.includes(props.value)

          if (!isChecked.value) {
            modelValue = modelValue.filter(it => it !== props.value)
          } else {
            modelValue.push(props.value)
          }
        } else {
          return (isChecked.value = !isChecked.value)
        }

        return modelValue
      }

      return (isChecked.value = !isChecked.value)
    }

    const onClick = () => {
      if (props.disabled) return

      const value = computedValue()

      props.validate && validateValue()
      emit('update:modelValue', value)
      emit('checked', value)
    }

    return (): VNode =>
      h(
        'div',
        {
          class: {
            'v-checkbox': true,
            'v-checkbox--disabled': props.disabled,
            'v-checkbox--checked': isChecked.value,
            'v-validatable': props.validate,
          },
          onClick,
        },
        [genCheckbox(), genLabel()],
      )
  },
})
