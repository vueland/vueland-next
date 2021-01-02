// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, ref, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VDataTableCell } from './VDataTableCell'

// Types
import { VNode } from 'vue'
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
    align: String,
    ...colorProps(),
  } as any,

  setup(props, { emit }) {
    const cols = ref<any[] | null>([])
    const { setBackground } = useColors()

    cols.value = props.cols

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    function genSortButton() {
      return h(VIcon, {
        clickable: true,
        size: 18,
        onClick: () => emit('sort'),
      })
    }

    function genHeaderCells() {
      const cells: VNode[] = []

      cells.push(h(VDataTableCell, {
        align: 'center',
        dark: props.dark,
        width: 50
      }, '№'))

      cols.value!.forEach((item: Column) => {
        item.width = item.width || props.colWidth

        const vnode = h(VDataTableCell, {
          dark: props.dark,
          width: item.width,
          resizeable: item.resizeable,
          filterable: item.filterable,
          sortable: item.sortable,
          align: props.align || item.align,
          onResize: $size => item.width = $size,
        }, {
          default: () => h('div', {
            class: 'v-data-table__header-title',
          }, [item.title, genSortButton()]),
        })

        cells.push(vnode)
      })

      return cells
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        props.color ? setBackground(props.color, propsData) : propsData,
        genHeaderCells(),
      )
    }
  },
})
