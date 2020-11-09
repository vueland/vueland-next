// Styles
import './VList.scss'

// Vue API
import { h, reactive, provide, defineComponent } from 'vue'

export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const groups = reactive({
      all: [],

      register(group) {
        this.all.push(group)
      },

      unRegister(group) {
        this.all.filter(it => {
          return it.ref !== group._value
        })
      },

      listClick(ref) {
        this.all.length &&
        this.all.forEach(group => {
          if (group.ref === ref._value) {
            group.activator = !group.activator
          } else {
            group.activator = false
          }
        })
      },
    })

    provide('groups', groups)

    return () =>
      h(
        'div',
        {
          class: {
            'v-list': true,
          },
        },
        slots.default && slots.default()
      )
  },
})
