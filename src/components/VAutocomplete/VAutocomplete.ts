// Styles
import './VAutocomplete.scss'

// Vue API
import {
  h,
  ref,
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
  isMenuActive: boolean
  input: string
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
      focused: false,
      isMenuActive: false,
      input: '',
    })

    const { setTextColor } = useColors()

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

    const directive = computed(() => {
      return state.isMenuActive && !state.focused
        ? {
          handler: clickOutsideHandler,
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

    const computedValue = computed<any>(() => {
      return props.modelValue || props.value
    })

    const isListItemsExists = computed<boolean>(() => {
      return !!props.items && !!props.items.length
    })

    state.input = props.valueKey ? computedValue.value[props.valueKey] : computedValue.value

    watch(
      () => computedValue.value,
      (to) => {
        state.selected = to
        !state.focused &&
        errorState.isDirty &&
        props.rules?.length &&
        validateValue()
      }, { immediate: true },
    )

    watch(() => isListItemsExists.value, to => {
      if (to && !state.isMenuActive && state.focused) {
        state.isMenuActive = true
      }
    })

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function validateValue() {
      return props.rules?.length && validate(
        props.value ?
          state.selected[props.valueKey] :
          state.selected,
      )
    }

    function clickOutsideHandler() {
      state.focused = false
      state.isMenuActive = false
    }

    function onFocus() {
      state.focused = true
      state.isMenuActive = isListItemsExists.value
      dirty()
      update(errorState.innerError)
      emit('focus')
    }

    function onBlur() {
      if (!state.selected) {
        state.input = ''
      }
      state.focused = false
      emit('blur')
      requestAnimationFrame(validateValue)
    }

    function onInput(e) {
      state.input = e.target.value
      emit('input', e.target.value)
    }

    function onClear() {
      state.input = ''
      state.selected = ''
      requestAnimationFrame(validateValue)
    }

    function selectItem(it) {
      if (props.valueKey) {
        state.input = it[props.valueKey]
      }
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    function genInput(): VNode {

      const color = props.dark ? 'white' : ''

      const propsData = {
        value: state.input,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        class: {
          'v-autocomplete__input': true,
        },
        onInput,
        onFocus,
        onBlur,
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
      return withDirectives(
        h(VAutocompleteList, propsData),
        [[clickOutside, directive.value]],
      )
    }

    function genAutocomplete(): VNode {
      return h(
        'div',
        {
          class: classes.value,
        },
        [
          genInput(),
          props.items && genAutocompleteList(),
        ],
      )
    }

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields!.value = fields!.value.filter(v => v !== validateValue)
      }
    })

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused || state.isMenuActive,
        hasState: !!state.input,
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
