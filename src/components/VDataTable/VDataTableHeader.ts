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

// Services
import { FaIcons } from '../../services/icons'

export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',

  props: {
    dark: Boolean,
    numbered: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    align: String,
    ...colorProps(),
  } as any,

  emits: [
    'sort',
  ],

  setup(props, { emit }) {
    const cols = ref<any[] | null>([])
    const { setBackground } = useColors()

    cols.value = props.cols

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    function onSort(item) {
      emit('sort', item)
    }

    function genSortButton(item) {
      return h(VIcon, {
        clickable: true,
        class: 'v-data-table--sort',
        size: 14,
        icon: FaIcons.$arrowUp,
        color: props.dark ? 'white' : '',
        onClick: () => onSort(item),
      })
    }

    function genHeaderTitle(item) {
      return h('div', {
          class: 'v-data-table__header-title',
        }, [
          item.title,
          item.sortable && genSortButton(item),
        ],
      )
    }

    function genHeaderCells() {
      const cells: VNode[] = []

      props.numbered && cells.push(
        h(VDataTableCell, {
            align: 'center',
            dark: props.dark,
            width: 50,
          }, {
            default: () => '№',
          },
        ),
      )

      cols.value!.forEach((item: Column) => {
        item.width = item.width || props.colWidth

        const vnode = h(VDataTableCell, {
          dark: props.dark,
          class: {
            'v-data-table--sorted': item.sorted,
          },
          width: item.width,
          resizeable: item.resizeable,
          filterable: item.filterable,
          sortable: item.sortable,
          align: props.align || item.align,
          onResize: $size => item.width = $size,
        }, {
          default: () => genHeaderTitle(item),
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
