// Styles
import './VAutocompleteList.scss'

// Vue API
import { h, defineComponent, withDirectives, vShow } from 'vue'

// Components
import { VList, VListItem, VListItemTitle } from '../VList'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useTransition } from '../../effects/use-transition'
import { useElevation } from '../../effects/use-elevation'
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

  setup(props, { emit }) {
    const { isActive } = useToggle(props, 'active')
    const { elevationClasses } = useElevation(props)
    const { setTextColor, setBackground } = useColors()

    function genItems(): VNode[] {
      const key = props.valueKey

      const propsData = {
        class: {},
        style: {},
      }

      return props.items!.map((it: any) => {
        const item = h(VListItemTitle,
          props.color ? setTextColor(props.color, propsData) : propsData,
          {
            default: () => (key ? it[key] : it),
          },
        )

        return h(VListItem, {
            key: props.idKey,
            onClick: () => emit('select', it),
          }, {
            default: () => item,
          },
        )
      })
    }

    function genAutocompleteListItems(): VNode {
      return h(VList, {
          class: 'v-select--items-list',
        }, { default: () => genItems() },
      )
    }

    function genList(): VNode {
      const propsData = {
        class: {
          'v-select-list': true,
          ...elevationClasses.value,
        },
        style: {},
      }

      return withDirectives(h('div',
        props.listColor ? setBackground(props.listColor, propsData) : propsData,
        genAutocompleteListItems(),
      ), [[vShow, isActive.value]])
    }

    return () => useTransition(genList(), 'fade')
  },
})
