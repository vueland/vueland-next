// Vue API
import { h, ref, reactive, computed, defineComponent, onBeforeMount } from 'vue'

// Effects
import { validationProps } from '../../composable/use-validation'
import { useColors } from '../../composable/use-colors'

// Types
import { VNode } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from '../VSelect'
import { VMenu } from '../VMenu'
import { VProgressLinear } from '../VProgressLinear'

// Helpers
import { getKeyValueFromTarget } from '../../helpers'

type SelectState = {
  focused: boolean
  isMenuActive: boolean
  search: string
  select: any
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
    modelValue: {
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    ...validationProps(),
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
      select: null,
    })

    const { setTextCssColor, setTextClassNameColor } = useColors()
    const activator = ref(null)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const valueProperty = computed<any>(() => {
      return props.modelValue || props.value
    })

    const inputValue = computed<string>(() => {
      return props.valueKey && valueProperty.value
        ? getKeyValueFromTarget(props.valueKey, valueProperty.value)
        : valueProperty.value
    })

    const onFocus = () => {
      state.focused = true
      state.isMenuActive = true
      emit('focus')
    }

    const onBlur = () => {
      if (!valueProperty.value && !state.search) state.search = ''
      if (!state.search && valueProperty.value) state.search = inputValue.value
      state.focused = false
      emit('blur')
    }

    const onInput = (e) => {
      state.search = e.target.value
      emit('input', e.target.value)
    }

    const onClear = () => {
      state.search = ''
      state.select = null
      emit('select', null)
      emit('update:modelValue', null)
      emit('update:value', null)
    }

    const onSelect = (it) => {
      state.search = props.valueKey
        ? getKeyValueFromTarget(props.valueKey, it)
        : it
      state.select = it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    const genInput = (): VNode => {
      return h('input', {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: activator,
        class: 'v-autocomplete__input',
        onInput,
        onFocus,
        onBlur,
      })
    }

    const genAutocompleteList = (): VNode => {
      return h(VSelectList, {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor,
        select: state.select,
        onSelect,
      })
    }

    const genMenu = (): VNode => {
      return h(
        VMenu,
        {
          activator: activator.value!,
          openOnClick: true,
          maxHeight: 240,
          bottom: true,
          onHide: () => (state.isMenuActive = state.focused),
        },
        {
          default: genAutocompleteList,
        }
      )
    }

    const genLinearProgress = (): VNode => {
      return h(
        'div',
        {
          class: { 'v-autocomplete__loading': true },
        },
        h(VProgressLinear, {
          height: 2,
          indeterminate: true,
          color: props.color,
          backgroundColor: props.color,
        })
      )
    }

    const genAutocomplete = (): VNode => {
      return h(
        'div',
        {
          class: classes.value,
          style: styles.value,
        },
        [
          genInput(),
          props.loading && genLinearProgress(),
          activator.value && genMenu(),
        ]
      )
    }

    onBeforeMount(() => {
      state.select = valueProperty.value
      state.search = inputValue.value
    })

    return () => {
      const propsData = {
        label: props.label,
        focused: state.isMenuActive,
        hasState: !!state.search,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        color: props.color,
        rules: props.rules,
        value: valueProperty.value || state.search,
        onClear,
      }

      return h(VInput, propsData, {
        'text-field': () => genAutocomplete(),
      })
    }
  },
})
