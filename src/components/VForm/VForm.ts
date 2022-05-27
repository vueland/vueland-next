import { defineComponent, provide, h } from 'vue'

export const VForm = defineComponent({
  name: 'v-form',
  setup(_, { slots }) {
    let fields: Array<(...args: any) => Promise<boolean>> = []

    const addFieldValidator = (item) => {
      fields.push(item)
    }

    const removeFieldValidator = (item) => {
      fields = fields.filter((v) => v !== item)
    }

    provide('form', {
      add: addFieldValidator,
      remove: removeFieldValidator,
    })

    const validate = () => {
      const promises: Array<Promise<boolean>> = []

      fields.forEach((v: (...args: any) => Promise<boolean>) => {
        promises.push(v())
      })

      return !promises.some((f) => !f) ? Promise.resolve() : Promise.reject()
    }

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
