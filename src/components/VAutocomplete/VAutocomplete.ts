// Styles
import './VAutocomplete.scss'

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
import { VAutocompleteList } from './VAutocompleteList'

// Directives
import { clickOutside } from '../../directives'

type SelectState = {
  selected: any | null
  focused: boolean
  input: string | number
  isMenuActive: boolean
}

export const VAutocomplete = defineComponent({
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
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps(),
  } as any,

  setup(props, { emit }): () => VNode {
    const state: SelectState = reactive({
      selected: null,
      input: '',
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
      return props.rules?.length && validate(state.selected)
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
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused,
      ...validateClasses.value,
    }))

    const computedInputValue = computed<string>(() => {
      return state.input ? state.input : state.selected ? props.valueKey ?
        state.selected[props.valueKey] : state.selected : ''
    })

    const computedValue = computed(() => {
      return props.modelValue || props.value
    })

    watch(
      () => computedValue.value,
      value => {
        state.selected = value
        !state.focused &&
        errorState.isDirty &&
        props.rules?.length &&
        validateValue()
      }, { immediate: true },
    )

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function toggleState() {
      state.focused = !state.focused
      state.isMenuActive = !state.isMenuActive
    }

    function onBlur() {
      if (!state.selected) state.input = ''
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
      state.input = e.target.value
      emit('input', state.input)
    }

    function onClear() {
      state.input = ''
      state.selected = ''
      requestAnimationFrame(validateValue)
    }

    function selectItem(it) {
      state.input = ''
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    function genInput(): VNode {

      const color = props.dark ? 'white' : ''

      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        class: {
          'v-autocomplete__input': true,
        },
        onClick,
        onInput,
      }
      return h('input', setTextColor(color, propsData))
    }

    function genAutocompleteList(): VNode {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : '',
        listColor: props.listColor,
        onSelect: it => selectItem(it),
      }
      return h(VAutocompleteList, propsData)
    }

    function genAutocomplete(): VNode {
      const selectVNode = h(
        'div',
        {
          class: classes.value,
        },
        [genInput(), props.items && genAutocompleteList()],
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
        hasState: !!computedInputValue.value,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        onClear,
      } as any

      return h(VInput, propsData, {
        select: () => genAutocomplete(),
      })
    }
  },
})
