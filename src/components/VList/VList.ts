// Styles
import './VList.scss'

// Vue API
import { h, ref, provide, defineComponent } from 'vue'

export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const items = ref<any>([])

    function register(group) {
      items.value.push(group)
    }

    function unRegister(group) {
      items.value.filter((it: any) => {
        return it.ref !== group._value
      })
    }

    function listClick(ref) {
      items.value.length &&
      items.value.forEach((group: any) => {
        if (group.ref === ref._value) {
          group.active = !group.active
        }
      })
    }

    provide('groups', { items, register, unRegister, listClick })

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
