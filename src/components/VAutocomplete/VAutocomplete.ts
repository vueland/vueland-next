// Styles
import './VAutocomplete.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
} from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { colorProps, useColors } from '../../effects/use-colors'
import { useTheme } from '../../effects/use-theme'

// Types
import { VNode, Ref } from 'vue'

// Components
import { VInput } from '../VInput'
import { VAutocompleteList } from './VAutocompleteList'
import { VMenu } from '../VMenu'

type SelectState = {
  focused: boolean
  isMenuActive: boolean
  search: string
}

export const VAutocomplete = defineComponent({
  name: 'v-autocomplete',
  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps(),
  } as any,
  emits: [
    'input',
    'blur',
    'focus',
    'select',
    'update:modelValue',
    'update:value',
  ],

  setup(props, { emit }): () => VNode {
    const state: SelectState = reactive({
      focused: false,
      isMenuActive: false,
      search: '',
    })

    const { setTextColor } = useColors()
    const { base } = useTheme()
    const inputTemplateRef = ref(null)

    const {
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState,
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = props.rules && inject('fields')

    const classes = computed<Record<string, boolean>>(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused,
      ...validateClasses.value,
    }))

    const propValue = computed<any>(() => {
      return props.modelValue || props.value
    })

    const inputValue = computed<string>(() => {
      return props.valueKey ? propValue.value[props.valueKey] : propValue.value
    })

    const isListItemsExists = computed<boolean>(() => {
      return !!props.items && !!props.items.length
    })

    state.search = propValue.value ? inputValue.value : ''

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function validateValue() {
      return props.rules?.length && validate(state.search)
    }

    function onFocus() {
      state.focused = true
      state.isMenuActive = isListItemsExists.value
      dirty()
      update(errorState.innerError)
      emit('focus')
    }

    function onBlur() {
      if (!propValue.value) state.search = ''

      if (!state.search && propValue.value) {
        state.search = inputValue.value
      }

      state.focused = false
      emit('blur')
      setTimeout(validateValue)
    }

    function onInput(e) {
      state.search = e.target.value
      emit('input', e.target.value)
    }

    function onClear() {
      state.search = ''
      emit('select', '')
      emit('update:modelValue', '')
      emit('update:value', '')
      requestAnimationFrame(validateValue)
    }

    function onSelect(it) {
      props.valueKey && (state.search = it[props.valueKey])
      !props.valueKey && (state.search = it)
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
      requestAnimationFrame(validateValue)
    }

    function genInput(): VNode {
      const propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        class: 'v-autocomplete__input',
        onInput,
        onFocus,
        onBlur,
      }

      return h('input', setTextColor(props.dark ? 'white' : base, propsData))
    }

    function genAutocompleteList(): VNode {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : base,
        listColor: props.listColor,
        onSelect,
      }
      return h(VAutocompleteList, propsData)
    }

    function genAutocomplete(): VNode {
      return h('div', { class: classes.value }, genInput())
    }

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields!.value = fields!.value.filter((v) => v !== validateValue)
      }
    })

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.search,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        onClear,
      }

      const menuContent = {
        activator: genAutocomplete,
        default: genAutocompleteList,
      }

      return h(VInput, propsData, {
        select: () =>
          h(
            VMenu,
            {
              openOnClick: true,
              maxHeight: 240,
              onClose: () => onBlur(),
            },
            menuContent
          ),
      })
    }
  },
})
