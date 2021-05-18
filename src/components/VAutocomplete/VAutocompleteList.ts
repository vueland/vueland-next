// Styles
import './VAutocompleteList.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Components
import { VList, VListItem, VListItemTitle } from '../VList'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { VNode } from 'vue'

export const VAutocompleteList = defineComponent({
  name: 'v-autocomplete-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: String,
    elevation: {
      type: [String, Number],
      default: 4,
    },
    ...colorProps(),
  } as any,
  emits: ['select'],

  setup(props, { emit }) {
    const { setTextColor, setBackground } = useColors()

    function genItems(): VNode[] {
      const key = props.valueKey

      const propsData = {
        class: {},
        style: {},
      }

      return props.items!.map((it: any) => {
        const item = h(
          VListItemTitle,
          props.color ? setTextColor(props.color, propsData) : propsData,
          {
            default: () => (key ? it[key] : it),
          }
        )

        return h(
          VListItem,
          {
            key: props.idKey,
            onClick: () => emit('select', it),
          },
          {
            default: () => item,
          }
        )
      })
    }

    function genAutocompleteListItems(): VNode {
      return h(
        VList,
        {
          class: 'v-autocomplete--items-list',
        },
        { default: () => genItems() }
      )
    }

    function genList(): VNode {
      const propsData = {
        class: {
          'v-autocomplete-list': true,
        },
        style: {},
      }

      return h(
        'div',
        props.listColor ? setBackground(props.listColor, propsData) : propsData,
        genAutocompleteListItems()
      )
    }

    return () => genList()
  },
})
