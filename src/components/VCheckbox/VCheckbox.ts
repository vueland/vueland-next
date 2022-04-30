// Vue API
import {
  h,
  ref,
  watch,
  defineComponent,
  inject,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useValidation } from '../../composable/use-validation'
import { useIcons } from '../../composable/use-icons'

// Components
import { VIcon } from '../VIcon'
import { VLabel } from '../VLabel'

// Helpers
import { warning } from '../../helpers'

// Types
import { VNode } from 'vue'

export const VCheckbox = defineComponent({
  name: 'v-checkbox',
  props: {
    onIcon: {
      type: String,
    },
    offIcon: {
      type: String,
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
  emits: ['checked', 'update:modelValue'],
  setup(props, { emit }): () => VNode {
    const isChecked = ref(false)
    const form: any = inject('form', null)

    const { validate } = useValidation(props)
    const { icons } = useIcons()

    const isArray = computed<boolean>(() => Array.isArray(props.modelValue))
    const isValueSet = computed<boolean>(() => props.value !== null)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-checkbox': true,
      'v-checkbox--disabled': props.disabled,
      'v-checkbox--checked': isChecked.value,
      'v-validatable': props.validate,
    }))

    watch(
      () => props.modelValue,
      () => {
        if (isArray.value) {
          if (isValueSet.value) {
            isChecked.value = props.modelValue.includes(props.value)
          } else {
            warning('v-checkbox: set the "value" prop')
          }
        } else {
          isChecked.value = !!props.modelValue
        }
      },
      { immediate: true },
    )

    const validateValue = (): boolean | void => {
      return validate(isChecked.value)
    }

    const genLabel = (): VNode => {
      const propsData = {
        absolute: false,
        color: props.dark ? 'white' : '',
        disabled: props.disabled,
      }

      return h(VLabel, propsData, {
        default: () => props.label,
      })
    }

    const genLabelWrapper = () => {
      return h('div', {
        class: 'v-checkbox__label',
      }, genLabel())
    }

    const genIcon = (): VNode => {
      const onIcon = props.onIcon || icons.$checkOn
      const offIcon = props.offIcon || icons.$checkOff
      const icon = isChecked.value ? onIcon : offIcon

      const propsData = {
        icon,
        color: props.color,
        disabled: props.disabled,
      }

      return h(VIcon, propsData)
    }

    const genCheckbox = (): VNode => {
      return h('div', {
        class: 'v-checkbox__square',
      }, genIcon())
    }

    const computeValue = (): boolean | any[] => {
      if (isArray.value) {
        let modelValue = [...props.modelValue]
        isChecked.value = !modelValue.includes(props.value)

        if (!isChecked.value) {
          modelValue = modelValue.filter((it) => it !== props.value)
        } else {
          modelValue.push(props.value)
        }

        return modelValue
      }

      return (isChecked.value = !isChecked.value)
    }

    const onClick = () => {
      if (props.disabled) return
      const value = computeValue()

      props.validate && validateValue()
      emit('update:modelValue', value)
      emit('checked', value)
    }

    onBeforeMount(() => {
      if (form) form!.add(validateValue)
    })

    onBeforeUnmount(() => {
      form?.remove(validateValue)
    })

    return (): VNode => h('div',
      { class: classes.value, onClick },
      [genCheckbox(), props.label && genLabelWrapper()],
    )
  },
})
