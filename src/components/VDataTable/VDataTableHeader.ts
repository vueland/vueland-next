// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, ref, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VDataTableCell } from './VDataTableCell'

// Types
import { Column } from '../../types'

export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',

  props: {
    dark: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    ...colorProps(),
  } as any,

  setup(props) {
    const cols = ref<any[] | null>(null)
    const { setBackground } = useColors()

    cols.value = props.cols

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table-header': true,
    }))

    function genHeaderCells() {
      return cols.value!.map((item: Column) => {
        item.width = item.width || props.colWidth

        return h(VDataTableCell, {
          dark: props.dark,
          width: item.width,
          resizeable: item.resizeable,
          filterable: item.filterable,
          sortable: item.sortable,
          onSize: size => item.width = size,
        }, {
          default: () => item.text,
        })
      })
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        props.color ? setBackground(props.color, propsData) : propsData,
        genHeaderCells())
    }
  },
})
