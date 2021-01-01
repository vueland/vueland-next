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
    width: {
      type: [String, Number],
      default: 75,
    },
  } as any,

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table-cell': true,
    }))

    function genResize() {
      return h(VResize, {
        right: true,
        emit: true,
        onSize: $size => emit('size', $size),
      })
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
        [
          slots.default && slots.default(),
          props.resizeable ? genResize() : null,
        ],
      )
    }
  },
})
