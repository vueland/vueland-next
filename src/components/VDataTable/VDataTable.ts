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
    itemsPerPage: [String, Number],
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
    const cols = ref<any[] | null>([])
    const rows = ref<any[] | null>([])

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    watch(() => props.cols,
      to => cols.value = copyWithoutRef(to),
      { immediate: true },
    )

    watch(() => props.rows,
      to => rows.value = copyWithoutRef(to),
      { immediate: true },
    )

    function onTableSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted
        rows.value!.reverse()
        return
      }

      cols.value!.forEach(c => c.sorted = col.key === c.key)

      rows.value!.sort((a, b) => {
        if (a[col.key] > b[col.key]) return 1
        return -1
      })
    }

    function genTableBody() {
      const rowKeys = props.cols.map(col => col.key)

      return h(VDataTableBody, {
          cols: cols.value,
          rows: rows.value,
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
        onSort: onTableSort,
      })
    }

    function genTableFooter() {
      return h(VDataTableFooter, {})
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
        [genTableInner(),
          genTableFooter()],
      )
    }
  },
})
