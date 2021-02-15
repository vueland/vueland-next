// Styles
import './VDataTable.scss'

// Vue API
import { h, watch, computed, defineComponent, ref } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableModal } from './VDataTableModal'
import { VDataTableFooter } from './VDataTableFooter'
import { VCheckbox } from '../VCheckbox'
import { VButton } from '../VButton'

// Helpers
import { toComparableStringFormat } from './helpers'

// Types
import { VNode } from 'vue'
import { Column, TableFilter } from '../../types'

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
    const cols = ref<Column[]>([])
    const rows = ref<any[]>([])
    const checkedRows = ref<any[]>([])
    const rowsPerPage = ref<number>(20)
    const page = ref<number>(1)
    const isAllRowsChecked = ref<boolean>(false)
    const settings = ref({
      cols: false,
    })

    const filters = {}

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    const pages = computed<number>(() => {
      return Math.ceil(rows.value?.length / rowsPerPage.value)
    })

    watch(
      () => props.cols,
      to => (cols.value = to),
      { immediate: true },
    )

    watch(
      () => props.rows,
      to => (rows.value = to),
      { immediate: true },
    )

    function onCheckAll(value: boolean) {
      isAllRowsChecked.value = value
      rows.value.forEach(row => (row.checked = value))
    }

    function onCheck<T>(rows: T[]) {
      checkedRows.value = rows
      emit('checked', checkedRows.value)
    }

    function onPrevTable(num) {
      page.value = page.value > 1 ? page.value + num : page.value
    }

    function onNextTable(num: number) {
      if (rows.value.length - page.value * rowsPerPage.value > 0) {
        page.value += num
      }
    }

    function onSort(col: Column) {
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

    function onFilter({ value, col }: TableFilter) {
      if (!value && filters[col.key]) delete filters[col.key]

      if (value) filters[col.key] = value

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return (rows.value = props.rows)
        }
        rows.value = filterRows(props.rows)
      } else {
        emit('filter', filters)
      }

      page.value = 1
    }

    function onSelectRowsCount(count: number) {
      rowsPerPage.value = count
    }

    function colsSettings(val: boolean, col: Column) {
      col.show = val
      emit('cols-settings', cols.value)
    }

    function sortColumn(col: Column) {
      rows.value!.sort((a, b) => {
        if (col.format) {
          if (col.format(a) > col.format(b)) return 1
        } else {
          if (a[col.key] > b[col.key]) return 1
        }
        return -1
      })
    }

    function filterRows<T>(rows: T[]) {
      const filterKeys = Object.keys(filters)

      return rows.reduce((acc, row) => {
        const rowResults: any[] = []

        filterKeys.forEach(key => {
          const { format } = cols.value!.find(col => col.key === key) as Column
          const value = format ? format(row) : row[key]

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
      }, [] as T[])
    }

    function genTableTools(): VNode {
      return h('div', {
          class: {
            'v-data-table__toolbar': true,
          },
        },
        {
          default: () => slots.toolbar && slots.toolbar(),
        },
      )
    }

    function genTableHeader(): VNode {
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

    function genTableBody(): VNode {
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
          const slotContent = row => {
            const scoped: any = { row }

            if (col.format) {
              scoped.format = col.format
            }

            return slots[col.key] && slots[col.key]!(scoped)
          }

          if (slots[col.key]) acc[col.key] = slotContent

          return acc
        }, {}),
      )
    }

    function genTableFooter(): VNode {
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
        onResetPage: val => (page.value += val),
        onColsSettings: () => (settings.value.cols = true),
      })
    }

    function genTableInner(): VNode {
      return h(
        'div',
        {
          class: {
            'v-data-table__inner': true,
          },
        },
        [genTableHeader(), genTableBody()],
      )
    }

    function genColsSettingsCheckboxes(): VNode[] {
      return cols.value.map(col => h(VCheckbox, {
        label: col.title,
        modelValue: col.show,
        dark: props.dark,
        color: props.dark ? 'white' : '',
        style: { margin: '10px 0' },
        onChecked: val => colsSettings(val, col),
      }))
    }

    function genColsSettingsActions(): VNode {
      return h(VButton, {
        dark: props.dark,
        color: props.dark ? 'white' : 'primary',
        outlined: props.dark,
        label: 'ok',
        onClick: () => (settings.value.cols = false),
      })
    }

    function genColsSettingsModal(): VNode {
      return h(
        VDataTableModal,
        {
          dark: props.dark,
          color: props.color,
          show: settings.value.cols,
        },
        {
          title: () => 'Cols Settings',
          content: () => genColsSettingsCheckboxes(),
          actions: () => genColsSettingsActions(),
        },
      )
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div', setBackground(props.color, propsData), [
        slots.toolbar && genTableTools(),
        genTableInner(),
        genTableFooter(),
        genColsSettingsModal(),
      ])
    }
  },
})
