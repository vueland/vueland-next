// Styles
import './VSelect.scss'

// Vue API
import {
  h,
  reactive,
  computed,
  defineComponent,
  watch,
  inject
} from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { Props } from '../../types'
import { Ref } from 'vue'

// Components
import { VInput } from '../VInput'
import { VSelectList } from './VSelectList'

const vSelectProps: Props = {
  label: String,
  items: Array,
  dark: Boolean,
  valueKey: String,
  idKey: String,
  disabled: Boolean,
  readonly: Boolean,
  modelValue: [Array, String, Object],
  ...validateProps(),
  ...colorProps()
}

type SelectState = {
  selected: object | string | number
  focused: boolean
}

export const VSelect = defineComponent({
  name: 'v-select',
  props: vSelectProps,

  setup(props, { emit }) {

    const state: SelectState = reactive({
      selected: '',
      focused: false
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
      props.rules?.length && validate(state.selected || props.modelValue)
    }

    watch(
      () => props.modelValue,
      value => {
        state.selected = value as any
      }, { immediate: true }
    )

    if (fields!.value && props.rules?.length) {
      fields!.value.push(validateValue)
    }

    const onFocus = () => {
      dirty()
      update(errorState.innerError)
      state.focused = true
      emit('focus')
    }

    const onBlur = () => {
      setTimeout(() => {
        state.focused = false
        emit('blur')
        validateValue()
      }, 130)
    }

    // const clickOutside = () => {
    //
    // }

    const onClick = () => {
      if (props.readonly) {
        state.focused = true
      }
      emit('click')
    }

    const selectItem = (it) => {
      state.selected = it
      emit('select', it)
      emit('update:modelValue', it)
    }

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-select': true,
        'v-select--disabled': props.disabled,
        'v-select--focused': state.focused,
        ...validateClasses.value
      }
    })

    const genInput = () => {
      const inputProps = {
        value: state.selected && state.selected[props.valueKey as string],
        disabled: props.disabled,
        readonly: props.readonly,
        class: {
          'v-select__input': true
        },
        onFocus,
        onBlur,
        onClick
      }
      return h('input', setTextColor(computedColor.value!, inputProps))
    }

    const genSelectList = () => {
      return h(VSelectList, {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.focused,
        onSelect: it => selectItem(it)
      })
    }

    const genSelect = () => {
      return h('div', {
          class: classes.value
        },
        [
          genInput(),
          genSelectList()
        ])
    }

    return () => h(VInput, {
      label: props.label,
      focused: state.focused,
      hasState: !!state.selected,
      hasError: errorState.innerError,
      dark: !!props.dark,
      color: validationState.value,
      disabled: !!props.disabled,
      isDirty: !!errorState.isDirty,
      message: errorState.innerErrorMessage,
    } as Props, {
      select: () => props.items?.length ? genSelect() : null
    })
  }
})
