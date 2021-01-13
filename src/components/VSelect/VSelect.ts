// Styles
import './VSelect.scss'

// Vue API
import {
  h,
  reactive,
  computed,
  defineComponent,
  withDirectives,
  watch,
  inject,
  onBeforeUnmount,
} from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { VNode, Ref } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from './VSelectList'

// Directives
import { clickOutside } from '../../directives'

type SelectState = {
  selected: any | null
  focused: boolean
  isMenuActive: boolean
}

export const VSelect = defineComponent({
  name: 'v-select',

  emits: [
    'input',
    'blur',
    'focus',
    'select',
    'update:modelValue',
    'update:value',
  ],

  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    readonly: Boolean,
    typeable: Boolean,
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps(),
  } as any,

  setup(props, { emit }): () => VNode {
    const state: SelectState = reactive({
      selected: null,
      focused: false,
      isMenuActive: false,
    })

    const { setTextColor } = useColors()

    const {
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState,
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = props.rules && inject('fields')

    const validateValue = () => {
      return props.rules?.length && validate(state.selected || props.modelValue)
    }

    const directive = computed(() => {
      return state.focused
        ? {
          handler: onBlur,
          closeConditional: true,
        }
        : undefined
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--readonly': props.readonly && !props.typeable,
      'v-select--focused': state.focused,
      'v-select--typeable': props.typeable,
      ...validateClasses.value,
    }))

    watch(
      () => props.modelValue || props.value,
      value => (state.selected = value),
      { immediate: true },
    )

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function toggleState() {
      state.focused = !state.focused
      state.isMenuActive = !state.isMenuActive
    }

    function onBlur() {
      toggleState()
      requestAnimationFrame(validateValue)
      emit('blur')
    }

    function onClick() {
      dirty()
      update(errorState.innerError)
      toggleState()
      emit('focus')
    }

    function onInput(e) {
      if (!state.isMenuActive && props.items.length) {
        state.isMenuActive = true
      }
      state.selected = e.target.value
      emit('update:modelValue', state.selected)
      emit('update:value', state.selected)
      emit('input', state.selected)
    }

    function onClear() {
      selectItem('')
      requestAnimationFrame(validateValue)
    }

    function selectItem(it) {
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    function genInput(): VNode {
      const selectedValue = state.selected
        ? props.valueKey
          ? state.selected[props.valueKey]
          : state.selected
        : ''

      const color = props.dark ? 'white' : ''

      const propsData = {
        value: selectedValue,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        class: {
          'v-select__input': true,
        },
        onClick,
        onInput,
      }
      return h('input', setTextColor(color, propsData))
    }

    function genSelectList(): VNode {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : '',
        listColor: props.listColor,
        onSelect: it => selectItem(it),
      }
      return h(VSelectList, propsData)
    }

    function genSelect(): VNode {
      const selectVNode = h(
        'div',
        {
          class: classes.value,
        },
        [genInput(), props.items && genSelectList()],
      )

      return withDirectives(selectVNode, [[clickOutside, directive.value]])
    }

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields!.value = fields!.value.filter(v => v !== validateValue)
      }
    })

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: props.valueKey
          ? !!state.selected ? !!state.selected[props.valueKey]
            : !!state.selected : false,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        onClear,
      } as any

      return h(VInput, propsData, {
        select: () => genSelect(),
      })
    }
  },
})
