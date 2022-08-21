// Vue API
import {
  h,
  ref,
  watch,
  defineComponent,
  inject,
  toRaw,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

// Composables
import { useValidation } from '../../composable/use-validation'
import { useIcons } from '../../composable/use-icons'
import { colorProps } from '../../composable/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VLabel } from '../VLabel'

// Services
import { sizes } from '../../services/sizes'

// Types
import { VNode } from 'vue'
import { Maybe } from '../../../types/base'

type Form = {
  add: (item) => void
  remove: (item) => void
}

export default defineComponent({
  name: 'v-checkbox',
  props: {
    modelValue: {
      type: [ Array, Boolean ],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    validate: Boolean,
    value: {
      type: [ Array, Object, String, Number ],
      default: null,
    },
    ...colorProps(),
  },
  emits: [ 'change', 'update:modelValue' ],
  setup(props, { emit }): () => VNode {
    const isChecked = ref(false)
    const form = inject<Maybe<Form>>('form', null)
    const valuesMap: Map<any, any> = new Map()

    const { validate } = useValidation(props)
    const { icons } = useIcons()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-checkbox': true,
      'v-checkbox--disabled': props.disabled,
      'v-checkbox--checked': isChecked.value,
      'v-validatable': props.validate,
    }))

    watch(() => props.modelValue, to => {
      if (Array.isArray(to)) {
        valuesMap.clear()
        to.forEach(it => valuesMap.set(toRaw(it), toRaw(it)))
        isChecked.value = !!valuesMap.get(toRaw(props.value))
      } else {
        isChecked.value = !!props.modelValue
      }
    }, { immediate: true })

    const validateValue = (): boolean | void => {
      return validate(isChecked.value)
    }

    const genLabel = (): VNode => {
      const propsData = {
        absolute: false,
        disabled: props.disabled,
      }

      return h(VLabel, propsData, { default: () => props.label })
    }

    const genLabelWrapper = () => {
      return h('div', { class: 'v-checkbox__label' }, genLabel())
    }

    const genIcon = (): VNode => {
      const icon = isChecked.value ? icons.$checkbox : icons.$box

      const propsData = {
        icon,
        size: sizes.sm,
        color: props.color,
        disabled: props.disabled,
      }

      return h(VIcon, propsData)
    }

    const genCheckbox = (): VNode => {
      return h('div', { class: 'v-checkbox__square' }, genIcon())
    }

    const computeValue = (): any[] | boolean => {
      if (Array.isArray(props.modelValue)) {
        if (isChecked.value) {
          valuesMap.delete(toRaw(props.value))
        } else {
          valuesMap.set(toRaw(props.value), toRaw(props.value))
        }

        return Array.from(valuesMap.values())
      }

      return (isChecked.value = !isChecked.value)
    }

    const onClick = () => {
      if (props.disabled) return

      const value = computeValue()

      props.validate && validateValue()
      emit('update:modelValue', value)
      emit('change', value)
    }

    onBeforeMount(() => {
      form?.add(validateValue)
    })

    onBeforeUnmount(() => {
      form?.remove(validateValue)
    })

    return () => h('div',
      { class: classes.value, onClick },
      [ genCheckbox(), props.label && genLabelWrapper() ],
    )
  },
})
