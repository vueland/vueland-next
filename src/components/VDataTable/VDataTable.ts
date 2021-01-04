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

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    headerColor: String,
    align: String,
    dark: Boolean,
    numbered: Boolean,
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  setup(props, { slots }) {
    const cols = ref<any[]>([])
    const rows = ref<any[]>([])

    // const colsOnTable = ref<any[]>([])

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

    watch(() => props.cols,
      to => cols.value = copyWithoutRef(to),
      { immediate: true },
    )

    watch(() => props.rows,
      to => rows.value = copyWithoutRef(to),
      { immediate: true },
    )

    function onPrevTable(num) {
      page.value = page.value > 1 ? page.value + num : page.value
    }

    function onNextTable(num) {
      if ((rows.value.length - (page.value * rowsPerPage.value)) > 0) {
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

    function genTableBody() {
      const rowKeys = props.cols.map(col => col.key)

      return h(VDataTableBody, {
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
        }, {}))
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: cols.value,
        color: props.headerColor || props.color,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onSort,
      })
    }

    function genTableFooter() {
      return h(VDataTableFooter, {
        pages: Math.ceil(rows.value!.length / rowsPerPage.value),
        page: page.value,
        counts: [5, 10, 15, 20],
        dark: props.dark,
        onPrev: onPrevTable,
        onNext: onNextTable,
      })
    }

    function genTableInner() {
      return h('div', {
        class: {
          'v-data-table__inner': true,
        },
      }, [
        genTableHeader(),
        genTableBody(),

      ])
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        setBackground(props.color, propsData),
        [
          genTableInner(),
          genTableFooter(),
        ],
      )
    }
  },
})
