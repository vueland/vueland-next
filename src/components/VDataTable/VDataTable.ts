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
    align: String,
    dark: Boolean,
    numbered: Boolean,
    filterIn: Boolean,
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  setup(props, { slots, emit }) {
    const cols = ref<any[]>([])
    const rows = ref<any[]>([])
    const filters = {}

    const page = ref<number>(1)
    const rowsPerPage = ref<number>(10)

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    const rowsOnTable = computed(() => {
      return rows.value.slice(
        (page.value - 1) * rowsPerPage.value,
        page.value * rowsPerPage.value,
      )
    })

    watch(
      () => props.cols,
      to => (cols.value = copyWithoutRef(to)),
      { immediate: true },
    )

    watch(
      () => props.rows,
      to => (rows.value = copyWithoutRef(to)),
      { immediate: true },
    )

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

    function sortColumn(col) {
      rows.value!.sort((a, b) => {
        if (a[col.key] > b[col.key]) return 1
        return -1
      })
    }

    function filterRows(rows) {
      const filterKeys = Object.keys(filters)

      return rows.reduce((acc, row) => {
        const rowResults: any[] = []

        filterKeys.forEach(key => {
          const rowKeyValue = toComparableStringFormat(row[key])
          const filterKeyValue = toComparableStringFormat(filters[key])

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

    function onFilter({ value, col }) {
      if (props.filterIn) {
        if (!value) {
          delete filters[col.key]

          if (!Object.keys(filters).length) {
            return (rows.value = copyWithoutRef(props.rows))
          }
        }

        if (value) filters[col.key] = value

        rows.value = filterRows(props.rows)
      } else {
        emit('filter', { value, col })
      }
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
          align: props.align,
          dark: props.dark,
          numbered: props.numbered,
        },

        rowKeys.reduce((acc, slot) => {
          const slotContent = (row = {}) => {
            return slots[slot] && slots[slot]!({ row })
          }

          if (slotContent()) acc[slot] = slotContent

          return acc
        }, {}),
      )
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: cols.value,
        color: props.headerColor || props.color,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter,
        onSort,
      })
    }

    function genTableFooter() {
      return h(VDataTableFooter, {
        pages: Math.ceil(rows.value!.length / rowsPerPage.value),
        page: page.value,
        counts: [5, 10, 15, 20],
        dark: props.dark,
        color: props.color,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: $count => (rowsPerPage.value = $count),
      })
    }

    function genTableInner() {
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
