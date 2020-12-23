// Styles
import './VSelectList.scss'

// Vue API
import { h, defineComponent, withDirectives, vShow } from 'vue'

// Components
import { VList, VListItem, VListItemTitle } from '../VList'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useTransition } from '../../effects/use-transition'
import { useElevation } from '../../effects/use-elevation'

// Types
import { VNode } from 'vue'

export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    elevation: {
      type: [String, Number],
      default: 4,
    },
  } as any,

  setup(props, { emit }) {
    const { isActive } = useToggle(props, 'active')
    const { elevationClasses } = useElevation(props)

    function genItems(): VNode[] {
      const key = props.valueKey

      return props.items!.map((it: any) => {
        const item = h(VListItemTitle, {}, {
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

    function genSelectList(): VNode {
      const listVNode = h(VList, {
          class: 'v-select--items-list',
        }, { default: () => genItems() },
      )

      return withDirectives(
        h('div', {
          class: {
            'v-select-list': true,
            ...elevationClasses.value,
          },
        }, listVNode),
        [[vShow, isActive.value]],
      )
    }

    return () => useTransition(genSelectList(), 'fade')
  },
})
