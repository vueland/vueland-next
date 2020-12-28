// Styles
import './VTextField.scss'

// Vue API
import {
  h,
  inject,
  watch,
  computed,
  reactive,
  defineComponent,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useValidate, validateProps } from '../../effects/use-validate'
import { useColors, colorProps } from '../../effects/use-colors'

// Components
import { VInput } from '../VInput'

// Types
import { VNode, Ref } from 'vue'

type TextFieldState = {
  value: string | number
  focused: boolean
}

export const VTextField = defineComponent({
  name: 'v-text-field',
  emits: [
    'input',
    'focus',
    'blur',
    'change',
    'update:value',
    'update:modelValue'
  ],
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
    tag: {
      type: String,
      default: 'input',
    },
    ...validateProps(),
    ...colorProps(),
  } as any,

  setup(props, { emit, attrs }): () => VNode {
    const state: TextFieldState = reactive({
      value: '',
      focused: false,
    })

    state.value = props.modelValue || props.value

    const fields: Ref<any[]> | undefined =
      props.rules?.length && inject('fields')

    const { setTextColor } = useColors()

    const {
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState,
    } = useValidate(props)

    watch(() => (props.modelValue || props.value), value => {
        state.value = value
        !value && validateValue()
      },
    )

    const classes = computed<Record<string, boolean>>(() => ({
        'v-text-field': true,
        'v-text-field--disabled': props.disabled,
        'v-text-field--dirty': errorState.isDirty,
        'v-text-field--valid': errorState.isDirty && !errorState.innerError,
        'v-text-field--not-valid': errorState.isDirty && !!errorState.innerError,
        ...validateClasses.value,
      }),
    )

    function validateValue(): boolean | void {
      return props.rules?.length && validate(state.value)
    }

    if (fields?.value && props.rules?.length) {
      fields!.value.push(validateValue)
    }

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields.value = fields.value.filter(v => v !== validateValue)
      }
    })

    function focusHandler() {
      dirty()
      update(errorState.innerError)
      state.focused = true
      emit('focus')
    }

    function blurHandler() {
      state.focused = false
      emit('blur', state.value)
      validateValue()
    }

    function changeHandler() {
      emit('change', state.value)
    }

    function inputHandler(e) {
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
        class: {
          'v-text-field__input': true,
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
        onChange: changeHandler,
      }

      if (props.tag === 'input') {
        (propsData as any).type = props.type
      }

      return h(props.tag,
        props.dark
          ? setTextColor('white', propsData)
          : propsData,
      )
    }

    function genTextField(): VNode {
      return h('div', {
          class: classes.value,
        }, genInput(),
      )
    }

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        isDirty: errorState.isDirty,
        disabled: props.disabled,
        message: errorState.innerErrorMessage,
      }

      return h(VInput, propsData, {
          textField: () => genTextField(),
        },
      )
    }
  },
})
