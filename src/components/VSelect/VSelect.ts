// Styles
import './VSelect.scss'

// Vue API
import {
  h,
  reactive,
  computed,
  defineComponent,
  watch,
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

  setup(props, { emit, attrs }): () => VNode {
    const state: SelectState = reactive({
      selected: null,
      focused: false,
    })

    const { setTextColor } = useColors()
    const { base } = useTheme()
    const {
      validate,
      dirty,
      update,
      errorState,
      validationState,
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = props.rules && inject('fields')

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
      (value) => {
        state.selected = value
        !state.focused &&
          errorState.isDirty &&
          props.rules?.length &&
          validateValue()
      },
      { immediate: true }
    )

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function validateValue() {
      return props.rules?.length && validate(computedInputValue.value)
    }

    function toggleState() {
      state.focused = !state.focused
    }

    function onBlur() {
      setTimeout(() => {
        requestAnimationFrame(validateValue)
        toggleState()
        emit('blur')
      })
    }

    function onClick() {
      dirty()
      update(errorState.innerError)
      toggleState()
      emit('focus')
    }

    function onClear() {
      state.selected = ''
      requestAnimationFrame(validateValue)
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

    function genSelect(): VNode {
      const propsData = {
        class: classes.value,
      }

      return h('div', propsData, genInput())
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
        hasState: !!computedInputValue.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        disabled: props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        clearable: props.clearable,
        onClear,
        ...attrs,
      } as any

      const menuContent = {
        activator: genSelect,
        content: () => props.items && genSelectList(),
      }

      return h(VInput, propsData, {
        select: () =>
          h(
            VMenu,
            {
              openOnClick: true,
              maxHeight: 240,
              onClose: onBlur,
            },
            menuContent
          ),
      })
    }
  },
})
