import { defineComponent, h, computed } from 'vue'
// Components
import { VList, VListItem, VListItemTitle } from '../VList'
// Helpers
import { getStringKeysValue } from '../../helpers'
// Types
import { Maybe } from '../../../types/base'

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

    const genItemsList = () => {
      return h(VList, {
        active: true,
        color: '#ffffff',
        activeClass: props.activeClass,
        ['onUpdate:value']: val => computedSelect.value = val,
      }, {
        default: () => genItems(),
      })
    }

    return () => h('div', {
      class: 'v-select-list',
    }, [props.items ? genItemsList() : null])
  },
})

