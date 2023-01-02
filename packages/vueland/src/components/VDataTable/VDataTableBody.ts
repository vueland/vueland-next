// Vue API
import { h, ref, watch, computed, defineComponent, unref } from 'vue'

// Effects
import { colorProps, useColors } from '../../composables/use-colors'

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

  emits: ['select', 'click:row', 'dblclick:row', 'contextmenu:row'],

  setup(props, { slots, emit }): () => VNode {
    const checkedRows = ref([])

    const { setBackgroundCssColor, setBackgroundClassNameColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__body': true,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    const rowsCount = computed<number>(() => (props.page - 1) * props.rowsOnPage)

    const rowsOnTable = computed<any[]>(() => {
      if (props.rows?.[unref(rowsCount)]) {
        return props.rows?.slice(unref(rowsCount), props.page * props.rowsOnPage)
      }

      return props.rows?.slice(0, props.rowsOnPage)
    })

    watch(
      () => props.checkAllRows,
      (to) => {
        if (to) onSelectRows(props.rows)
        else onSelectRows([])
      },
    )

    const onSelectRows = (rows) => {
      checkedRows.value = rows
      emit('select', checkedRows.value)
    }

    const genNumberCell = (count): VNode => {
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
        },
      )
    }

    const genCheckboxCell = (row): VNode => {
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
              value: row,
              onChange: onSelectRows,
            }),
        },
      )
    }

    const genRowCell = (col, row): VNode => {
      const { format } = col
      const slotContent =
        slots[col.key] &&
        slots[col.key]!({
          row,
          format,
        })

      return h(
        VDataTableCell,
        {
          width: col.width,
          align: col.align || props.align,
          dark: props.dark,
        },
        {
          default: () =>
            slotContent
              ? slotContent
              : format
              ? format(row)
              : String(row[col.key]),
        },
      )
    }

    const genTableRow = (row, rowCount: number): VNode => {
      const rowCells: VNode[] = []

      props.showSequence && rowCells.push(genNumberCell(rowCount))
      props.showCheckbox && rowCells.push(genCheckboxCell(row))

      props.cols.forEach((col) => {
        col.show && rowCells.push(genRowCell(col, row))
      })

      return h(
        'div',
        {
          class: { 'v-data-table__row': true },
          onClick: () => emit('click:row', row),
          onDblclick: () => emit('dblclick:row', row),
          onContextmenu: (e) => {
            e.preventDefault()
            emit('contextmenu:row', row)
          },
        },
        rowCells,
      )
    }

    const genTableRows = (): VNode[] => {
      const tableRows: VNode[] = []
      const rowsLength = rowsOnTable.value?.length

      for (let i = 0; i < rowsLength; i += 1) {
        tableRows.push(genTableRow(rowsOnTable.value[i], unref(rowsCount) + i))
      }

      return tableRows
    }

    return () => h('div', {
      class: classes.value,
      style: styles.value,
    }, genTableRows())
  },
})
