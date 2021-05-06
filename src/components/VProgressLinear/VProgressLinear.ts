import './VProgressLinear.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

export const VProgressLinear = defineComponent({
  name: 'v-progress-linear',
  props: {
    height: {
      type: [Number, String],
      default: 4
    },
    color: {
      type: String,
      default: 'primary'
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: String,
      default: null
    },
    indeterminate: Boolean,
  },
  setup(props) {
    const {} = useColors()

    function genProgressBuffer() {
      return h('div', {
        class: 'v-progress-linear__buffer'
      })
    }

    function genProgressLinear() {
      return h('div', {
        class: 'v-progress-linear',
        style: {
          height: `${ props.height }px`
        }
      }, genProgressBuffer())
    }

    return () => genProgressLinear()
  }
})
