// Styles
import './VDataTableCell.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

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
  } as any,

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__cell': true,
      [`text-align--${ props.align }`]: !!props.align,
    }))

    function genResize() {
      return h(VResize, {
        right: true,
        emit: true,
        style: { opacity: .1 },
        onResize: $size => emit('resize', $size),
      })
    }

    function genCellContent() {
      return h('div', {
        class: 'v-data-table__cell-content',
      }, slots.default && slots.default())
    }

    return () => {
      const propsData = {
        class: classes.value,
        style: {
          width: convertToUnit(+props.width),
        },
      }

      return h('div',
        props.dark ? setTextColor('white', propsData) : propsData,
        [genCellContent(), props.resizeable ? genResize() : null],
      )
    }
  },
})
