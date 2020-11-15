// Styles
import './VSelect.scss'

// Vue API
import { h, reactive, withDirectives, defineComponent, watch, vShow } from 'vue'

// Effects
import { validateProps, useValidate } from '../../effects/use-validate'
import { transitionProps, useTransition } from '../../effects/use-transition'

// Components
import { VInput } from '../VInput'
import {
  VList,
  VListItem,
  VListItemTitle
} from '../VList'

const vSelectProps = {
  label: String,
  items: Array,
  valueKey: String,
  idKey: String,
  modelValue: Array,
  ...validateProps(),
  ...transitionProps()
}

type SelectState = {
  selected: object | string | number
  focused: boolean,
  items: any[]
}

export const VSelect = defineComponent({
  name: 'v-select',
  props: vSelectProps,

  setup(props, { emit }) {

    const state: SelectState = reactive({
      selected: '',
      focused: false,
      items: []
    })

    const {
      validate,
      dirty,
      update,
      errorState,
      computedColor,
      validateClasses,
      validationState,
    } = useValidate(props)

    watch(
      () => props.modelValue,
      value => {
        state.selected = value as any
        if (!value) return validateValue()
      },
    )

    const validateValue = () => {
      props.rules?.length && validate(state.selected || props.modelValue)
    }

    const onFocus = () => {
      state.focused = true
    }

    const onBlur = () => {
      setTimeout(() => {
        state.focused = false
      }, 150)
    }

    const onClick = () => {
      emit('click')
    }

    const selectItem = (it) => {
      state.selected = it
      emit('click', it)
    }

    const genInput = () => {
      return h('input', {
        value: state.selected[props.valueKey as string] || state.selected,
        class: {
          'v-select__input': true
        },
        onFocus,
        onBlur,
        onClick
      })
    }

    const genItems = () => {
      const key = props.valueKey

      return props.items!.map((it: any) => {
        const item = h(
          VListItemTitle,
          {},
          {
            default: () => key ? it[key] : it
          }
        )

        return h(VListItem, {
          onClick: () => selectItem(it)
        }, {
          default: () => item
        })
      })
    }

    const genSelectList = () => {
      return withDirectives(h('div', {
        class: {
          'v-select__list': true
        }
      }, h(VList, {
        elevation: 3
      }, {
        default: () => genItems()
      })), [[vShow, state.focused]])
    }

    const genSelect = () => {
      const transitionedList = useTransition(
        { transition: 'fade' }, genSelectList()
      )
      return h('div', {
        class: {
          'v-select': true
        }
      }, [
        genInput(),
        transitionedList
      ])
    }

    return () => h(VInput, {
      label: props.label,
      focused: state.focused || !!state.selected
    }, {
      select: () => props.items?.length ? genSelect() : null
    })
  }
})
