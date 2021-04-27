// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VCheckbox } from '../VCheckbox'
import { VDataTableCell } from './VDataTableCell'
import { VTextField } from '../VTextField'

// Directives
import { vShow } from 'vue'
import { clickOutside } from '../../directives/v-click-outside'

// Types
import { VNode } from 'vue'
import { Column } from '../../types'

// Services
import { FaIcons } from '../../services/icons'

export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',

  props: {
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    align: String,
    filterColor: String,
    ...colorProps(),
  } as any,

  emits: ['sort', 'filter', 'check-all', 'update:cols'],

  setup(props, { emit }) {
    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    const cols = computed<Column[]>(() => [...props.cols])

    function onSort(item) {
      emit('sort', item)
    }

    function onInput($value, item) {
      item.filtered = !!$value

      emit('filter', { value: $value, col: item })
    }

    function addFilter(item) {
      if (item.addFilter) return
      item.addFilter = true
    }

    function genSortButton(item) {
      return h(VIcon, {
        clickable: true,
        class: {
          'v-data-table-col__actions-sort': true,
          'v-data-table-col__actions-sort--active': item.sorted,
        },
        size: 14,
        icon: FaIcons.$arrowUp,
        color: props.dark ? 'white' : '',
        onClick: () => onSort(item),
      })
    }

    function genFilterButton(item) {
      return h(VIcon, {
        clickable: true,
        class: {
          'v-data-table-col__actions-filter': true,
          'v-data-table-col__actions-filter--active': item.filtered,
        },
        size: 14,
        icon: FaIcons.$filter,
        color: props.dark ? 'white' : '',
        onClick: () => addFilter(item),
      })
    }

    function genHeaderActions(item) {
      return h(
        'span',
        {
          class: {
            'v-data-table-col__actions': true,
          },
        },
        [
          item.sortable && genSortButton(item),
          item.filterable && genFilterButton(item),
        ]
      )
    }

    function genFilterInput(item) {
      return h(VTextField, {
        label: 'insert',
        dark: props.dark,
        color: props.dark ? 'white' : '',
        prependIcon: FaIcons.$search,
        clearable: true,
        onInput: ($value) => onInput($value, item),
      })
    }

    function genFilterHeader(item) {
      return h(
        'span',
        {
          class: {
            'v-data-table-col__filter-header': true,
          },
        },
        item.title
      )
    }

    function genFilterWrapper(item) {
      const color = props.filterColor || props.color
      const directive = item.addFilter
        ? {
            handler: () => setTimeout(() => (item.addFilter = false)),
            closeConditional: false,
          }
        : undefined

      const propsData = {
        class: {
          'v-data-table-col__filter': true,
        },
      }

      return (
        item.filterable &&
        withDirectives(
          h('div', setBackground(color, propsData), [
            genFilterHeader(item),
            genFilterInput(item),
          ]),
          [
            [clickOutside, directive],
            [vShow, item.addFilter],
          ]
        )
      )
    }

    function genHeaderTitle(item) {
      return h(
        'div',
        {
          class: 'v-data-table-col__title',
        },
        [item.title]
      )
    }

    function genNumberCell() {
      return h(
        VDataTableCell,
        {
          align: 'center',
          class: 'v-data-table-col__number',
          dark: props.dark,
          width: 50,
        },
        {
          default: () => '№',
        }
      )
    }

    function genCheckboxCell() {
      return h(
        VDataTableCell,
        {
          align: 'center',
          class: 'v-data-table-col__checkbox',
          dark: props.dark,
          color: props.color,
          width: 50,
        },
        {
          default: () =>
            h(VCheckbox, {
              color: props.dark ? 'white' : '',
              onChecked: (e) => emit('check-all', e),
            }),
        }
      )
    }

    function genHeaderCell(item) {
      return h(
        VDataTableCell,
        {
          dark: props.dark,
          class: {
            'v-data-table-col': true,
            'v-data-table-col--sorted': item.sorted,
          },
          color: props.color,
          width: item.width,
          resizeable: item.resizeable,
          align: props.align || item.align,
          onResize: ($size) => (item.width = $size),
        },
        {
          default: () => [
            genHeaderTitle(item),
            genHeaderActions(item),
            genFilterWrapper(item),
          ],
        }
      )
    }

    function genHeaderCells() {
      const cells: VNode[] = []

      props.numbered && cells.push(genNumberCell())
      props.checkbox && cells.push(genCheckboxCell())

      cols.value!.forEach((item: Column) => {
        item.width = item.width || props.colWidth

        if (!item.hasOwnProperty('show')) {
          item.show = !item.show
        }

        item.show && cells.push(genHeaderCell(item))
      })

      return cells
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h(
        'div',
        props.color ? setBackground(props.color, propsData) : propsData,
        genHeaderCells()
      )
    }
  },
})
