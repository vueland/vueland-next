// Vue API
import { h, reactive, computed, defineComponent, onBeforeMount } from 'vue'

// Effects
import { validationProps } from '../../composables/use-validation'
import { useColors } from '../../composables/use-colors'
import { useActivator } from '../../composables/use-activator'

// Types
import { VNode } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from '../VSelect'
import { VMenu } from '../VMenu'

// Helpers
import { getKeyValueFromTarget } from '../../helpers'

type SelectState = {
  focused: boolean
  isMenuActive: boolean
  search: string
}

export default defineComponent({
  name: 'v-autocomplete',
  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    typeable: Boolean,
    loading: Boolean,
    activeClass: {
      type: String,
      default: 'primary white--text'
    },
    color: {
      type: String,
      default: '',
    },
    ...validationProps(),
  } as any,

  emits: [
    'input',
    'blur',
    'focus',
    'select',
    'clear',
    'update:modelValue',
    'update:value',
  ],

  setup(props, { emit }): () => VNode {
    const state: SelectState = reactive({
      focused: false,
      isMenuActive: false,
      search: '',
    })

    const { setTextCssColor, setTextClassNameColor } = useColors()
    const { activatorRef } = useActivator(props)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const inputValue = computed<string>(() => {
      return props.valueKey && props.modelValue
        ? getKeyValueFromTarget(props.valueKey, props.modelValue)
        : props.modelValue
    })

    const onFocus = () => {
      state.focused = true
      state.isMenuActive = true

      emit('focus')
    }

    const onBlur = () => {
      if (!props.modelValue && !state.search) {
        state.search = ''
      }

      if (!state.search && props.modelValue) {
        state.search = inputValue.value
      }

      state.focused = false
      emit('blur')
    }

    const onInput = (e) => {
      state.search = e.target.value

      state.isMenuActive = true

      emit('input', e.target.value)
    }

    const onClear = () => {
      state.search = ''

      emit('update:modelValue', undefined)
      emit('clear')
    }

    const onSelect = (it) => {
      state.search = props.valueKey
        ? getKeyValueFromTarget(props.valueKey, it)
        : it

      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    const genInput = (): VNode => h('input', {
      value: state.search,
      disabled: props.disabled,
      readonly: props.readonly && !props.typeable,
      class: 'v-autocomplete__input',
      onInput,
      onFocus,
      onBlur,
    })

    const genAutocompleteList = (): VNode => {
      return h(VSelectList, {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor,
        selected: props.modelValue,
        activeClass: props.activeClass,
        onSelect,
      })
    }

    const genMenu = (): VNode => h(VMenu, {
        activator: activatorRef.value!,
        openOnClick: true,
        maxHeight: 240,
        bottom: props.typeable,
        inputActivator: '.v-input__text-field',
        internalActivator: true,
        onShow: () => activatorRef.value?.onFocus(),
        onHide: () => {
          state.isMenuActive = false
          activatorRef.value?.onBlur()
        },
      },
      {
        default: genAutocompleteList,
      },
    )

    const genAutocomplete = (): VNode => h('div', {
        class: classes.value,
        style: styles.value,
      },
      [
        genInput(),
        activatorRef.value && genMenu(),
      ],
    )

    onBeforeMount(() => {
      state.search = inputValue.value
    })

    return () => h(VInput, {
      label: props.label,
      focused: state.isMenuActive,
      hasState: !!state.search,
      dark: props.dark,
      disabled: props.disabled,
      clearable: props.clearable,
      color: props.color,
      rules: props.rules,
      ref: activatorRef,
      modelValue: props.modelValue || state.search,
      onClear,
    }, {
      'text-field': () => genAutocomplete(),
    })
  },
})
