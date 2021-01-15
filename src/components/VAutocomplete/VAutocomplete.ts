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

    const computedInputValue = computed<string>(() => {
      return state.selected ? props.valueKey ?
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

    function validateValue() {
      return props.rules?.length && validate(
        computedInputValue.value[props.valueKey]
        || computedInputValue.value,
      )
    }

    function clickOutsideHandler() {
      state.focused = false
      state.isMenuActive = false
      requestAnimationFrame(validateValue)
    }

    function onClick() {
      state.isMenuActive = !!props.items && !!props.items.length
      dirty()
      update(errorState.innerError)
    }

    function onFocus() {
      state.focused = true
      emit('focus')
    }

    function onBlur() {
      state.focused = false
      emit('blur')
      requestAnimationFrame(validateValue)
    }

    function onInput(e) {
      setUpdatedValue(e.target.value)
      emit('update:modelValue', state.selected)
      emit('update:value', state.selected)
      emit('input', state.selected)
    }

    function onClear() {
      setUpdatedValue('')
      emit('update:modelValue', state.selected)
      emit('update:value', state.selected)
      requestAnimationFrame(validateValue)
    }

    function selectItem(it) {
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
      emit('update:value', it)
    }

    function setUpdatedValue(value) {
      if (props.valueKey && state.selected) {
        state.selected[props.valueKey] = value
      } else {
        state.selected = value
      }
    }

    function genInput(): VNode {

      const color = props.dark ? 'white' : ''

      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        class: {
          'v-autocomplete__input': true,
        },
        onClick,
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
