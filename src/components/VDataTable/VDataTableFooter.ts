// Vue API
import { watch, computed, defineComponent, h } from 'vue'

// Components
import { VIcon } from '../VIcon'
import { VButton } from '../VButton'
import { VSelect } from '../VSelect'

// Effects
import { useColors } from '../../composable/use-colors'
import { useIcons } from '../../composable/use-icons'

// Types
import { VNode } from 'vue'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    pages: Number,
    page: Number,
    firstOnPage: Number,
    lastOnPage: Number,
    pageCorrection: Number,
    rowsLength: Number,
    rowsOnPage: Number,
    options: Object,
  } as any,

  emits: [
    'last-page',
    'correct-page',
    'select-rows-count',
    'next-page',
    'prev-page',
  ],

  setup(props, { emit, slots }): () => VNode {
    const {
      setBackgroundCssColor,
      setBackgroundClassNameColor,
      setTextClassNameColor,
      setTextCssColor,
    } = useColors()
    const { icons } = useIcons()

    const paginationDisplayText = computed<string>(() => {
      return `${ props.firstOnPage } - ${ props.lastOnPage }
        of ${ props.rowsLength }`
    })

    const isLastPage = computed<boolean>(() => {
      return props.page >= props.pages
    })

    watch(
      () => isLastPage.value,
      (to) => to && emit('last-page'),
    )

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return

      const event = isNext ? 'next-page' : 'prev-page'
      emit(event, isNext ? 1 : -1)
    }

    function genPaginationButton(isNext = false): VNode {
      const btnColor =
        props.options?.pagination?.buttonsColor ||
        (props.options.dark ? 'white' : 'primary')

      const disableIf =
        (isNext && props.lastOnPage >= props.rowsLength) ||
        (!isNext && props.firstOnPage === 1)

      const propsData = {
        width: 42,
        color: btnColor,
        text: props.options.dark,
        elevation: 3,
        disabled: disableIf,
        onClick: () => changeTableRowsPage(isNext),
      }

      return h(VButton, propsData, {
        default: () =>
          h(VIcon, {
            icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
            color: props.options.dark ? 'white' : '',
          }),
      })
    }

    function genPaginationPageDisplay(): VNode {
      const displayColor =
        props.options?.pagination?.displayColor ||
        (props.options.dark ? 'white' : 'blue lighten-1')

      const propsData = {
        width: 42,
        style: { margin: '0 10px' },
        color: displayColor,
        text: props.options.dark,
        elevation: 3,
      }

      return h(VButton, propsData, { default: () => props.page })
    }

    function genRowsCountSelect(): VNode {
      const propsData = {
        items: props.options.rowsPerPageOptions,
        textColor: props.options.contentColor,
        modelValue: props.rowsOnPage,
        hints: false,
        showExpIcon: false,
        onSelect: (e) => emit('select-rows-count', e),
      }

      return h(VSelect, propsData)
    }

    function genRowsCountSelectCaption(): VNode {
      const color = props.options.contentColor

      const propsData = {
        class: {
          'v-data-table__pagination-label': true,
          ...(color ? setTextClassNameColor(color) : {}),
        },
        style: {
          ...(color ? setTextCssColor(color) : {}),
        },
      }

      return h(
        'span',
        propsData,
        props.options?.rowsPerPageText || 'Rows per page',
      )
    }

    function genRowsCountSelectBlock(): VNode {
      return h('div', { class: 'v-data-table__pagination-select' }, [
        genRowsCountSelectCaption(),
        genRowsCountSelect(),
      ])
    }

    function genPagesCountDisplay(): VNode {
      const color = props.options.contentColor

      const propsData = {
        class: {
          'v-data-table__pagination-pages': true,
          ...(color ? setTextClassNameColor(color) : {}),
        },
        style: {
          ...(color ? setTextCssColor(color) : {}),
        },
      }

      props.pageCorrection && emit('correct-page', -props.pageCorrection)

      return h(
        'div',
        propsData,
        (props.rowsLength && slots.paginationText && slots.paginationText()) ||
        (props.rowsLength && paginationDisplayText.value) ||
        '-',
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
          ...(props.options.color
            ? setBackgroundClassNameColor(props.options.color)
            : {}),
        },
        style: {
          ...(props.options.color
            ? setBackgroundCssColor(props.options.color)
            : {}),
        },
      }

      return h('div', propsData, genPaginationBlock())
    }
  },
})
