// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, ref, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VCheckbox } from '../VCheckbox'
import { VDataTableCell } from './VDataTableCell'
import { VTextField } from '../VTextField'

// Directives
import { vShow } from 'vue'
import { vClickOutside } from '../../directives/v-click-outside'

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
    ...colorProps(),
  } as any,

  emits: [
    'sort',
    'filter',
    'check-all',
  ],

  setup(props, { emit }) {
    const cols = ref<any[] | null>([])

    const { setBackground } = useColors()

    cols.value = props.cols

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__header': true,
    }))

    function onSort(item) {
      emit('sort', item)
    }

    function onInput($value, item) {
      if (!item.filtered) {
        item.filtered = true
      }

      if (!$value) item.filtered = false

      emit('filter', { value: $value, col: item })
    }

    function addFilter(item) {
      item.addFilter = !item.addFilter
    }

    function genSortButton(item) {
      return h(VIcon, {
        clickable: true,
        class: 'v-data-table-col__actions-sort',
        size: 14,
        icon: FaIcons.$arrowUp,
        color: item.sorted ? 'green accent-3' : props.dark ? 'white' : '',
        onClick: () => onSort(item),
      })
    }

    function genFilterButton(item) {
      return h(VIcon, {
        clickable: true,
        class: 'v-data-table-col__actions-filter',
        size: 12,
        icon: FaIcons.$filter,
        color: item.filtered ? 'green accent-3' : props.dark ? 'white' : '',
        onClick: () => addFilter(item),
      })
    }

    function genHeaderActions(item) {
      return h('span', {
        class: {
          'v-data-table-col__actions': true,
        },
      }, [
        item.sortable && genSortButton(item),
        item.filterable && genFilterButton(item),
      ])
    }

    function genFilterInput(item) {
      return h(VTextField, {
        label: 'insert',
        dark: props.dark,
        color: props.dark ? 'white' : '',
        prependIcon: FaIcons.$search,
        clearable: true,
        onInput: $value => onInput($value, item),
      })
    }

    function genFilterHeader(item) {
      return h('span', {
        class: {
          'v-data-table-col__filter-header': true,
        },
      }, item.title)
    }

    function genFilterWrapper(item) {
      const directive = item.addFilter ? {
        handler: () => item.addFilter = false,
        closeConditional: false,
      } : undefined

      const propsData = {
        class: {
          'v-data-table-col__filter': true,
        },
      }

      return item.filterable && withDirectives(h('div',
        setBackground(props.color, propsData),
        [
          genFilterHeader(item),
          genFilterInput(item),
        ],
      ), [[vClickOutside, directive], [vShow, item.addFilter]])
    }

    function genHeaderTitle(item) {
      return h('div', {
          class: 'v-data-table-col__title',
        }, [
          item.title,
        ],
      )
    }

    function genHeaderCell(item) {
      return h(VDataTableCell, {
        dark: props.dark,
        class: {
          'v-data-table-col': true,
          'v-data-table-col--sorted': item.sorted,
        },
        width: item.width,
        resizeable: item.resizeable,
        align: props.align || item.align,
        onResize: $size => item.width = $size,
      }, {
        default: () => [
          genHeaderTitle(item),
          genHeaderActions(item),
          genFilterWrapper(item),
        ],
      })
    }

    function genHeaderCells() {
      const cells: VNode[] = []

      props.numbered && cells.push(
        h(VDataTableCell, {
            align: 'center',
            dark: props.dark,
            width: 50,
          }, {
            default: () => '№',
          },
        ),
      )

      props.checkbox && cells.push(
        h(VDataTableCell, {
            align: 'center',
            dark: props.dark,
            width: 50,
          }, {
            default: () => h(VCheckbox, {
              color: props.dark ? 'white' : '',
              onChecked: (e) => emit('check-all', e),
            }),
          },
        ),
      )

      cols.value!.forEach((item: Column) => {
        item.width = item.width || props.colWidth

        cells.push(genHeaderCell(item))
      })

      return cells
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        props.color ? setBackground(props.color, propsData) : propsData,
        genHeaderCells(),
      )
    }
  },
})
