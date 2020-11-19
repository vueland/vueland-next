// Styles
import './VForm.scss'

// Vue API
import { defineComponent, h, ref, renderSlot, provide } from 'vue'

// Types
import { Ref } from 'vue'

export const VForm = defineComponent({
  name: 'v-form',

  setup(_, { slots }) {
    const fields: Ref<(() => boolean)[]> = ref([])

    provide('fields', fields)

    const validate = () => {
      const promises: boolean[] = []

      fields.value.forEach(it => {
        promises.push(it())
      })

      console.log(fields.value)

      return Promise.resolve(!promises.some(f => !f))
    }

    const genSlot = () => {
      return renderSlot(slots, 'default', { validate })
    }

    return () =>
      h(
        'div',
        {
          class: {
            'v-form': true,
          },
        },
        genSlot(),
      )
  },
})
