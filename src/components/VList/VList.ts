// Styles
import './VList.scss'

// Vue API
import {
  h,
  reactive,
  provide,
  defineComponent,
} from 'vue'


export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {

    const groups = reactive({
      all: [],

      register(group) {
        this.all.push(group)
      },

      listClick(ref) {
        this.all.length &&
        this.all.forEach(group => {
          group.activator = group.ref === ref._value
        })
      }
    })

    provide('groups', groups)

    return () => h('div', {
      class: {
        'v-list': true
      }
    }, slots.default && slots.default())
  },
})
