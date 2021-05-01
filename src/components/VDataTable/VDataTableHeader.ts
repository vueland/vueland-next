// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'
import { useIcons } from '../../effects/use-icons'
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
    contentColor: String,
    ...colorProps(),
  } as any,

  emits: ['sort', 'filter', 'check-all', 'update:cols'],

  setup(props, { emit }) {
    const { setBackground } = useColors()
    const { icons, iconSize } = useIcons('s')

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    const computedColor = computed<string>(() => {
      return props.contentColor || (props.dark ? 'white' : '')
    })

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
      const classes = {
        'v-data-table-col__actions-sort': true,
        'v-data-table-col__actions-sort--active': item.sorted,
      }

      const propsData = {
        clickable: true,
        class: classes,
        size: iconSize,
        icon: icons.$arrowUp,
        color: computedColor.value,
        onClick: () => onSort(item),
      }

      return h(VIcon, propsData)
    }

    function genFilterButton(item) {
      const classes = {
        'v-data-table-col__actions-filter': true,
        'v-data-table-col__actions-filter--active': item.filtered,
      }

      const propsData = {
        clickable: true,
        class: classes,
        size: iconSize,
        icon: icons.$filter,
        color: computedColor.value,
        onClick: () => addFilter(item),
      }

      return h(VIcon, propsData)
    }

    function genHeaderActions(item) {
      return h('span', { class: 'v-data-table-col__actions' }, [
        item.sortable && genSortButton(item),
        item.filterable && genFilterButton(item),
      ])
    }

    function genFilterInput(item) {
      const propsData = {
        label: 'input value',
        dark: props.dark,
        color: computedColor.value,
        prependIcon: icons.$search,
        clearable: true,
        onInput: ($value) => onInput($value, item),
      }

      return h(VTextField, propsData)
    }

    function genFilterHeader(item) {
      return h('span', { class: 'v-data-table-col__filter-header' }, item.title)
    }

    function genFilterWrapper(item) {
      const colorClass = props.dark ? 'grey darken-3' : 'grey lighten-2'
      const filterClass = item.filterClass || colorClass
      const directive = item.addFilter
        ? {
          handler: () => setTimeout(() => (item.addFilter = false)),
          closeConditional: false,
        }
        : undefined

      const propsData = {
        class: {
          'v-data-table-col__filter': true,
          [filterClass]: true,
        },
      }

      return (
        item.filterable &&
        withDirectives(
          h('div', propsData, [
            genFilterHeader(item),
            genFilterInput(item),
          ]),
          [
            [clickOutside, directive],
            [vShow, item.addFilter],
          ],
        )
      )
    }

    function genHeaderTitle(item) {
      return h('div', { class: 'v-data-table-col__title' }, item.title)
    }

    function genNumberCell() {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__number': true,
          [props.cellClass]: !!props.cellClass,
        },
        color: computedColor.value,
        width: 50,
      }

      return h(VDataTableCell, propsData, { default: () => '№' })
    }

    function genCheckboxCell() {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__checkbox': true,
          [props.cellClass]: !!props.cellClass,
        },
        dark: props.dark,
        color: props.color,
        width: 50,
      }

      const content = {
        default: () => h(VCheckbox, {
          color: computedColor.value,
          onChecked: (e) => emit('check-all', e),
        }),
      }

      return h(VDataTableCell, propsData, content)
    }

    function genHeaderCell(item) {
      const propsData = {
        dark: props.dark,
        class: {
          'v-data-table-col': true,
          'v-data-table-col--sorted': item.sorted,
          [item.cellClass]: !!item.cellClass,
        },
        color: computedColor.value,
        width: item.width,
        resizeable: item.resizeable,
        align: item.align || props.align,
        onResize: ($size) => (item.width = $size),
      }

      return h(VDataTableCell, propsData, {
        default: () => [
          genHeaderTitle(item),
          genHeaderActions(item),
          genFilterWrapper(item),
        ],
      })
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
        genHeaderCells(),
      )
    }
  },
})
