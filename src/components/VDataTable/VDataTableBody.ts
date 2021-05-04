// Styles
import './VDataTableBody.scss'

// Vue API
import { h, ref, watch, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VDataTableCell } from './VDataTableCell'
import { VCheckbox } from '../VCheckbox'

// Types
import { VNode } from 'vue'

export const VDataTableBody = defineComponent({
  name: 'v-data-table-body',

  props: {
    cols: Array,
    rows: Array,
    dark: Boolean,
    showSequence: Boolean,
    showCheckbox: Boolean,
    checkAllRows: Boolean,
    align: String,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    page: Number,
    rowsOnPage: Number,
    ...colorProps(),
  } as any,

  emits: ['check'],

  setup(props, { slots, emit }): () => VNode {
    const checkedRows = ref([])

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__body': true,
    }))

    const rowsOnTable = computed<any[]>(() => {
      return props.rows?.slice(
        (props.page - 1) * props.rowsOnPage,
        props.page * props.rowsOnPage
      )
    })

    watch(
      () => props.checkAllRows,
      (to) => {
        if (to) onCheckRows(props.rows)
        else onCheckRows([])
      }
    )

    function onCheckRows(rows) {
      checkedRows.value = rows
      emit('check', checkedRows.value)
    }

    function genTableRow(cells): VNode {
      return h('div', { class: { 'v-data-table__row': true } }, cells)
    }

    function genNumberCell(count): VNode {
      return h(
        VDataTableCell,
        {
          width: 50,
          align: 'center',
          dark: props.dark,
          color: props.color,
          class: 'v-data-table__row-number',
        },
        {
          default: () => count + 1,
        }
      )
    }

    function genCheckboxCell(row): VNode {
      return h(
        VDataTableCell,
        {
          width: 50,
          align: 'center',
          dark: props.dark,
          color: props.color,
          class: 'v-data-table__row-checkbox',
        },
        {
          default: () =>
            h(VCheckbox, {
              modelValue: checkedRows.value,
              color: props.dark ? 'white' : '',
              value: row,
              ['onUpdate:modelValue']: onCheckRows,
            }),
        }
      )
    }

    function genRowCell(col, row): VNode {
      const { format } = col
      const slotContent = slots[col.key] && slots[col.key]!(row)

      return h(
        VDataTableCell,
        {
          width: col.width,
          align: col.align || props.align,
          dark: props.dark,
          class: { [col.rowCellClass]: !!col.rowCellClass },
        },
        {
          default: () =>
            slotContent
              ? slotContent
              : format
              ? format(row)
              : String(row[col.key]),
        }
      )
    }

    function genTableRows(): VNode[] {
      const tableRows: VNode[] = []
      const rowsLength = rowsOnTable.value?.length
      const colsLength = props.cols.length
      const count = (props.page - 1) * props.rowsOnPage

      let rowCells: VNode[] = []

      for (let i = 0; i < rowsLength; i += 1) {
        props.showSequence && rowCells.push(genNumberCell(count + i))
        props.showCheckbox && rowCells.push(genCheckboxCell(props.rows[i]))

        for (let j = 0; j < colsLength; j += 1) {
          props.cols[j].show &&
            rowCells.push(genRowCell(props.cols[j], rowsOnTable.value[i]))
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

      return h(
        'div',
        props.options?.color
          ? setBackground(props.options.color, propsData)
          : propsData,
        genTableRows()
      )
    }
  },
})
