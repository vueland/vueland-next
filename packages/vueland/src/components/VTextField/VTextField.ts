// Vue API
import { defineComponent, h, computed, ref } from 'vue'
// Components
import { VInput } from '../VInput'
// Composables
import { useInputStates } from '../../composables/use-input-states'
import { validationProps } from '../../composables/use-validation'

export default defineComponent({
  name: 'v-text-field',
  components: {
    VInput,
  },
  inheritAttrs: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    ...validationProps(),
  },
  emits: ['update:modelValue', 'input', 'blur', 'focus', 'change'],

  setup(props, { emit, attrs, slots }) {
    const inputRef = ref(null)
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
      get: () => props.modelValue,

      set: (val: string) => {
        emit('input', val)
        emit('update:modelValue', val)
      },
    })

    const onFocus = () => {
      (inputRef.value as InstanceType<any>)?.onFocus()
    }

    const onBlur = () => {
      (inputRef.value as InstanceType<any>)?.onBlur()
    }

    const onInput = (e) => {
      computedValue.value = e.target.value
    }

    const genInputField = (textClassColor, textCssColor) => {
      return h('input', {
        class: {
          'v-text-field__input': true,
          ...(!attrs.disabled && textClassColor),
        },
        style: {
          ...(!attrs.disabled ? textCssColor : {}),
        },
        disabled: attrs.disabled,
        type: attrs.type || 'text',
        placeholder: attrs.placeholder,
        readonly: attrs.readonly,
        autocomplete: attrs.autocomplete,
        value: computedValue.value,
        onInput,
        onFocus,
        onBlur,
        onChange,
      })
    }

    const genTextFieldWrapper = (clsColor, cssColor) => {
      return h('div', {
          class: classes.value,
        },
        genInputField(clsColor, cssColor),
      )
    }

    return () => h(VInput, {
      value: computedValue.value,
      rules: props.rules,
      ref: inputRef,
      onClear: () => emit('update:modelValue', undefined)
    }, {
      ['text-field']: ({ textClassColor, textCssColor }) => {
        return genTextFieldWrapper(textClassColor, textCssColor)
      },
      ...(slots['prepend-icon'] ? {['prepend-icon']: () => slots['prepend-icon']?.()} : {}),
      ...(slots['append-icon'] ? {['append-icon']: () => slots['append-icon']?.()} : {}),
    })
  },
})
