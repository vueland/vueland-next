import './VForm.scss'

import { defineComponent, h, renderSlot } from 'vue'

export const VForm = defineComponent({
  name: 'v-form',

  setup(_, { slots }) {

    const validate = () => {
      const promises: boolean[] = []

      const fields = document.getElementsByClassName('v-validatable')

      Array.prototype.forEach.call(fields, it => {
        // tslint:disable-next-line:no-shadowed-variable
        const { validate } = it.__vueParentComponent.vnode.el.__vnode.props
        promises.push(validate())
      })

      return Promise.resolve(!promises.some(f => !f))
    }

    const genSlot = () => {
      return renderSlot(slots, 'default', {
        validate
      })
    }

    return () => h('div',
      {
        class: {
          'v-form': true
        },
      }, genSlot()
    )
  }
})
