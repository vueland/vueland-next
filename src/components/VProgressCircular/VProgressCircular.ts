import { h, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../composable/use-colors'

// Types
import { VNode } from 'vue'
import { convertToUnit } from '../../helpers'

export const VProgressCircular = defineComponent({
  name: 'v-progress-circular',
  props: {
    indeterminate: Boolean,
    size: {
      type: [Number, String],
      default: 32,
    },
    width: {
      type: [Number, String],
      default: 4,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    rotate: {
      type: [Number, String],
      default: 0,
    },
    ...colorProps(),
  },
  setup(props, { slots }) {
    const radius = 20

    const { setTextClassNameColor, setTextCssColor } = useColors()

    const normalizedValue = computed<number>(() => {
      if (props.value < 0) return 0

      if (props.value > 100) return 100

      return parseFloat(props.value as string)
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-progress-circular': true,
      'v-progress-circular--indeterminate': props.indeterminate,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const circumference = computed<number>(() => {
      return 2 * Math.PI * radius
    })

    const strokeDashArray = computed<number>(() => {
      return Math.round(circumference.value * 1000) / 1000
    })

    const strokeDashOffset = computed<string>(() => {
      return ((100 - normalizedValue.value) / 100) * circumference.value + 'px'
    })

    const viewBoxSize = computed<number>(() => {
      return radius / (1 - Number(props.width) / +props.size)
    })

    const strokeWidth = computed<number>(() => {
      return (Number(props.width) / +props.size) * viewBoxSize.value * 2
    })

    const styles = computed<object>(() => ({
      width: convertToUnit(props.size),
      height: convertToUnit(props.size),
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const svgStyle = computed(() => {
      return {
        transform: `rotate(${+props.rotate}deg)`,
      }
    })

    function genCircle(name: string, offset: string | number): VNode {
      return h('circle', {
        class: `v-progress-circular__${name}`,
        fill: 'transparent',
        cx: 2 * viewBoxSize.value,
        cy: 2 * viewBoxSize.value,
        r: radius,
        'stroke-width': strokeWidth.value,
        'stroke-dasharray': strokeDashArray.value,
        'stroke-dashoffset': offset,
      })
    }

    const genSvg = () => {
      const children = [
        props.indeterminate || genCircle('underlay', 0),
        genCircle('overlay', strokeDashOffset.value),
      ]

      const propsData = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `${viewBoxSize.value} ${viewBoxSize.value} ${
          2 * viewBoxSize.value
        } ${2 * viewBoxSize.value}`,

        style: svgStyle.value,
      }

      return h('svg', propsData, children)
    }

    const genInfo = () => {
      const propsData = {
        class: 'v-progress-circular__info',
      }
      return h('div', propsData, slots.default && slots.default())
    }

    return () => {
      const propsData = {
        class: classes.value,
        style: styles.value,
      }
      return h('div', propsData, [genSvg(), genInfo()])
    }
  },
})
