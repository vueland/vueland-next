// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../composables/use-colors'

export default defineComponent({
  name: 'v-progress-linear',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    bufferValue: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [Number, String],
      default: 4,
    },
    color: {
      type: String,
      default: 'primary',
    },
    backgroundColor: {
      type: String,
      default: 'primary',
    },
    backgroundOpacity: {
      type: String,
      default: '0.3',
    },
    indeterminate: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean,
  },
  setup(props) {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()

    const genProgressBar = (type = '') => {
      const barWidth = props.value || props.modelValue

      return h('div', {
        class: {
          'v-progress-linear__bar': true,
          [type]: !!type,
          ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
        },
        style: {
          width: !props.indeterminate ? barWidth + '%' : '',
          ...(props.color ? setBackgroundCssColor(props.color) : {}),
        },
      })
    }

    const genProgressBuffer = () => {
      const bufferWidth = props.value || props.modelValue

      const propsData = {
        class: {
          'v-progress-linear__buffer': true,
        },
        style: {
          width: bufferWidth ? bufferWidth + '%' : '',
        },
      }

      return h('div', propsData)
    }

    function genProgressBackground() {
      const propsData = {
        class: {
          'v-progress-linear__background': true,
          ...(props.backgroundColor
            ? setBackgroundClassNameColor(props.backgroundColor)
            : {}),
        },
        style: {
          opacity: props.backgroundOpacity,
          ...(props.backgroundColor
            ? setBackgroundCssColor(props.backgroundColor)
            : {}),
        },
      }

      return h('div', propsData)
    }

    function genProgressIndeterminate() {
      return h(
        'div',
        {
          class: { 'v-progress-linear__indeterminate': true },
        },
        [genProgressBar('long'), genProgressBar('short')]
      )
    }

    function genProgressLinear() {
      return h(
        'div',
        {
          class: 'v-progress-linear',
          style: {
            height: `${props.height}px`,
          },
        },
        [
          genProgressBackground(),
          genProgressBuffer(),
          props.indeterminate ? genProgressIndeterminate() : genProgressBar(),
        ]
      )
    }

    return () => genProgressLinear()
  },
})
