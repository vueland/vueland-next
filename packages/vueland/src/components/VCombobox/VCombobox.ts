import { PropType, computed, h, defineComponent, ref, unref, VNode } from 'vue'
import { VInput } from '../VInput'
import { VChip } from '../VChip'
import { VMenu } from '../VMenu'
import VMultiSelectList from './VMultiSelectList'

// Composables
import { useInputStates } from '../../composables/use-input-states'
import { validationProps } from '../../composables/use-validation'
import { VProgressCircular } from '../VProgressCircular'
import { VIcon } from '../VIcon'
import { FaIcons } from '@/services/icons'

export default defineComponent({
  name: 'v-combobox',
  props: {
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    chip: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    ...validationProps()
  },
  emits: [ 'update:modelValue' ],
  setup(props, { attrs, emit, slots }) {
    const { onFocus, onBlur, onChange, isDisabled, inputState } = useInputStates(props, { attrs, emit })
    const activator = ref(null)

    const classes = computed(() => ({
      'v-combobox': true,
      'v-combobox--focused': inputState.focused
    }))

    const genItems = () => {
      const itemWrapper = props.chip ? VChip : 'div'

      return props.modelValue.reduce((nodes, it) => {
        const text = props.valueKey ? props.items[it]![props.valueKey] : props.items[it]

        const item = h(itemWrapper as any, {
          class: 'v-combobox__item'
        }, {
          default: () => text
        })

        nodes.push(item)

        return nodes
      }, [] as any[])
    }

    const genItemsWrapper = () => h('div', {
        class: 'v-combobox__items-wrapper'
      }, {
        default: () => genItems()
      }
    )


    const genInput = () => {
      return h('input', {
        class: 'v-combobox__input',
        onFocus,
        onBlur,
        onChange
      })
    }

    const genListPreloader = () => {
      return h('div', {
        class: 'v-select__preloader'
      }, h(VProgressCircular, {
        indeterminate: true,
        width: 2,
        size: 30,
        color: (attrs.color || 'primary') as string
      }))
    }

    const genSelectListSlot = () => {
      return h('div', {
        class: 'v-combobox__select-list-slot'
      }, {
        default: () => slots['select-list']?.({})
      })
    }

    const onUpdateSelects = (val) => {
      emit('update:modelValue', val)
    }

    const genSelectList = () => {
      return h(VMultiSelectList, {
        class: 'v-combobox__select-list',
        items: props.items,
        modelValue: props.modelValue,
        valueKey: props.valueKey,
        ['onUpdate:modelValue']: onUpdateSelects
      })
    }

    const genExpandIcon = (): VNode => {
      return h(VIcon, {
        icon: FaIcons.$chevronDown,
        color: !isDisabled.value ? attrs.color : '',
        size: 16,
      })
    }

    const genSelectMenu = (): VNode => {
      const content = slots['select-list'] ? genSelectListSlot() : genSelectList()

      return h(VMenu, {
        internalActivator: true,
        activator: activator.value!,
        inputActivator: '.v-input__text-field',
        openOnClick: true,
        closeOnClick: false,
        bottom: true,
        maxHeight: 240,
        zIndex: 12,
        onShow: onFocus,
        onHide: onBlur,
      }, {
        default: () => props.loading ? genListPreloader() : content
      })
    }

    const genComboBox = () => {
      return h('div', {
        class: unref(classes),
      }, {
        default: () => [ genItemsWrapper(), genInput() ]
      })
    }

    return () => h(VInput, {
      ref: activator,
      focused: inputState.focused,
    }, {
      ['text-field']: () => genComboBox(),
      select: () => activator.value ? genSelectMenu() : null,
      ['append-icon']: () => genExpandIcon(),
    })
  }
})
