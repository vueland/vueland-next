// Styles
import './VList.scss'

// Vue API
import { h, ref, provide, defineComponent } from 'vue'

// Types
import { ListGroup } from '../../types'


export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const groups = ref<ListGroup[]>([])

    function register(group) {
      groups.value.push(group)
    }

    function unRegister(group) {
      groups.value.filter((it: ListGroup) => {
        return it.ref !== group.value
      })
    }

    function listClick(ref) {
      groups.value.length &&
      groups.value.forEach((group: ListGroup) => {
        if (group.ref === ref.value) {
          group.active = !group.active
        }

        console.log((groups.value[0].ref as any))
      })
    }

    provide('groups', {
      groups,
      register,
      unRegister,
      listClick,
    })

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
