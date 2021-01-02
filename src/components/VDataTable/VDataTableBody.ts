// Styles
import './VDataTableBody.scss'

// Vue API
import { h, ref, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VDataTableCell } from './VDataTableCell'

// Types
import { VNode } from 'vue'

export const VDataTableBody = defineComponent({
  name: 'v-data-table-body',

  props: {
    dark: Boolean,
    cols: Array,
    rows: Array,
    align: String,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    ...colorProps(),
  } as any,

  setup(props, { slots }) {
    const cols = ref<any[] | null>([])
    const rows = ref<any[] | null>([])

    cols.value = props.cols
    rows.value = props.rows

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__body': true,
    }))

    function genTableRow(cells) {
      return h('div', {
        class: {
          'v-data-table__body-row': true,
        },
      }, cells)
    }

    function genTableRows() {
      const tableRows: VNode[] = []
      const rowsLength = rows.value!.length
      const colsLength = cols.value!.length

      let rowCells: VNode[] = []

      for (let i = 0; i < rowsLength; i += 1) {

        rowCells.push(
          h(VDataTableCell, { width: 50, align: 'center' },
            { default: () => i + 1 },
          ),
        )

        for (let j = 0; j < colsLength; j += 1) {

          const slotContent = slots[cols.value![j].key] &&
            slots[cols.value![j].key]!(rows.value![i])

          rowCells.push(
            h(VDataTableCell, {
              width: cols.value![j].width,
              align: props.align || cols.value![j].align,
            }, {
              default: () => slotContent || rows.value![i][cols.value![j].key],
            }))
        }

        tableRows.push(genTableRow(rowCells))

        rowCells = []
      }

      return tableRows
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        props.color ? setBackground(props.color, propsData) : propsData,
        genTableRows(),
      )
    }
  },
})
