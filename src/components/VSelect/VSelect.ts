// Styles
import './VSelect.scss'

// Vue API
import { h, reactive, computed, defineComponent, watch, Ref, inject } from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { Props } from '../../types'

// Components
import { VInput } from '../VInput'
import { VSelectList } from './VSelectList'

const vSelectProps: Props = {
  label: String,
  items: Array,
  valueKey: String,
  idKey: String,
  disabled: Boolean,
  readonly: Boolean,
  modelValue: Array,
  ...validateProps(),

  ...colorProps()
}

type SelectState = {
  selected: object | string | number
  focused: boolean,
  showList: boolean
}

export const VSelect = defineComponent({
  name: 'v-select',
  props: vSelectProps,

  setup(props, { emit }) {

    const state: SelectState = reactive({
      selected: '',
      focused: false,
      showList: false,
    })

    watch(
      () => props.modelValue,
      value => {
        state.selected = value as any
        if (!value) return validateValue()
      },
    )
    const { setTextColor } = useColors()

    const {
      validate,
      // dirty,
      // update,
      // errorState,
      // computedColor,
      // validateClasses,
      // validationState,
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = inject('fields')

    const validateValue = () => {
      props.rules?.length && validate(state.selected || props.modelValue)
    }

    if (fields!.value && props.rules?.length) {
      fields!.value.push(validateValue)
    }

    const onFocus = () => {
      state.focused = true
      state.showList = true
    }

    const onBlur = () => {
      state.focused = false
      state.showList = false
    }

    const onClick = () => {
      if (props.readonly) {
        state.showList = !state.showList
      }
      emit('click')
    }

    const selectItem = (it) => {
      state.selected = it
      emit('click', it)
      requestAnimationFrame(() => state.showList = false)
    }

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-select': true,
        'v-select--disabled': props.disabled,
        'v-select--focused': state.focused
      }
    })

    const genInput = () => {
      const inputProps = {
        value: state.selected[props.valueKey as string] || state.selected,
        disabled: props.disabled,
        readonly: props.readonly,
        class: {
          'v-select__input': true
        },
        onFocus,
        onBlur,
        onClick
      }
      return h('input', setTextColor(props.color, inputProps))
    }

    const genSelectList = () => {
      return h(VSelectList, {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.showList,
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
      color: props.color
    }, {
      select: () => props.items?.length ? genSelect() : null
    })
  }
})
