// Vue API
import { h, watch, computed, defineComponent, ref, unref } from 'vue'

// Effects
import { useColors } from '../../composables/use-colors'
// import { useTheme } from '../../effects/use-theme'

// Components
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableFooter } from './VDataTableFooter'

// Helpers
import { addScopedSlot } from '../../helpers'

// Types
import { VNode, PropType } from 'vue'
import {
  TableColumn,
  TableColumnProps,
  HeaderOptions,
  TableFilterParams,
} from '../../../types'
import { IDataTableFooterOptions } from '@/components/VDataTable/types'

export default defineComponent({
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
    showSequence: Boolean,
    showCheckbox: Boolean,
    align: {
      type: String,
      validator: (val) => ['left', 'center', 'right'].includes(val),
    },
    color: {
      type: String,
      default: '',
    },
    headerOptions: {
      type: Object as PropType<HeaderOptions>,
      default: () => ({}),
    },
    footerOptions: {
      type: Object as PropType<IDataTableFooterOptions>,
      default: null,
    },
    customFilter: Function,
  } as any,

  emits: [
    'last-page',
    'sort:column',
    'filter:column',
    'select:row',
    'click:row',
    'dblclick:row',
    'update:page',
    'update:rows',
    'update:rows-count',
    'contextmenu:row',
  ],

  setup(props, { slots, emit }) {
    const cols = ref<TableColumn[]>([])
    const rows = ref<any[]>([])
    const page = ref<number>(1)
    const rowsOnPage = ref<number>(props.footerOptions?.counts?.rowsPerPageOptions?.[0] || 5)
    const checkedRows = ref<any[]>([])
    const isAllRowsChecked = ref<boolean>(false)

    const { setBackgroundCssColor, setBackgroundClassNameColor } = useColors()

    const filters = {}

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    const headerOptions = computed<HeaderOptions>(() => ({
      color: props.color,
      dark: props.dark,
      ...props.headerOptions,
    }))

    const footerOptions = computed<IDataTableFooterOptions>(() => ({
      color: props.color,
      dark: props.dark,
      ...props.footerOptions,
    }))

    const totalRowsCount = computed<number>(() => {
      return props.footerOptions?.counts?.totalRows || unref(rows)?.length
    })

    const pages = computed<number>(() => {
      return Math.ceil(unref(totalRowsCount) / unref(rowsOnPage))
    })

    const lastOnPage = computed<number>(() => {
      const currentPage = unref(page)

      return currentPage * unref(rowsOnPage) > unref(totalRowsCount)
        ? unref(totalRowsCount)
        : currentPage * unref(rowsOnPage)
    })

    const firstOnPage = computed<number>(() => {
      const currentPage = unref(page)

      if (currentPage === 1) {
        return 1
      }

      const total = currentPage * unref(rowsOnPage)

      if (total > unref(totalRowsCount)) {
        const diff = unref(totalRowsCount) % unref(rowsOnPage)

        return unref(totalRowsCount) - diff + 1
      }

      return unref(currentPage) === 1 ? 1 : (currentPage - 1) * unref(rowsOnPage) + 1
    })

    watch(
      () => props.cols,
      (newCols) => (cols.value = newCols),
      { immediate: true },
    )

    watch(
      () => props.rows,
      (newRows) => rows.value = newRows,
      { immediate: true },
    )

    watch(
      () => props.rows.length,
      (length) => emit('update:rows', { page, length }),
      { immediate: true },
    )

    watch(rowsOnPage, (value) => {
      if (value * unref(page) > unref(totalRowsCount)) {
        page.value = Math.ceil(unref(totalRowsCount) / value)
        emit('update:page', unref(page))
      }
    })

    const onSelectAll = (value: boolean) => {
      isAllRowsChecked.value = value
      unref(rows).forEach((row) => (row.checked = value))
    }

    const onSelect = (rows: any[]) => {
      checkedRows.value = rows
      emit('select:row', unref(checkedRows))
    }

    const onPrevPage = (num: number) => {
      if (unref(page) === 1) {
        return
      }

      page.value = unref(page) > 1 ? unref(page) + num : unref(page)
      emit('update:page', unref(page))
    }

    const onNextPage = (num: number) => {
      if (unref(totalRowsCount) - unref(page) * unref(rowsOnPage) <= 0) {
        return
      }

      page.value += num
      emit('update:page', unref(page))
    }

    const onSort = (col: TableColumn & TableColumnProps) => {
      if (col.sorted) {
        col.sorted = !col.sorted

        return sortColumn(col)
      }

      unref(cols).forEach((c: any) => (c.sorted = col.key === c.key))

      sortColumn(col)
    }

    const sortColumn = (col: TableColumn & TableColumnProps) => {
      /**
       * if emit is equal true
       * just emit the event
       */
      if (col.onSort) {
        return col.onSort(col)
      }

      if (!col.sorted) {
        return unref(rows)?.reverse()
      }

      const executor =
        col.sort ||
        ((a, b) => {
          if (col.format) return col.format(a) > col.format(b) ? 1 : -1
          if (col.sorted) return a[col.key] > b[col.key] ? 1 : -1
        })

      unref(rows)?.sort(executor as any)
    }

    const onFilter = ({ value, col }: TableFilterParams) => {
      if (col.onFilter) {
        return onFilter({ value, col })
      }

      if (!value && filters[col.key]) {
        delete filters[col.key]
      }

      if (value) {
        filters[col.key] = value
      }

      if (col.filter) {
        return (rows.value = col.filter({ value, col }))
      }

      if (props.customFilter) {
        return props.customFilter(filters as any)
      }

      if (!Object.keys(filters).length) {
        return (rows.value = props.rows)
      }

      rows.value = filterRows(props.rows, props.cols)
      page.value = 1
    }

    const onSelectRowsCount = (count: number) => {
      rowsOnPage.value = count

      emit('update:rows-count', unref(rowsOnPage))
    }

    const filterRows = <T, C extends TableColumn>(rows: T[], cols: C[]) => {
      const filterKeys = Object.keys(filters)

      return rows.reduce((acc, row) => {
        const rowResults: T[] = []

        filterKeys.forEach((key) => {
          const { format } = cols.find((col) => col.key === key) as TableColumn

          const value = format ? format(row) : row[key]

          const rowKeyValue = `${ value }`.toLowerCase()
          const filterValue = `${ filters[key] }`.toLowerCase()

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

    const genTableTools = (): VNode => {
      const propsData = { class: 'v-data-table__toolbar' }

      return h('div', propsData, {
        default: () => slots.toolbar && slots.toolbar(),
      })
    }

    const genTableHeader = (): VNode => {
      const propsData = {
        cols: unref(cols),
        color: props.color,
        showCheckbox: props.showCheckbox,
        dark: props.dark,
        align: props.align,
        showSequence: props.showSequence,
        options: unref(headerOptions),
        onFilter,
        onSort,
        onSelectAll,
      }

      const content = unref(cols).reduce((acc, col) => {
        const slotName = `${ col.key }-filter`

        if (col && slots[slotName]) {
          acc[slotName] = addScopedSlot(slotName, slots)
        }

        return acc
      }, {} as any)

      content.header = addScopedSlot('header', slots)

      return h(VDataTableHeader, propsData, content)
    }

    const genTableBody = (): VNode => {
      const propsData = {
        cols: unref(cols),
        rows: unref(rows),
        page: unref(page),
        rowsOnPage: unref(rowsOnPage),
        checkAllRows: unref(isAllRowsChecked),
        showCheckbox: props.showCheckbox,
        align: props.align,
        dark: props.dark,
        showSequence: props.showSequence,
        color: props.color,
        onSelect,
        ['onClick:row']: (e) => emit('click:row', e),
        ['onDblclick:row']: (e) => emit('dblclick:row', e),
        ['onContextmenu:row']: (e) => emit('contextmenu:row', e),
      }

      const content = props.cols.reduce((acc, col) => {
        if (col && slots[col.key]) {
          acc[col.key] = addScopedSlot(col.key, slots)
        }
        return acc
      }, {})

      return h(VDataTableBody, propsData, content)
    }

    const genTableFooter = (): VNode => {
      const propsData = {
        pages: unref(pages),
        page: unref(page),
        firstOnPage: unref(firstOnPage),
        lastOnPage: unref(lastOnPage),
        rowsOnPage: unref(rowsOnPage),
        rowsLength: unref(totalRowsCount),
        options: unref(footerOptions),
        onPrevPage,
        onNextPage,
        onSelectRowsCount,
      }

      const content = slots['pagination-text']
        ? {
          ['pagination-text']: () =>
            slots['pagination-text']?.({
              start: unref(firstOnPage),
              last: unref(lastOnPage),
              length: unref(totalRowsCount),
            }),
        }
        : ''

      return h(VDataTableFooter, propsData, content)
    }

    const genTableInner = (): VNode => {
      const propsData = {
        class: 'v-data-table__inner',
      }

      return h('div', propsData, [genTableHeader(), genTableBody()])
    }

    return () => {
      const propsData = {
        class: unref(classes),
        style: unref(styles),
      }

      return h('div', propsData, [
        slots.toolbar && genTableTools(),
        genTableInner(),
        genTableFooter(),
      ])
    }
  },
})
