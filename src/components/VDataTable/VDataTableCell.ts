// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Helpers
import { convertToUnit } from '../../helpers'

// Components
import { VResize } from '../VResize'

// Types
import { VNode } from 'vue'

export const VDataTableCell = defineComponent({
  name: 'v-data-table-cell',
  props: {
    dark: Boolean,
    resizeable: Boolean,
    align: {
      type: String,
      default: 'start',
    },
    width: {
      type: [String, Number],
      default: 75,
    },
    contentColor: String,
    ...colorProps(),
  } as any,

  emits: ['resize'],

  setup(props, { slots, emit }): () => VNode {
    const { setTextColor, setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__cell': true,
    }))

    function genResize(): VNode {
      const propsData = {
        right: true,
        emit: true,
        class: {
          white: props.dark,
          primary: !props.dark,
        },
        onResize: ($size) => emit('resize', $size),
      }

      return h(VResize, propsData)
    }

    function genCellContent(): VNode {
      const propsData = {
        class: {
          'v-data-table__cell-content': true,
          [`text-align--${props.align}`]: !!props.align,
        },
      }

      return h('div', propsData, slots.default && slots.default())
    }

    return () => {
      const color = props.contentColor || (props.dark ? 'white' : '')

      const propsData = setTextColor(color, {
        class: classes.value,
        style: {
          width: convertToUnit(+props.width),
        },
      })

      return h(
        'div',
        props.color ? setBackground(props.color, propsData) : propsData,
        [genCellContent(), props.resizeable && genResize()]
      )
    }
  },
})
