// Styles
import './VSelect.scss'

// Vue API
import { h, ref, reactive, computed, defineComponent, watch } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'
import { useTheme } from '../../effects/use-theme'

// Types
import { VNode } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from './VSelectList'
import { VMenu } from '../VMenu'

type SelectState = {
  selected: any | null
  focused: boolean
}

export const VSelect = defineComponent({
  name: 'v-select',

  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    modelValue: [Array, String, Object, Number],
    rules: Array,
    value: [String, Number, Object],
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

  setup(props, { emit, attrs }): () => VNode {
    const state: SelectState = reactive({
      selected: null,
      focused: false,
    })

    const { setTextColor } = useColors()
    const { base } = useTheme()

    const inputSlotRef = ref<HTMLElement | null>(null)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--readonly': props.readonly,
      'v-select--focused': state.focused,
    }))

    const computedInputValue = computed<string>(() => {
      return state.selected
        ? props.valueKey
          ? state.selected[props.valueKey]
          : state.selected
        : ''
    })

    const computedValue = computed<any>(() => {
      return props.modelValue || props.value
    })

    watch(
      () => computedValue.value,
      (to) => (state.selected = to),
      { immediate: true }
    )

    function toggleState() {
      state.focused = !state.focused
    }

    function onBlur() {
      setTimeout(() => {
        toggleState()
        emit('blur')
      })
    }

    function onClick() {
      toggleState()
      emit('focus')
    }

    function onClear() {
      state.selected = ''
    }

    function selectItem(item) {
      state.selected = item
      emit('select', item)
      emit('update:value', item)
      emit('update:modelValue', item)
    }

    function genInput(): VNode {
      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        class: 'v-select__input',
        ref: inputSlotRef,
        onClick,
      }
      return h('input', setTextColor(props.dark ? 'white' : base, propsData))
    }

    function genSelectList(): VNode {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.focused,
        color: props.dark ? 'white' : base,
        listColor: props.listColor || 'white',
        onSelect: (item) => selectItem(item),
      }
      return h(VSelectList, propsData)
    }

    function genMenu() {
      return h(
        VMenu,
        {
          activator: inputSlotRef!,
          openOnClick: true,
          maxHeight: 240,
          color: props.listColor,
          onClose: onBlur,
        },
        {
          default: () => genSelectList(),
        }
      )
    }

    function genSelect(): VNode {
      const propsData = {
        class: classes.value,
      }

      return h('div', propsData, [genInput(), genMenu()])
    }

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!computedInputValue.value,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        rules: props.rules,
        value: computedInputValue.value,
        color: props.color,
        onClear,
        ...attrs,
      } as any

      return h(VInput, propsData, {
        textField: () => genSelect(),
      })
    }
  },
})
