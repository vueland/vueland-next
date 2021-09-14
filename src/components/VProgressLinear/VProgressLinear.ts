import './VProgressLinear.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

export const VProgressLinear = defineComponent({
  name: 'v-progress-linear',
  props: {
    value: {
      type: [ String, Number ],
      default: null
    },
    modelValue: {
      type: [ String, Number ],
      default: null
    },
    bufferValue: {
      type: [ String, Number ],
      default: null
    },
    height: {
      type: [ Number, String ],
      default: 4
    },
    color: {
      type: String,
      default: 'primary'
    },
    backgroundColor: {
      type: String,
      default: 'primary'
    },
    backgroundOpacity: {
      type: String,
      default: '0.3'
    },
    bufferColor: {
      type: String
    },
    indeterminate: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean
  },
  setup(props) {
    const { setBackground } = useColors()

    function genProgressBar(type = '') {
      const barWidth = props.value || props.modelValue
      const propsData = {
        class: { 'v-progress-linear__bar': true, [type]: !!type },
        style: {
          width: !props.indeterminate ? barWidth + '%' : ''
        }
      }
      return h('div', setBackground(props.color, propsData))
    }

    function genProgressBuffer() {
      const bufferWidth = props.value || props.modelValue

      return h('div', {
        class: {
          'v-progress-linear__buffer': true
        },
        style: {
          width: bufferWidth ? bufferWidth + '%' : ''
        }
      })
    }

    function genProgressBackground() {
      const propsData = {
        class: { 'v-progress-linear__background': true },
        style: {
          opacity: props.backgroundOpacity
        }
      }

      return h('div', setBackground(props.backgroundColor, propsData))
    }

    function genProgressIndeterminate() {
      return h('div', {
        class: { 'v-progress-linear__indeterminate': true }
      }, [
        genProgressBar('long'),
        genProgressBar('short')
      ])
    }

    function genProgressLinear() {
      return h('div',
        {
          class: 'v-progress-linear',
          style: {
            height: `${ props.height }px`
          }
        },
        [
          genProgressBackground(),
          genProgressBuffer(),
          props.indeterminate ? genProgressIndeterminate() : genProgressBar()
        ]
      )
    }

    return () => genProgressLinear()
  }
})
