// Styles
import './VDataTable.scss'

// Vue API
import { h, watch, computed, defineComponent, ref } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VDataTableModal } from './VDataTableModal'
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableFooter } from './VDataTableFooter'

// Helpers
import { copyWithoutRef } from '../../helpers'
import { toComparableStringFormat } from './helpers'

// Types
import { TableModalOptions } from '../../types'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    headerColor: String,
    align: String,
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  setup(props, { slots, emit }) {
    const cols = ref<any[]>([])
    const rows = ref<any[]>([])
    const page = ref<number>(1)
    const rowsPerPage = ref<number>(20)
    const checkedRows = ref<any[]>([])
    const filteredRows = ref<any[] | null>(null)
    const isAllRowsChecked = ref<boolean>(false)
    const showModal = ref<boolean>(false)

    const modal = ref<TableModalOptions>({
      title: '',
      fields: [],
      actions: [],
    })

    const filters = {}

    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    watch(
      () => props.cols,
      to => (cols.value = to),
      { immediate: true },
    )

    watch(
      () => props.rows,
      to => (rows.value = copyWithoutRef(to)),
      { immediate: true },
    )

    function onCheckAll(value) {
      isAllRowsChecked.value = value
      rows.value.forEach(row => row.checked = value)
    }

    function onCheck(rows) {
      checkedRows.value = rows
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
      page.value = 1

      if (!props.stateOut) {
        if (!value) {
          delete filters[col.key]

          if (!Object.keys(filters).length) {
            return filteredRows.value = null
          }
        }

        if (value) filters[col.key] = value

        filteredRows.value = filterRows(rows.value)
      } else {
        emit('filter', { value, col })
      }
    }

    function closeModal() {
      showModal.value = false
    }

    function saveNewRow() {
      const row = {}

      modal.value.fields!.forEach(it => {
        row[it.key] = it.props.value
        it.props.value = ''
      })

      if (props.stateOut) {
        emit('add', row)
      } else {
        rows.value.push(row)
      }

      closeModal()
    }

    function onAddNewRow() {
      modal.value.title = 'add new row'

      const actions = [
        {
          color: 'primary',
          label: 'save',
          validate: true,
          onClick: saveNewRow,
        },
        {
          color: 'warning',
          label: 'close',
          onClick: closeModal,
        },
      ]

      modal.value.fields = cols.value.reduce((acc, col) => {
        col.useOnCreate && acc.push(col)
        return acc
      }, [])

      modal.value.actions! = actions

      showModal.value = true
    }

    function onSelectRowsCount(count) {
      rowsPerPage.value = count
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
          rows: filteredRows.value || rows.value,
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

          if (slotContent()) acc[slot] = slotContent

          return acc
        }, {}),
      )
    }

    function genTableFooter() {
      return h(VDataTableFooter, {
        pages: Math.ceil(rows.value!.length / rowsPerPage.value),
        page: page.value,
        counts: [10, 15, 20, 25],
        rowsPerPage: rowsPerPage.value,
        dark: props.dark,
        color: props.color,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
        onAdd: onAddNewRow,
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

    function genTableModal() {
      return h(VDataTableModal, {
        modelValue: showModal.value,
        transition: 'scale-in',
        form: modal.value,
        color: props.color,
        dark: props.dark,
      })
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div', setBackground(props.color, propsData), [
        genTableInner(),
        genTableFooter(),
        genTableModal(),
      ])
    }
  },
})
