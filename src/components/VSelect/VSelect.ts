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

  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    disabled: Boolean,
    readonly: Boolean,
    modelValue: [Array, String, Object],
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
      computedColor,
      validateClasses,
      validationState,
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = inject('fields')

    const validateValue = () => {
      return props.rules?.length && validate(state.selected || props.modelValue)
    }

    const directive = computed(() => {
      return state.focused ? {
        handler: onBlur,
        closeConditional: true,
      } : undefined
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--focused': state.focused,
      ...validateClasses.value,
    }))

    watch(
      () => props.modelValue,
      value => (state.selected = value as any),
      { immediate: true },
    )

    if (fields?.value && props.rules?.length) {
      fields!.value.push(validateValue)
    }

    function toggleState() {
      state.focused = !state.focused
      state.isMenuActive = !state.isMenuActive
    }

    function onBlur() {
      toggleState()
      setTimeout(validateValue)
      emit('blur')
    }

    function onClick() {
      dirty()
      update(errorState.innerError)
      toggleState()
      emit('focus')
    }

    function selectItem(it) {
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
    }

    function genInput(): VNode {
      const inputProps = {
        value: state.selected && state.selected[props.valueKey as string],
        disabled: props.disabled,
        readonly: props.readonly,
        class: {
          'v-select__input': true,
        },
        onClick,
      }
      return h('input', setTextColor(computedColor.value!, inputProps))
    }

    function genSelectList(): VNode {
      return h(VSelectList, {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        onSelect: it => selectItem(it),
      })
    }

    function genSelect(): VNode {
      const selectVNode = h('div', {
          class: classes.value,
        },
        [genInput(), genSelectList()],
      )

      return withDirectives(selectVNode, [[clickOutside, directive.value]])
    }

    onBeforeUnmount(() => {
      if (fields!.value) {
        fields!.value = fields!.value.filter(v => v !== validateValue)
      }
    })

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.selected,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
      } as any

      return h(VInput, propsData, {
          select: () => (props.items?.length ? genSelect() : null),
        },
      )
    }

  },
})
