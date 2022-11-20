import { defineComponent, computed, h, VNode } from 'vue'
import { toCamelCase } from '../../helpers'

const breakpoints = ['sm', 'md', 'lg', 'xl']

const colProps = breakpoints.reduce((props, p) => {
  props[p] = {
    type: [String, Number],
    default: null,
  }

  return props
}, {})

const orderProps = breakpoints.reduce((props, p) => {
  props[`order-${p}`] = {
    type: [String, Number],
    default: null,
  }

  return props
}, {})

const offsetProps = breakpoints.reduce((props, p) => {
  props[`offset-${p}`] = {
    type: [String, Number],
    default: null,
  }

  return props
}, {})

export default defineComponent({
  name: 'v-col',
  props: {
    order: {
      type: [String, Number],
      default: null,
    },
    cols: {
      type: [String, Number],
      default: null,
    },
    offset: {
      type: [String, Number],
      default: null,
    },
    ...colProps,
    ...orderProps,
    ...offsetProps,
  },
  setup(props, { slots }): () => VNode {
    const classes = computed<Record<string, boolean>>(() => ({
      'v-col': true,
      [`v-col-${props.cols}`]: !!props.cols,
      ...breakpoints.reduce((cols, p) => {
        cols[`${p}-${props[p]}`] = !!props[p]
        return cols
      }, {}),

      [`order-${props.order}`]: props.order !== null,

      ...breakpoints.reduce((orders, p) => {
        const propValue = props[toCamelCase('order', p)]
        orders[`order-${p}-${propValue}`] = !!propValue
        return orders
      }, {}),
      [`offset-${props.offset}`]: props.offset !== null,
      ...breakpoints.reduce((offsets, p) => {
        const propValue = props[toCamelCase('offset', p)]
        offsets[`offset-${p}-${propValue}`] = !!propValue
        return offsets
      }, {}),
    }))

    return () =>
      h(
        'div',
        {
          class: classes.value,
        },
        {
          default: () => slots.default && slots.default(),
        }
      )
  },
})
