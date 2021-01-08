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

// Helpers
import { copyWithoutRef } from '../../helpers'
import { toComparableStringFormat } from './helpers'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    headerColor: String,
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    toolbar: Boolean,
    align: String,
    rowIdKey: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  // TODO - toolbar slot replace
  // TODO - state out pagination

  setup(props, { slots, emit }) {
    const cols = ref<any[]>([])
    const rows = ref<any[]>([])
    const rowsOnTable = ref<any[]>([])
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
      to => {
        rows.value = copyWithoutRef(to)
        rowsOnTable.value = rows.value
      },
      { immediate: true },
    )

    function onCheckAll(value) {
      isAllRowsChecked.value = value
      rows.value.forEach(row => row.checked = value)
    }

    function onCheck(rows) {
      checkedRows.value = rows
      props.stateOut && emit('checked', checkedRows.value)
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
        rowsOnTable.value!.reverse()
      } else {
        cols.value!.forEach(c => {
          c.sorted = col.key === c.key
        })

        sortColumn(col)
      }
    }

    function onFilter({ value, col }): any {
      if (!props.stateOut) {
        if (!value) {
          delete filters[col.key]

          if (!Object.keys(filters).length) {
            return rowsOnTable.value = rows.value
          }
        }

        if (value) filters[col.key] = value

        rowsOnTable.value = filterRows(rows.value)
      } else {
        emit('filter', { value, col })
      }

      page.value = 1
    }

    function onSelectRowsCount(count) {
      rowsPerPage.value = count
    }

    function sortColumn(col) {
      rowsOnTable.value!.sort((a, b) => {
        if (a[col.key] > b[col.key]) return 1
        return -1
      })
    }

    function filterRows(rows) {
      const filterKeys = Object.keys(filters)

      let value
      let rowKeyValue
      let filterKeyValue

      return rows.reduce((acc, row) => {
        const rowResults: any[] = []

        filterKeys.forEach(key => {

          if (typeof row[key] === 'string') {
            value = row[key]
          } else {
            const col = cols.value.find(col => col.key === key)
            value = col.formatter(row)
          }

          rowKeyValue = toComparableStringFormat(value)
          filterKeyValue = toComparableStringFormat(filters[key])

          if (rowKeyValue.includes(filterKeyValue)) {
            rowResults.push(!!row[key])
          }
        })

        if (
          rowResults.length === filterKeys.length &&
          rowResults.every(v => !!v)
        ) {
          acc.push(row)
        }

        return acc
      }, [])
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
      const rowKeys = props.cols.map(col => col.key)

      return h(
        VDataTableBody,
        {
          cols: cols.value,
          rows: rowsOnTable.value,
          page: page.value,
          rowsPerPage: rowsPerPage.value,
          checkbox: props.checkbox,
          checkAllRows: isAllRowsChecked.value,
          align: props.align,
          dark: props.dark,
          numbered: props.numbered,
          onCheck,
        },

        rowKeys.reduce((acc, slot) => {
          const slotContent = (row = {}) => {
            return slots[slot] && slots[slot]!({ row })
          }

          if (slots[slot]) acc[slot] = slotContent

          return acc
        }, {}),
      )
    }

    function genTableFooter() {
      return h(VDataTableFooter, {
        pages: pages.value,
        page: page.value,
        counts: [10, 15, 20, 25],
        rowsCount: rowsOnTable.value?.length,
        rowsPerPage: rowsPerPage.value,
        dark: props.dark,
        color: props.color,
        toolbar: props.toolbar,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
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
        genTableInner(),
        genTableFooter(),
      ])
    }
  },
})
