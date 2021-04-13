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
  focused: boolean
  isMenuActive: boolean
  search: string
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
      focused: false,
      isMenuActive: false,
      search: '',
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

    const inputValue = computed(() => {
      return props.valueKey
        ? computedValue.value[props.valueKey]
        : computedValue.value
    })

    const isListItemsExists = computed<boolean>(() => {
      return !!props.items && !!props.items.length
    })

    state.search = computedValue.value ? inputValue.value : ''

    watch(
      () => isListItemsExists.value,
      to => {
        if (to && !state.isMenuActive && state.focused) {
          state.isMenuActive = true
        }
      },
    )

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    function validateValue() {
      console.log(validate(state.search), state.search)
      return props.rules?.length && validate(state.search)
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
      if (!computedValue.value) {
        state.search = ''
      }
      if (!state.search && computedValue.value) {
        requestAnimationFrame(() => {
          state.search = inputValue.value
        })
      }

      setTimeout(validateValue)

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
      requestAnimationFrame(validateValue)
    }

    function onSelect(it) {
      if (props.valueKey) {
        state.search = it[props.valueKey]
      } else {
        state.search = it
      }
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
      requestAnimationFrame(validateValue)
    }

    function genInput(): VNode {
      const color = props.dark ? 'white' : ''

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
        onSelect,
      }
      return withDirectives(h(VAutocompleteList, propsData), [
        [clickOutside, directive.value],
      ])
    }

    function genAutocomplete(): VNode {
      return h('div', { class: classes.value }, [
        genInput(),
        props.items && genAutocompleteList(),
      ])
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
        hasState: !!state.search,
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
