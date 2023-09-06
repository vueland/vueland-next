import { computed, defineComponent, h, inject, watch } from 'vue'
// Components
import { VList, VListItem, VListItemTitle } from '../VList'
// Helpers
import { getStringKeysValue } from '../../helpers'
import { V_MENU_PROVIDE_SYMBOL } from '../../constants/provide-keys'

export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: {
      type: Array,
      default: null,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    textColor: {
      type: String,
      default: '',
    },
    valueKey: {
      type: String,
      default: '',
    },
    selected: {
      type: [String, Number, Object],
      default: null,
    },
    activeClass: {
      type: String,
      default: '',
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const menu: any = inject(V_MENU_PROVIDE_SYMBOL, null)

    const computedSelect = computed<Maybe<number>>({
      get() {
        const key = props.valueKey

        const selectedValue = key ? props.selected ? getStringKeysValue(
          key,
          props.selected,
        ) : null : props.selected

        return props.selected ? props.items.findIndex((it) => {
          const itemValue = key ? getStringKeysValue(key, it) : it

          return itemValue === selectedValue
        }) : null
      },

      set(val: number) {
        emit('select', props.items[val])
      },
    })

    const genItems = () => {
      return props.items.reduce((acc, it, i) => {
        const content = props.valueKey ?
          getStringKeysValue(props.valueKey, it) : it as any

        (acc as any[]).push(
          h(VListItem, { key: i }, {
            default: () => h(VListItemTitle, {}, {
              default: () => content,
            }),
          }))

        return acc
      }, [])
    }

    const genItemsList = () => h(VList, {
      value: computedSelect.value as number,
      active: true,
      activeClass: props.activeClass,
      ['onUpdate:value']: val => computedSelect.value = val,
    }, {
      default: () => genItems(),
    })

    watch(() => props.items?.length, () => {
      menu.updateDimensions()
    }, { immediate: true })

    return () => h('div', {
      class: 'v-select-list',
    }, [props.items ? genItemsList() : null])
  },
})

