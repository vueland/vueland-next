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
import { FaIcons } from '../../services/icons'

export default defineComponent({
  name: 'v-multi-select',
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
  emits: [ 'focus', 'blur', 'change', 'input', 'update:modelValue' ],
  setup(props, { attrs, emit, slots }) {
    const {
      onFocus,
      onBlur,
      isDisabled,
      inputState
    } = useInputStates(props, { attrs, emit })

    const activator = ref(null)
    const { valueKey } = props

    const classes = computed(() => ({
      'v-multi-select': true,
      'v-multi-select--focused': inputState.focused
    }))

    const selectsIndexes = computed(() => {
      return props.modelValue?.reduce((inds, val) => {
        const ind = props.items?.findIndex(it => it === val)

        ind >= 0 && inds.push(ind)

        return inds
      }, [])
    })

    const genItems = () => {
      const itemWrapper = props.chip ? VChip : 'div' as any

      return props.modelValue.reduce((nodes, it, i) => {
        const text = valueKey ? it[valueKey] : it
        const lastSymbol = i < props.modelValue.length - 1 && !props.chip ? ',' : ''

        nodes.push(h(itemWrapper, { class: 'v-multi-select__item' }, { default: () => `${ text }${ lastSymbol }` }))

        return nodes
      }, [] as any[])
    }

    const genItemsWrapper = () => h('div', {
        class: 'v-multi-select__items-wrapper'
      }, {
        default: () => genItems()
      }
    )

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
        class: 'v-multi-select__select-list-slot'
      }, {
        default: () => slots['select-list']?.({ items: props.items })
      })
    }

    const onUpdateSelects = (val) => {
      emit('update:modelValue', val.map(v => props.items[v]))
    }

    const genSelectList = () => {
      return h(VMultiSelectList, {
        class: 'v-multi-select__select-list',
        items: props.items,
        modelValue: selectsIndexes.value,
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

    const genMultiSelect = () => {
      return h('div', {
        class: unref(classes),
      }, {
        default: () => [ genItemsWrapper() ]
      })
    }

    return () => h(VInput, {
      ref: activator,
      focused: inputState.focused,
    }, {
      ['text-field']: () => genMultiSelect(),
      select: () => activator.value ? genSelectMenu() : null,
      ['append-icon']: () => genExpandIcon(),
    })
  }
})
