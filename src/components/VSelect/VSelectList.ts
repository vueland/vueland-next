// Styles
import './VSelectList.scss'

// Vue API
import { h, defineComponent, withDirectives, vShow } from 'vue'

// Components
import { VList, VListItem, VListItemTitle } from '../VList'
import { VFadeTransition } from '../transitions'

// Effects
import { useToggle } from '@/effects/use-toggle'

const vSelectListProps = {
  items: Array,
  valueKey: String,
  idKey: String,
  active: Boolean
}

export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: vSelectListProps,

  setup(props, { emit }) {

    const { isActive } = useToggle(props, 'active')

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
          key: props.idKey,
          onClick: () => emit('select', it)
        }, {
          default: () => item
        })
      })
    }

    const genSelectList = () => {
      return withDirectives(h('div', {
        class: {
          'v-select-list': true
        }
      }, h(VList, {}, {
        default: () => genItems()
      })), [[vShow, isActive.value]])
    }

    return () => VFadeTransition(genSelectList())
  }
})
