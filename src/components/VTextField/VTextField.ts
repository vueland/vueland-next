// Styles
import './VTextField.scss'

// Vue API
import { h, watch, computed, reactive, defineComponent } from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'
import { useTheme } from '../../effects/use-theme'

// Components
import { VInput } from '../VInput'

// Types
import { VNode } from 'vue'

type TextFieldState = {
  value: string | number
  focused: boolean
}

export const VTextField = defineComponent({
  name: 'v-text-field',

  props: {
    dark: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    label: String,
    isDirty: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    modelValue: [String, Number, Date],
    value: [String, Number, Date],
    tag: {
      type: String,
      default: 'input',
    },
    ...colorProps(),
  } as any,

  emits: [
    'input',
    'focus',
    'blur',
    'change',
    'clear',
    'update:value',
    'update:modelValue',
  ],

  setup(props, { emit, attrs }): () => VNode {
    const state: TextFieldState = reactive({
      value: '',
      focused: false,
    })

    state.value = props.modelValue || props.value

    const { setTextColor } = useColors()
    const { base } = useTheme()

    const computedValue = computed(() => {
      return props.modelValue || props.value
    })

    watch(
      () => computedValue.value,
      (value) => (state.value = value as any)
    )

    const classes = computed<Record<string, boolean>>(() => ({
      'v-text-field': true,
      'v-text-field--disabled': props.disabled,
    }))

    function onClear() {
      state.value = ''
      emit('update:modelValue', state.value)
      emit('update:value', state.value)
      emit('input', state.value)
      emit('clear', state.value)
    }

    function onBlur() {
      setTimeout(() => {
        state.focused = false
        emit('blur')
      })
    }

    function onFocus() {
      state.focused = true
      emit('focus')
    }

    function onChange() {
      emit('change', state.value)
    }

    function onInput(e) {
      state.value = e.target.value
      emit('update:modelValue', state.value)
      emit('update:value', state.value)
      emit('input', state.value)
    }

    function genInput(): VNode {
      const propsData = {
        disabled: props.disabled,
        readonly: props.readonly,
        value: state.value,
        autocomplete: attrs.autocomplete,
        class: 'v-text-field__input',
        onFocus,
        onBlur,
        onInput,
        onChange,
      } as any

      if (props.tag === 'input') {
        propsData.type = props.type
      }

      return h(props.tag, setTextColor(props.dark ? 'white' : base, propsData))
    }

    function genTextField(): VNode {
      return h('div', { class: classes.value }, genInput())
    }

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.value,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        value: computedValue.value,
        color: props.color,
        onClear,
      }

      return h(VInput, propsData, {
        textField: () => genTextField(),
      })
    }
  },
})
