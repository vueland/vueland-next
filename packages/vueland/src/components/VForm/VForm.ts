import { defineComponent, provide, h } from 'vue'

export default defineComponent({
  name: 'v-form',
  setup(_, { slots }) {
    let fields: Array<(...args: any) => Promise<boolean>> = []

    const addFieldValidator = (item) => {
      fields.push(item)
    }

    const removeFieldValidator = (item) => {
      fields = fields.filter((v) => v !== item)
    }

    const validate = () => {
      const promises: Array<Promise<boolean>> = []

      fields.forEach((v: (...args: any) => Promise<boolean>) => {
        promises.push(v())
      })

      return !promises.some((f) => !f) ? Promise.resolve() : Promise.reject()
    }

    provide('$v_form', {
      add: addFieldValidator,
      remove: removeFieldValidator,
      validate
    })

    return () => h('form', {
        class: 'v-form',
        onSubmit: (e) => e.preventDefault(),
      },
      {
        default: () => slots.default && slots.default({ validate }),
      },
    )
  },
})
