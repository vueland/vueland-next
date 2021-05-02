// Styles
import './VDataTableFooter.scss'

// Vue API
import { watch, computed, defineComponent, h } from 'vue'

// Components
import { VIcon } from '../VIcon'
import { VButton } from '../VButton'
import { VSelect } from '../VSelect'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'
import { useIcons } from '../../effects/use-icons'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    dark: Boolean,
    pages: Number,
    page: Number,
    firstOnPage: Number,
    lastOnPage: Number,
    overPages: Number,
    rowsPerPage: Number,
    tableRowsCount: Number,
    counts: Array,
    options: Object,
    ...colorProps()
  } as any,

  emits: [
    'last-page',
    'reset-page',
    'select',
    'next',
    'prev'
  ],

  setup(props, { emit, slots }) {
    const { setTextColor } = useColors()
    const { icons, iconSize } = useIcons('xs')

    const paginationDisplayText = computed<string>(() => {
      return `${ props.firstOnPage } - ${ props.lastOnPage }
        of ${ props.tableRowsCount }`
    })

    const isLastPage = computed<boolean>(() => {
      return props.page >= props.pages
    })

    watch(
      () => isLastPage.value,
      to => to && emit('last-page')
    )

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return

      const event = isNext ? 'next' : 'prev'
      emit(event, isNext ? 1 : -1)
    }

    function genPaginationButton(isNext) {
      const btnColor = (props.options?.paginationButtonsColor)
        || (props.dark ? 'white' : 'primary')

      return h(
        VButton,
        {
          width: 42,
          color: btnColor,
          text: props.dark,
          elevation: 3,
          onClick: () => changeTableRowsPage(isNext)
        },
        {
          default: () =>
            h(VIcon, {
              icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
              color: props.dark ? 'white' : '',
              size: iconSize
            })
        }
      )
    }

    function genPageDisplay() {
      return h(
        VButton,
        {
          width: 42,
          style: { margin: '0 10px' },
          color: props.dark ? 'white' : 'blue lighten-1',
          text: props.dark,
          elevation: 3
        },
        {
          default: () => props.page
        }
      )
    }

    function genSelect() {
      return h(VSelect, {
        items: props.counts,
        modelValue: props.rowsPerPage,
        dark: props.dark,
        listColor: props.color,
        onSelect: (e) => emit('select', e)
      })
    }

    function genSelectCaption() {
      const propsData = {
        class: {
          'v-data-table__pagination-label': true
        }
      }
      const color = props.dark ? 'white' : ''

      return h(
        'span',
        color ? setTextColor(color, propsData) : propsData,
        props.options?.paginationText || 'Rows per page'
      )
    }

    function genPageItemsSelect() {
      return h('div', { class: 'v-data-table__pagination-select' }, [
        genSelectCaption(),
        genSelect()
      ])
    }

    function genPagesCountDisplay() {
      const propsData = {
        class: {
          'v-data-table__pagination-pages': true
        }
      }

      const color = props.dark ? 'white' : ''

      props.overPages && emit('reset-page', -props.overPages)

      return h(
        'div',
        color ? setTextColor(color, propsData) : propsData,

        (props.tableRowsCount && slots.paginationDisplay && slots.paginationDisplay()) ||
        (props.tableRowsCount && paginationDisplayText.value) || '-'
      )
    }

    function genPaginationButtonsBlock() {
      return h('div', { class: { 'v-data-table__pagination-route': true } }, [
        genPaginationButton(false),
        genPageDisplay(),
        genPaginationButton(true)
      ])
    }

    function genPaginationBlock() {
      return h('div', { class: 'v-data-table__pagination' }, [
        genPageItemsSelect(),
        genPagesCountDisplay(),
        genPaginationButtonsBlock()
      ])
    }

    return () =>
      h('div', { class: 'v-data-table__footer' }, genPaginationBlock())
  }
})
