// Styles
import './VList.scss'

// Vue API
import { h, ref, defineComponent, Ref } from 'vue'

// Effects
import { useGroup } from '../../effects/use-group'

// Types
import { Group } from '../../../types'

export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const groups: Ref<Group[]> = ref([])
    const { provideGroup } = useGroup()

    provideGroup('list-groups', {
      groups,
      listClick
    })

    function listClick(listGroup) {
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
          'v-list': true
        }
      }

      return h('div', dataProps, slots.default && slots.default())
    }
  }
})
