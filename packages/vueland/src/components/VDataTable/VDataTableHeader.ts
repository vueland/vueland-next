// Vue API
import { h, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { useColors } from '../../composables/use-colors'
import { useIcons } from '../../composables/use-icons'

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
import { TableColumn } from '../../../types'
import { useTransition } from '../../composables/use-transition'
import { transitions } from '../../services/transitions'

export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',

  props: {
    showSequence: Boolean,
    showCheckbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125,
    },
    align: String,
    options: Object,
  } as any,

  emits: ['sort', 'filter', 'select-all', 'update:cols'],

  setup(props, { emit, slots }) {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()
    const { icons } = useIcons()
    const _cache = {}

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
      ...(props.options.color
        ? setBackgroundClassNameColor(props.options.color)
        : {}),
    }))

    const styles = computed(() => ({
      ...(props.options.color
        ? setBackgroundCssColor(props.options.color)
        : {}),
    }))

    const computedContentColor = computed<string>(() => {
      return props.options.dark
        ? props.options?.contentColor || 'white'
        : props.options?.contentColor
    })

    const cols = computed<TableColumn[]>(() => [...props.cols])

    const onSort = (col) => {
      emit('sort', col)
    }

    const onInput = ($value, col) => {
      col.filtered = !!$value
      _cache[col.title] = $value
      console.log(_cache)
      emit('filter', { value: $value, col })
    }

    const showFilter = (item) => {
      if (item.showFilter) return
      item.showFilter = true
    }

    const genSortButton = (col) => {
      const classes = {
        'v-data-table-col__actions-sort': true,
        'v-data-table-col__actions-sort--active': col.sorted,
      }

      const propsData = {
        clickable: true,
        class: classes,
        icon: icons.$arrowUp,
        onClick: () => onSort(col),
      }

      return h(VIcon, propsData)
    }

    const genFilterButton = (col) => {
      const classes = {
        'v-data-table-col__actions-filter': true,
        'v-data-table-col__actions-filter--active': col.filtered,
      }

      const propsData = {
        clickable: true,
        class: classes,
        icon: icons.$filter,
        color: !col.cellClass ? computedContentColor.value : '',
        onClick: () => showFilter(col),
      }

      return h(VIcon, propsData)
    }

    const genHeaderActions = (col) => {
      return h('span', { class: 'v-data-table-col__actions' }, [
        col.sortable && genSortButton(col),
        col.filterable && genFilterButton(col),
      ])
    }

    const genFilterInput = (col) => {
       const propsData = {
        modelValue: _cache[col.title],
        label: 'search',
        dark: props.options.dark,
        color: !col.cellClass ? computedContentColor.value : '',
        prependIcon: icons.$search,
        clearable: true,
        onInput: ($value) => onInput($value, col),
      }

      return h(VTextField, propsData)
    }

    const genFilterWrapper = (col) => {
      const color = props.options.dark
        ? props.options?.color || 'grey darken-3'
        : props.options?.color || 'white'

      const slotName = `${ col.key }-filter`

      const filterSlot = slots[slotName] && slots[slotName]!({
        filter: (event) => onInput(event, col),
      })

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
          [col.cellClass]: !!col.cellClass,
          ...(color ? setBackgroundClassNameColor(color) : {}),
        },
        style: {
          ...(color ? setBackgroundCssColor(color) : {}),
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

    const genHeaderTitle = (col): VNode => {
      return h('div', { class: 'v-data-table-col__title' }, col.title)
    }

    const genNumberCell = (): VNode => {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__number': true,
          [props.cellClass]: !!props.cellClass,
        },
        contentColor: computedContentColor.value,
        color: props.options.color,
        width: 50,
      }

      return h(VDataTableCell, propsData, { default: () => '№' })
    }

    const genCheckboxCell = () => {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__checkbox': true,
          [props.cellClass]: !!props.cellClass,
        },
        dark: props.options.dark,
        contentColor: computedContentColor.value,
        color: props.options.color,
        width: 50,
      }

      const content = {
        default: () =>
          h(VCheckbox, {
            color: computedContentColor.value,
            onChange: (e) => emit('select-all', e),
          }),
      }

      return h(VDataTableCell, propsData, content)
    }

    const genHeaderCell = (col) => {
      const propsData = {
        dark: props.options.dark,
        class: {
          'v-data-table-col': true,
          'v-data-table-col--sorted': col.sorted,
          [col.cellClass]: !!col.cellClass,
        },
        contentColor: !col.cellClass ? computedContentColor.value : '',
        color: !col.cellClass ? props.options.color : '',
        width: col.width,
        resizeable: col.resizeable,
        resizerColor: props.options?.resizerColor,
        align: col.align || props.align,
        onResize: ($size) => (col.width = $size),
      }

      return h(VDataTableCell, propsData, {
        default: () => [
          genHeaderTitle(col),
          genHeaderActions(col),
          useTransition(genFilterWrapper(col), transitions.FADE),
        ],
      })
    }

    const genHeaderChildren = () => {
      const children: VNode[] = []
      const headerSlot = slots.header && slots.header(props)

      props.showSequence && children.push(genNumberCell())
      props.showCheckbox && children.push(genCheckboxCell())

      cols.value!.forEach((col: TableColumn) => {
        col.width = col.width || props.colWidth

        if (!col.hasOwnProperty('show')) {
          col.show = !col.show
        }

        !headerSlot![0].children &&
        col.show &&
        children.push(genHeaderCell(col))
      })

      headerSlot![0].children && children.push(headerSlot as any)

      return children
    }

    return () => {
      const propsData = {
        class: classes.value,
        style: styles.value,
      }

      return h('div', propsData, genHeaderChildren())
    }
  },
})
