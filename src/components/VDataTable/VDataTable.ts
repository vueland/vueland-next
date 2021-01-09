// Styles
import './VDataTable.scss'

// Vue API
import { h, watch, computed, defineComponent, ref } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableFooter } from './VDataTableFooter'
import { VCheckbox } from '../VCheckbox'

// Helpers
import { copyWithoutRef } from '../../helpers'
import { toComparableStringFormat } from './helpers'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    headerColor: String,
    rowsOnTable: {
      type: Array,
      default: () => [10, 15, 20, 25],
    },
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    align: String,
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  setup(props, { slots, emit }) {
    const cols = ref<any[]>([])
    const rows = ref<any[]>([])
    const checkedRows = ref<any[]>([])
    const rowsPerPage = ref<number>(20)
    const page = ref<number>(1)
    const isAllRowsChecked = ref<boolean>(false)

    const filters = {}

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    const pages = computed(() => {
      return Math.ceil(rows.value?.length / rowsPerPage.value)
    })

    watch(
      () => props.cols,
      to => (cols.value = to),
      { immediate: true },
    )

    watch(
      () => props.rows,
      to => rows.value = copyWithoutRef(to),
      { immediate: true },
    )

    function onCheckAll(value) {
      isAllRowsChecked.value = value
      rows.value.forEach(row => row.checked = value)
    }

    function onCheck(rows) {
      checkedRows.value = rows
      emit('checked', checkedRows.value)
    }

    function onPrevTable(num) {
      page.value = page.value > 1 ? page.value + num : page.value
    }

    function onNextTable(num) {
      if (rows.value.length - page.value * rowsPerPage.value > 0) {
        page.value += num
      }
      return
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted
        rows.value!.reverse()
      } else {
        cols.value!.forEach(c => {
          c.sorted = col.key === c.key
        })

        sortColumn(col)
      }
    }

    function onFilter({ value, col }): any {
      if (!value && filters[col.key]) delete filters[col.key]

      if (value) filters[col.key] = value

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return rows.value = props.rows
        }
        rows.value = filterRows(props.rows)
      } else {
        emit('filter', filters)
      }

      page.value = 1
    }

    function onSelectRowsCount(count) {
      rowsPerPage.value = count
    }

    function sortColumn(col) {
      rows.value!.sort((a, b) => {
        if (col.formatter) {
          if (col.formatter(a) > col.formatter(b)) return 1
        } else {
          if (a[col.key] > b[col.key]) return 1
        }
        return -1
      })
    }

    function filterRows(rows) {
      const filterKeys = Object.keys(filters)

      return rows.reduce((acc, row) => {
        const rowResults: any[] = []

        filterKeys.forEach(key => {
          const { formatter } = cols.value.find(col => col.key === key)
          const value = formatter ? formatter(row) : row[key]

          const rowKeyValue = toComparableStringFormat(value)
          const filterValue = toComparableStringFormat(filters[key])

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(!!row[key])
          }
        })

        if (
          rowResults.length === filterKeys.length &&
          rowResults.every(value => !!value)
        ) {
          acc.push(row)
        }

        return acc
      }, [])
    }

    function genTableTools() {
      return h(
        'div', {
          class: {
            'v-data-table__toolbar': true,
          },
        }, {
          default: () => slots.toolbar && slots.toolbar(),
        },
      )
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: cols.value,
        color: props.headerColor || props.color,
        checkbox: props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter,
        onSort,
        onCheckAll,
      })
    }

    function genTableBody() {
      return h(
        VDataTableBody,
        {
          cols: cols.value,
          rows: rows.value,
          page: page.value,
          rowsPerPage: rowsPerPage.value,
          checkbox: props.checkbox,
          checkAllRows: isAllRowsChecked.value,
          align: props.align,
          dark: props.dark,
          color: props.color,
          numbered: props.numbered,
          onCheck,
        },

        props.cols.reduce((acc, col) => {
          const slotContent = (row) => {
            const scoped: any = { row }

            if (col.formatter) {
              scoped.formatter = col.formatter
            }

            return slots[col.key] && slots[col.key]!(scoped)
          }

          if (slots[col.key]) acc[col.key] = slotContent

          return acc
        }, {}),
      )
    }

    function genTableFooter() {
      return h(VDataTableFooter, {
        pages: pages.value,
        page: page.value,
        counts: props.rowsOnTable,
        tableRowsCount: rows.value?.length,
        allRowsCount: props.rows.length,
        rowsPerPage: rowsPerPage.value,
        dark: props.dark,
        color: props.color,
        toolbar: props.toolbar,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
        onLastPage: val => emit('last-page', val),
        onResetPage: val => page.value += val,
      }, {
        toolbar: () => slots.toolbar && slots.toolbar(),
      })
    }

    function genTableInner() {
      return h('div', {
          class: {
            'v-data-table__inner': true,
          },
        },
        [genTableHeader(), genTableBody()],
      )
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div', setBackground(props.color, propsData), [
        genTableTools(),
        genTableInner(),
        genTableFooter(),
      ])
    }
  },
})
