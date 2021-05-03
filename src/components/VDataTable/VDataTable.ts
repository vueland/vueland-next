// Styles
import './VDataTable.scss'

// Vue API
import { h, watch, computed, defineComponent, reactive } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableFooter } from './VDataTableFooter'

// Helpers
import { toComparableStringFormat } from './helpers'

// Types
import { VNode } from 'vue'
import { Column, TableFilter } from '../../types'

type TableState = {
  cols: Column[]
  rows: { [key: string]: any }[]
  checkedRows: { [key: string]: any }[]
  rowsOnPage: number
  page: number
  isAllRowsChecked: boolean
}

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    align: {
      type: String,
      validator: (val) => ['left', 'center', 'right'].includes(val),
    },
    color: {
      type: String,
      default: 'white',
    },
    headerProps: Object,
    footerProps: Object,
    customFilter: Function,
  } as any,
  emits: ['checked', 'filter', 'last-page'],

  setup(props, { slots, emit }) {
    const data = reactive<TableState>({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsOnPage: 20,
      page: 1,
      isAllRowsChecked: false,
    })

    const filters = {}
    const rowsPerPageDefaultOptions = [5, 10, 15, 20]

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    const pages = computed<number>(() => {
      return Math.ceil(data.rows?.length / data.rowsOnPage)
    })

    const firstOnPage = computed<number>(() => {
      return data.page === 1 ? 1 : (data.page - 1) * data.rowsOnPage + 1
    })

    const lastOnPage = computed<number>(() => {
      return data.page * data.rowsOnPage > data.rows?.length
        ? data.rows?.length
        : data.page * data.rowsOnPage
    })

    const pageCorrection = computed<number | null>(() => {
      if ((data.page - 1) * data.rowsOnPage > data.rows?.length) {
        return Math.ceil(
          (data.page * data.rowsOnPage - data.rows?.length) / data.rowsOnPage,
        )
      }

      return null
    })

    watch(
      () => props.cols,
      (to) => (data.cols = to),
      { immediate: true },
    )

    watch(
      () => props.rows,
      (to) => (data.rows = to),
      { immediate: true },
    )

    watch(
      () => props.footerProps,
      (to) => {
        if (to && to.rowsPerPageOptions) {
          return (data.rowsOnPage = to.rowsPerPageOptions[0])
        }
        data.rowsOnPage = rowsPerPageDefaultOptions[0]
      },
      { immediate: true },
    )

    function onCheckAll(value: boolean) {
      data.isAllRowsChecked = value
      data.rows.forEach((row) => (row.checked = value))
    }

    function onCheck<T extends TableState['rows']>(rows: T) {
      data.checkedRows = rows
      emit('checked', data.checkedRows)
    }

    function onPrevTablePage(num: number) {
      data.page = data.page > 1 ? data.page + num : data.page
    }

    function onNextTablePage(num: number) {
      if (data.rows.length - data.page * data.rowsOnPage > 0) {
        data.page += num
      }
    }

    function onSort(col: Column) {
      if (col.sorted) {
        col.sorted = !col.sorted
        return data.rows!.reverse()
      }

      data.cols.forEach((c) => {
        c.sorted = col.key === c.key
      })

      sortColumn(col)
    }

    function onFilter({ value, col }: TableFilter) {
      if (!value && filters[col.key]) {
        delete filters[col.key]
      }

      if (value) {
        filters[col.key] = value
      }

      if (col.filter) {
        return (data.rows = col.filter({ value, col }))
      }

      if (props.customFilter) {
        return props.customFilter(filters as any)
      }

      if (!Object.keys(filters).length) {
        return (data.rows = props.rows)
      }

      data.rows = filterRows(props.rows, props.cols)

      data.page = 1
    }

    function onSelectRowsCount(count: number) {
      data.rowsOnPage = count
    }

    function sortColumn(col: Column): void {
      data.rows.sort((a, b) => {
        if (col.format) return col.format(a) > col.format(b) ? 1 : -1

        return a[col.key] > b[col.key] ? 1 : -1
      })
    }

    function filterRows<T, C extends Column>(rows: T[], cols: C[]) {
      const filterKeys = Object.keys(filters)

      return rows.reduce((acc, row) => {
        const rowResults: any[] = []

        filterKeys.forEach((key) => {
          const { format } = cols.find((col) => col.key === key) as Column

          const value = format ? format(row) : row[key]

          const rowKeyValue = toComparableStringFormat(value)
          const filterValue = toComparableStringFormat(filters[key])

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(row[key])
          }
        })

        if (
          rowResults.length === filterKeys.length &&
          rowResults.every((value) => !!value)
        ) {
          acc.push(row)
        }

        return acc
      }, [] as T[])
    }

    function genTableTools(): VNode {
      const propsData = { class: 'v-data-table__toolbar' }

      return h('div', propsData, {
        default: () => slots.toolbar && slots.toolbar(),
      })
    }

    function genTableHeader(): VNode {
      const propsData = {
        cols: data.cols,
        color: props.color,
        checkbox: !!props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        options: props.headerProps,
        onFilter,
        onSort,
        onCheckAll,
      }
      return h(VDataTableHeader, propsData)
    }

    function genTableBody(): VNode {
      const propsData = {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsOnPage: data.rowsOnPage,
        checkbox: props.checkbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        numbered: props.numbered,
        color: props.color,
        onCheck,
      }

      const content = props.cols.reduce((acc, col) => {
        const slotContent = (row) => {
          const scoped: any = { row }
          if (col.format) scoped.format = col.format

          return slots[col.key] && slots[col.key]!(scoped)
        }

        if (slots[col.key]) acc[col.key] = slotContent
        return acc
      }, {})

      return h(VDataTableBody, propsData, content)
    }

    function genTableFooter(): VNode {
      const propsData = {
        pages: pages.value,
        page: data.page,
        firstOnPage: firstOnPage.value,
        lastOnPage: lastOnPage.value,
        pageCorrection: pageCorrection.value,
        rowsOnPage: data.rowsOnPage,
        rowsLength: data.rows?.length,
        dark: props.dark,
        color: props.color,
        options: {
          rowsPerPageOptions: rowsPerPageDefaultOptions,
          ...props.footerProps,
        },
        onPrevTablePage,
        onNextTablePage,
        onSelectRowsCount,
        onLastPage: () => emit('last-page', props.rows.length),
        onCorrectPage: (val) => (data.page += val),
      }

      const content = slots.paginationText
        ? {
          paginationText: () =>
            slots.paginationText &&
            slots.paginationText({
              start: firstOnPage.value,
              last: lastOnPage.value,
              length: data.rows?.length,
            }),
        }
        : ''

      return h(VDataTableFooter, propsData, content)
    }

    function genTableInner(): VNode {
      const propsData = {
        class: 'v-data-table__inner',
      }

      return h('div', propsData, [genTableHeader(), genTableBody()])
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div', setBackground(props.color, propsData), [
        slots.toolbar && genTableTools(),
        genTableInner(),
        genTableFooter(),
      ])
    }
  },
})
