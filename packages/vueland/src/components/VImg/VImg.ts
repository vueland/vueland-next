import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-img',
  props: {
    src: {
      type: String,
      default: ''
    },
    lazySrc: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },

  setup(props){
    return () => h('img', {
      class: 'v-img',
      src: props.lazy ? props.lazySrc : props.src,
      alt: props.alt,
      ['data-src']: props.lazy ? props.src : null,
    })
  }
})
