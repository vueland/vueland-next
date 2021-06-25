// Styles
import './VAutocomplete.scss'

// Vue API
import { h, ref, reactive, computed, defineComponent } from 'vue'

// Effects
import { validateProps } from '../../effects/use-validate'
import { useColors } from '../../effects/use-colors'
import { useTheme } from '../../effects/use-theme'

// Types
import { VNode } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from '../VSelect'
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
    modelValue: {
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    ...validateProps(),
  } as any,

  emits: [
    'input',
    'blur',
    'focus',
    'select',
    'update:modelValue',
    'update:value'
  ],

  setup(props, { emit }): () => VNode {
    const state: SelectState = reactive({
      focused: false,
      isMenuActive: false,
      search: ''
    })

    const { setTextColor } = useColors()
    const { base } = useTheme()
    const inputRef = ref(null)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused
    }))

    const valueProperty = computed<any>(() => {
      return props.modelValue || props.value
    })

    const inputValue = computed<string>(() => {
      return props.valueKey
        ? valueProperty.value[props.valueKey]
        : valueProperty.value
    })

    const isListItemsExists = computed<boolean>(() => {
      return !!props.items && !!props.items.length
    })

    state.search = valueProperty.value ? inputValue.value : ''

    function onFocus() {
      state.focused = true
      state.isMenuActive = isListItemsExists.value
      emit('focus')
    }

    function onBlur() {
      if (!valueProperty.value) state.search = ''

      if (!state.search && valueProperty.value) {
        state.search = inputValue.value
      }
      state.focused = false
      emit('blur')
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
    }

    function onSelect(it) {
      state.search = props.valueKey ? it[props.valueKey] : it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    function genInput(): VNode {
      const propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputRef,
        class: 'v-autocomplete__input',
        onInput,
        onFocus
      }

      return h('input', setTextColor(props.dark ? 'white' : base, propsData))
    }

    function genAutocompleteList(): VNode {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor,
        onSelect
      }
      return h(VSelectList, propsData)
    }

    function genMenu() {
      return h(
        VMenu,
        {
          activator: inputRef,
          openOnClick: true,
          maxHeight: 240,
          bottom: true,
          onClose: () => onBlur()
        },
        {
          default: genAutocompleteList
        }
      )
    }

    function genAutocomplete(): VNode {
      return h('div', { class: classes.value }, [genInput(), genMenu()])
    }

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!valueProperty.value || !!state.search,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        color: props.color,
        rules: props.rules,
        value: valueProperty.value || state.search,
        onClear
      }

      return h(VInput, propsData, {
        textField: () => genAutocomplete()
      })
    }
  }
})
