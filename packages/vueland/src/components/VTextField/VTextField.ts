// Vue API
import { computed, defineComponent, h, ref } from 'vue'
// Components
import { VInput } from '../VInput'
// Composables
import { useInputStates } from '../../composables/use-input-states'
// import { validationProps } from '../../composables/use-validation'

export default defineComponent({
  name: 'v-text-field',
  components: {
    VInput,
  },
  inheritAttrs: true,
  emits: ['update:modelValue', 'input', 'blur', 'focus', 'change'],
  setup(props, { emit, attrs, slots }) {
    const inputRef = ref<Maybe<InstanceType<any>>>(null)

    const {
      isReadonly,
      isDisabled,
      onChange,
    } = useInputStates(props, { emit, attrs })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-text-field': true,
      'v-text-field--disabled': isDisabled.value,
      'v-text-field--readonly': isReadonly.value,
    }))

    const computedValue = computed({
      get: () => attrs.modelValue,

      set: (val: string) => {
        emit('input', val)
        emit('update:modelValue', val)
      },
    })

    const onFocus = () => inputRef.value?.onFocus()

    const onBlur = () => inputRef.value?.onBlur()

    const onInput = (e) => {
      computedValue.value = e.target.value
    }

    const genInputField = (textClassColor, textCssColor) => h('input', {
      class: {
        'v-text-field__input': true,
        ...(!attrs.disabled ? textClassColor : {}),
      },
      style: {
        ...(!attrs.disabled ? textCssColor : {}),
      },
      ...attrs,
      type: attrs.type || 'text',
      value: computedValue.value,
      onInput,
      onFocus,
      onBlur,
      onChange,
    })

    const genTextFieldWrapper = (clsColor, cssColor) => h(
      'div', { class: classes.value }, genInputField(clsColor, cssColor),
    )

    return () => h(VInput, {
      ...attrs,
      modelValue: computedValue.value as string,
      ref: inputRef,
      onClear: () => emit('update:modelValue', undefined),
    }, {
      ['text-field']: ({ textClassColor, textCssColor }) => genTextFieldWrapper(textClassColor, textCssColor),
      ...(slots['prepend-icon'] ? { ['prepend-icon']: () => slots['prepend-icon']?.() } : {}),
      ...(slots['append-icon'] ? { ['append-icon']: () => slots['append-icon']?.() } : {}),
    })
  },
})
