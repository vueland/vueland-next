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
    showSequence: Boolean,
    showCheckbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    align: String,
    options: Object,
    ...colorProps(),
  } as any,

  emits: ['sort', 'filter', 'check-all', 'update:cols'],

  setup(props, { emit, slots }) {
    const { setBackground } = useColors()
    const { icons, iconSize } = useIcons('s')

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    const isDarkMode = computed<boolean>(() => {
      if (props.options?.dark !== undefined) return props.options.dark
      if (!props.options?.contentColor) return props.dark
      return false
    })

    const computedContentColor = computed<string>(() => {
      return isDarkMode.value ? 'white' : props.options?.contentColor
    })

    const computedColor = computed<string>(() => {
      return props.options?.color || props.color
    })

    const cols = computed<Column[]>(() => [...props.cols])

    function onSort(item) {
      emit('sort', item)
    }

    function onInput($value, item) {
      item.filtered = !!$value
      emit('filter', { value: $value, col: item })
    }

    function showFilter(item) {
      if (item.showFilter) return
      item.showFilter = true
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
        color: !item.cellClass ? computedContentColor.value : '',
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
        color: !item.cellClass ? computedContentColor.value : '',
        onClick: () => showFilter(item),
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
        dark: isDarkMode.value,
        color: computedContentColor.value,
        prependIcon: icons.$search,
        clearable: true,
        onInput: ($value) => onInput($value, item),
      }

      return h(VTextField, propsData)
    }

    function genFilterWrapper(col) {
      const colorClass = isDarkMode.value ? 'grey darken-3' : 'white'
      const slotName = `${col.key}-filter`

      const filterSlot =
        slots[slotName] && slots[slotName]!((event) => onInput(event, col))

      const filterClass = col.filterClass || colorClass

      const directive = col.showFilter
        ? {
            handler: () => setTimeout(() => (col.showFilter = false)),
            closeConditional: false,
          }
        : undefined

      const propsData = {
        class: {
          'v-data-table-col__filter': !filterSlot,
          'v-data-table-col__custom-filter': !!filterSlot,
          'elevation-5': true,
          [filterClass]: true,
        },
      }

      return (
        col.filterable &&
        withDirectives(h('div', propsData, filterSlot || genFilterInput(col)), [
          [clickOutside, directive],
          [vShow, col.showFilter],
        ])
      )
    }

    function genHeaderTitle(col) {
      return h('div', { class: 'v-data-table-col__title' }, col.title)
    }

    function genNumberCell() {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__number': true,
          [props.cellClass]: !!props.cellClass,
        },
        contentColor: computedContentColor.value,
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
        dark: isDarkMode.value,
        contentColor: computedContentColor.value,
        color: computedColor.value,
        width: 50,
      }

      const content = {
        default: () =>
          h(VCheckbox, {
            color: computedContentColor.value,
            onChecked: (e) => emit('check-all', e),
          }),
      }

      return h(VDataTableCell, propsData, content)
    }

    function genHeaderCell(col) {
      const propsData = {
        dark: isDarkMode.value,
        class: {
          'v-data-table-col': true,
          'v-data-table-col--sorted': col.sorted,
          [col.cellClass]: !!col.cellClass,
        },
        contentColor: !col.cellClass ? computedContentColor.value : '',
        color: !col.cellClass ? computedColor.value : '',
        width: col.width,
        resizeable: col.resizeable,
        align: col.align || props.align,
        onResize: ($size) => (col.width = $size),
      }

      return h(VDataTableCell, propsData, {
        default: () => [
          genHeaderTitle(col),
          genHeaderActions(col),
          genFilterWrapper(col),
        ],
      })
    }

    function genHeaderCells() {
      const cells: VNode[] = []

      props.showSequence && cells.push(genNumberCell())
      props.showCheckbox && cells.push(genCheckboxCell())

      cols.value!.forEach((col: Column) => {
        col.width = col.width || props.colWidth

        if (!col.hasOwnProperty('show')) {
          col.show = !col.show
        }

        col.show && cells.push(genHeaderCell(col))
      })

      return cells
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h(
        'div',
        computedColor.value
          ? setBackground(computedColor.value, propsData)
          : propsData,
        genHeaderCells()
      )
    }
  },
})
