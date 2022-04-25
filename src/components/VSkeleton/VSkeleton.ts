import { defineComponent, h } from 'vue'
import { convertToUnit } from '@/helpers'

export const VSkeleton = defineComponent({
  name: 'v-skeleton',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
      default: 20,
    },
    radius: {
      type: [Number, String],
      default: 5,
    },
    light: {
      type: Boolean,
      default: true,
    },
    dynamic: Boolean,
  },
  setup(props) {
    return () => h(props.tag, {
      class: {
        'v-skeleton': true,
        'v-skeleton--light': props.light,
        'v-skeleton--dynamic': props.dynamic,
      },
      style: {
        width: props.width && convertToUnit(props.width),
        height: convertToUnit(props.height),
        borderRadius: convertToUnit(props.radius)
      },
    })
  },
})
