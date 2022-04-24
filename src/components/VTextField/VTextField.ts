import { defineComponent, h, computed } from 'vue'
import { VInput } from '../VInput'
import { useInputStates } from '../../composable/use-input-states'

export const VTextField = defineComponent({
  name: 'e-text-field',
  components: {
    VInput,
  },
  inheritAttrs: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue', 'input', 'blur', 'focus', 'change'],
  setup(props, { emit, attrs }) {
    const { isReadonly, isDisabled, state, onFocus, onBlur, onChange } =
      useInputStates(props, { emit, attrs })

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

    const onInput = (e) => {
      computedValue.value = e.target.value
    }

    const genInputField = (clsColor, cssColor) => {
      return h('input', {
        class: {
          'v-text-field__input': true,
          ...(!attrs.disabled && clsColor),
        },
        style: {
          ...(!attrs.disabled ? cssColor : {}),
        },
        disabled: attrs.disabled,
        type: attrs.type ? attrs.type : 'text',
        placeholder: attrs.placeholder,
        readonly: attrs.readonly,
        value: computedValue.value,
        onInput,
        onFocus,
        onBlur,
        onChange,
      })
    }

    const genTextFieldWrapper = (clsColor, cssColor) => {
      return h(
        'div',
        {
          class: classes.value,
        },
        genInputField(clsColor, cssColor)
      )
    }

    return () =>
      h(
        VInput,
        {
          focused: state.focused,
          value: computedValue.value,
        },
        {
          ['text-field']: ({ clsColor, cssColor }) => {
            return genTextFieldWrapper(clsColor, cssColor)
          },
        }
      )
  },
})
