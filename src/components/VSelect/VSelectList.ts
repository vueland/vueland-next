// Styles
import './VSelectList.scss'

// Vue API
import { h, ref, defineComponent } from 'vue'

// Components
import { VList, VListGroup, VListItem, VListItemTitle } from '../VList'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { VNode } from 'vue'

export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: {
      type: String,
      default: 'white',
    },
    elevation: {
      type: [String, Number],
      default: 4,
    },
    clear: Boolean,
    ...colorProps(),
  } as any,

  emits: ['select'],

  setup(props, { emit }) {
    const { setTextColor, setBackground } = useColors()

    const selected = ref<any>(null)

    function genItems(): VNode[] {
      const key = props.valueKey

      const propsData = {
        class: {},
        style: {},
      }

      return props.items?.map((it: any) => {
        const color = props.dark ? 'white' : ''

        const item = h(
          VListItemTitle,
          setTextColor(color, propsData),
          {
            default: () => (key ? it[key] : it),
          }
        )

        return h(
          VListItem,
          {
            key: props.idKey,
            onClick: () => {
              selected.value = it
              emit('select', it)
            },
          },
          {
            default: () => item,
          }
        )
      })
    }

    function genSelectListItems(): VNode {
      return h(VList, {}, { default: () => genItemsGroup() })
    }

    function genItemsGroup(): VNode {
      return h(VListGroup, {
        color: props.color,
        noAction: true
      }, { default: () => genItems() })
    }

    function genList(): VNode {
      const propsData = {
        class: { 'v-select-list': true },
        style: {},
      }

      return h(
        'div',
        props.listColor ? setBackground(props.listColor, propsData) : propsData,
        genSelectListItems()
      )
    }

    return () => genList()
  },
})
