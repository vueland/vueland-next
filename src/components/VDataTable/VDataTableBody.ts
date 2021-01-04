// Styles
import './VDataTableBody.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

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
    numbered: Boolean,
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
      const rowsLength = props.rows.length
      const colsLength = props.cols.length

      let rowCells: VNode[] = []

      for (let i = 0; i < rowsLength; i += 1) {

        props.numbered && rowCells.push(
          h(VDataTableCell, {
              width: 50,
              align: 'center',
              dark: props.dark,
            },
            { default: () => i + 1 },
          ),
        )

        for (let j = 0; j < colsLength; j += 1) {

          const slotContent = slots[props.cols[j].key] &&
            slots[props.cols[j].key]!(props.rows[i])

          rowCells.push(
            h(VDataTableCell, {
              width: props.cols[j].width,
              align: props.align || props.cols[j].align,
              dark: props.dark,
            }, {
              default: () => slotContent || props.rows[i][props.cols[j].key],
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
