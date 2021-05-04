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

// Types
import { VNode } from 'vue'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    dark: Boolean,
    pages: Number,
    page: Number,
    firstOnPage: Number,
    lastOnPage: Number,
    pageCorrection: Number,
    rowsLength: Number,
    rowsOnPage: Number,
    options: Object,
    ...colorProps(),
  } as any,

  emits: [
    'last-page',
    'correct-page',
    'select-rows-count',
    'next-table-page',
    'prev-table-page',
  ],

  setup(props, { emit, slots }): () => VNode {
    const { setTextColor, setBackground } = useColors()
    const { icons, iconSize } = useIcons('xs')

    const paginationDisplayText = computed<string>(() => {
      return `${props.firstOnPage} - ${props.lastOnPage}
        of ${props.tableRowsCount}`
    })

    const isLastPage = computed<boolean>(() => {
      return props.page >= props.pages
    })

    watch(
      () => isLastPage.value,
      (to) => to && emit('last-page')
    )

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return

      const event = isNext ? 'next-table-page' : 'prev-table-page'
      emit(event, isNext ? 1 : -1)
    }

    function genPaginationButton(isNext = false): VNode {
      const btnColor =
        props.options?.pagination?.buttonsColor ||
        (props.dark ? 'white' : 'primary')

      const disableIf =
        (isNext && props.lastOnPage >= props.rowsLength) ||
        (!isNext && props.firstOnPage === 1)

      const propsData = {
        width: 42,
        color: btnColor,
        text: props.dark,
        elevation: 3,
        disabled: disableIf,
        onClick: () => changeTableRowsPage(isNext),
      }

      return h(VButton, propsData, {
        default: () =>
          h(VIcon, {
            icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
            color: props.dark ? 'white' : '',
            size: iconSize,
          }),
      })
    }

    function genPaginationPageDisplay(): VNode {
      const displayColor =
        props.options?.pagination?.displayColor ||
        (props.dark ? 'white' : 'blue lighten-1')

      const propsData = {
        width: 42,
        style: { margin: '0 10px' },
        color: displayColor,
        text: props.dark,
        elevation: 3,
      }

      return h(VButton, propsData, { default: () => props.page })
    }

    function genRowsCountSelect(): VNode {
      const propsData = {
        items: props.options?.rowsPerPageOptions,
        dark: props.dark,
        listColor: props.options?.color || props.color,
        value: props.rowsOnPage,
        onSelect: (e) => emit('select-rows-count', e),
      }

      return h(VSelect, propsData)
    }

    function genRowsCountSelectCaption(): VNode {
      const propsData = {
        class: 'v-data-table__pagination-label',
      }

      const color = props.dark ? 'white' : ''

      return h(
        'span',
        color ? setTextColor(color, propsData) : propsData,
        props.options?.rowsCountText || 'Rows per page'
      )
    }

    function genRowsCountSelectBlock(): VNode {
      return h('div', { class: 'v-data-table__pagination-select' }, [
        genRowsCountSelectCaption(),
        genRowsCountSelect(),
      ])
    }

    function genPagesCountDisplay(): VNode {
      const propsData = {
        class: 'v-data-table__pagination-pages',
      }

      const color = props.dark ? 'white' : ''

      props.pageCorrection && emit('correct-page', -props.pageCorrection)

      return h(
        'div',
        color ? setTextColor(color, propsData) : propsData,

        (props.rowsLength && slots.paginationText && slots.paginationText()) ||
          (props.tableRowsCount && paginationDisplayText.value) ||
          '-'
      )
    }

    function genPaginationButtonsBlock(): VNode {
      return h('div', { class: { 'v-data-table__pagination-route': true } }, [
        genPaginationButton(),
        genPaginationPageDisplay(),
        genPaginationButton(true),
      ])
    }

    function genPaginationBlock(): VNode {
      return h('div', { class: 'v-data-table__pagination' }, [
        genRowsCountSelectBlock(),
        genPagesCountDisplay(),
        genPaginationButtonsBlock(),
      ])
    }

    return () => {
      const propsData = {
        class: {
          'v-data-table__footer': true,
        },
      }

      return h(
        'div',
        props.options?.color
          ? setBackground(props.options.color, propsData)
          : propsData,
        genPaginationBlock()
      )
    }
  },
})
