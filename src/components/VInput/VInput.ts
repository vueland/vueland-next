import './VInput.scss'

import { defineComponent, h } from 'vue'

import { VField } from '../VField'

export const VInput = defineComponent({
  name: 'v-input',
  props: {
    value: {
      type: [Object, Array, Number, String],
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: '',
    },

    required: {
      type: Boolean,
      default: false,
    },

    valid: {
      type: Boolean,
    },
  },

  setup(props, ctx) {

    const genField = () => {
      // @ts-ignore
      return h(VField.setup(props, ctx))
    }


    return () => genField()
  },
})