// Styles
import './VList.scss'

// Vue API
import { h, provide, defineComponent } from 'vue'

// Effects
import { useGroup } from '../../effects/use-group'

// Types
import { Group, RefGroup } from '../../../types'
import { Ref } from 'vue'

export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const { provideGroup } = useGroup()

    provideGroup('lists-group', { listClick })
    provideGroup('list-items')

    provide('list-type', {
      isInGroup: false,
      isInNav: false,
      isInList: false,
    })

    function listClick(groups: Ref<Group[]>, listGroup: RefGroup) {
      groups.value.length &&
        groups.value.forEach((group: Group) => {
          if (group.ref === listGroup.ref.value) {
            group.active = !group.active
          }
        })
    }

    return () => {
      const dataProps = {
        class: {
          'v-list': true,
        },
      }

      return h('div', dataProps, slots.default && slots.default())
    }
  },
})
