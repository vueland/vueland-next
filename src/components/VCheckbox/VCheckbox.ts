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

export const VCheckbox = defineComponent({
  name: 'v-checkbox',

  props: {
    onIcon: {
      type: String,
      default: FaIcons.$checkOn,
    },
    offIcon: {
      type: String,
      default: FaIcons.$checkOff,
    },
    dark: Boolean,
    label: String,
    disabled: Boolean,
    validate: Boolean,
    modelValue: [Array, Boolean],
    value: {
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
  } as any,

  setup(props, { emit }): () => VNode {
    const isChecked = ref(false)
    const fields: Ref<any[]> | undefined = props.validate && inject('fields')

    const { validate, validationState } = useValidate(props)

    const isArray = computed<boolean>(() => Array.isArray(props.modelValue))
    const isValueSet = computed<boolean>(() => props.value !== null)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-checkbox': true,
      'v-checkbox--disabled': props.disabled,
      'v-checkbox--checked': isChecked.value,
      'v-validatable': props.validate,
    }))

    if (isArray.value) {
      if (isValueSet.value) {
        isChecked.value = props.modelValue.includes(props.value)
      } else {
        warning('v-checkbox: set the "value" property')
      }
    } else {
      isChecked.value = !!props.modelValue
    }

    if (fields?.value) {
      fields!.value.push(validateValue)
    }

    function validateValue(): boolean | void {
      return validate(isChecked.value)
    }

    function genLabel(): VNode {
      const propsData = {
        absolute: false,
        color: props.dark ? 'white' : '',
        disabled: props.disabled,
        class: 'v-checkbox__label',
      }

      return h(VLabel, propsData, {
        default: () => props.label,
      })
    }

    function genIcon(): VNode {
      const icon = isChecked.value ? props.onIcon : props.offIcon

      const propsData = {
        icon,
        size: 26,
        color: validationState.value,
        disabled: props.disabled,
      }

      return h(VIcon, propsData)
    }

    function genCheckbox(): VNode {
      const propsData = {
        class: {
          'v-checkbox__square': true,
        },
      }

      return h('div', propsData, genIcon())
    }

    function computeValue(): boolean | any[] {
      let { modelValue } = props

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

    function onClick() {
      if (props.disabled) return

      const value = computeValue()

      props.validate && validateValue()
      emit('update:modelValue', value)
      emit('checked', value)
    }

    return (): VNode => {
      const dataProps = {
        class: classes.value,
        onClick,
      }

      return h('div', dataProps, [genCheckbox(), genLabel()])
    }
  },
})
