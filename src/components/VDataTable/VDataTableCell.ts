// Styles
import './VDataTableCell.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Helpers
import { convertToUnit } from '../../helpers'

// Components
import { VResize } from '../VResize'

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

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__cell': true,
    }))

    function genResize() {
      return h(VResize, {
        right: true,
        emit: true,
        class: {
          white: props.dark,
          primary: !props.dark,
        },
        onResize: ($size) => emit('resize', $size),
      })
    }

    function genCellContent() {
      return h(
        'div',
        {
          class: {
            'v-data-table__cell-content': true,
            [`text-align--${props.align}`]: !!props.align,
          },
        },
        slots.default && slots.default()
      )
    }

    return () => {
      const color = props.color || (props.dark ? 'white' : '')

      const propsData = setTextColor(color, {
        class: classes.value,
        style: {
          width: convertToUnit(+props.width),
        },
      })

      return h('div', propsData, [
        genCellContent(),
        props.resizeable && genResize(),
      ])
    }
  },
})
