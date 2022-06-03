import { defineComponent, h, computed, VNode } from 'vue'
import { toCamelCase } from '../../helpers'

const breakpoints = ['sm', 'md', 'lg', 'xl']
const positions = ['start', 'center', 'end']

export default defineComponent({
  name: 'v-row',
  props: {
    align: {
      type: String,
      default: null,
      validator: (str: string) =>
        [...positions, 'baseline', 'stretch'].includes(str),
    },
    alignContent: {
      type: String,
      default: null,
      validator: (str: string) =>
        [...positions, 'space-between', 'space-around', 'stretch'].includes(
          str
        ),
    },
    justify: {
      type: String,
      default: null,
      validator: (str: string) =>
        [...positions, 'space-between', 'space-around'].includes(str),
    },
    noGutter: Boolean,
    ...breakpoints.reduce((props, bp) => {
      props[`justify-${bp}`] = {
        type: String,
        default: null,
        validator: (str: string) =>
          [...positions, 'space-between', 'space-around'].includes(str),
      }
      props[`align-${bp}`] = {
        type: String,
        default: null,
        validator: (str: string) =>
          [...positions, 'baseline', 'stretch'].includes(str),
      }
      props[`align-content-${bp}`] = {
        type: String,
        default: null,
        validator: (str: string) =>
          [...positions, 'space-between', 'space-around', 'stretch'].includes(
            str
          ),
      }
      return props
    }, {}),
  },

  setup(props, { slots }): () => VNode {
    const classes = computed<Record<string, boolean>>(() => ({
      'v-row': true,
      'no-gutter': props.noGutter,
      [`justify-${props.justify}`]: !!props.justify,
      [`align-${props.align}`]: !!props.align,
      [`align-content-${props.alignContent}`]: !!props.alignContent,

      ...breakpoints.reduce((cls, bp) => {
        ;[...positions, 'space-between', 'space-around'].forEach((pos) => {
          cls[`justify-${bp}-${pos}`] =
            pos === (props[toCamelCase('justify', bp)] as string)
        })
        ;[...positions, 'baseline', 'stretch'].forEach((pos) => {
          cls[`align-${bp}-${pos}`] =
            pos === (props[toCamelCase('align', bp)] as string)
        })
        ;[...positions, 'space-between', 'space-around', 'stretch'].forEach(
          (pos) => {
            cls[`align-content-${bp}-${pos}`] =
              pos === (props[toCamelCase('align', 'content', bp)] as string)
          }
        )

        return cls
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
