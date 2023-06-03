// Vue API
import { computed, defineComponent, h, ref, PropType, unref } from 'vue'

// Components
import { VIcon } from '../VIcon'
import { VButton } from '../VButton'
import { VMenu } from '../VMenu'

// Effects
import { useColors } from '../../composables/use-colors'

import { useIcons } from '../../composables/use-icons'
// Types
import { VNode } from 'vue'
import { IDataTableFooterOptions } from './types'

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
    options: Object as PropType<IDataTableFooterOptions>,
  } as any,

  emits: [
    'select-rows-count',
    'next-page',
    'prev-page',
  ],

  setup(props, { emit, slots }): () => VNode {
    const defaultRowsPerPageOptions = [5, 10, 15, 20]

    const {
      setBackgroundCssColor,
      setBackgroundClassNameColor,
      setTextClassNameColor,
      setTextCssColor,
    } = useColors()
    const { icons } = useIcons()

    const activator = ref<Maybe<HTMLElement>>(null)

    const rowsCountText = computed<string>(() => `${ props.firstOnPage } - ${ props.lastOnPage } of ${ props.rowsLength }`)
    const rowsPerPageOptions = computed(() => props.options.counts?.rowsPerPageOptions || defaultRowsPerPageOptions)

    const changeTableRowsPage = async (isNext) => {
      const { onNext, onPrev } = props.options.pagination

      const params = { page: props.page, count: props.rowsOnPage }

      isNext && onNext && await onNext(params)
      !isNext && onPrev && await onPrev(params)

      const event = isNext ? 'next-page' : 'prev-page'

      emit(event, isNext ? 1 : -1)
    }

    const genPaginationButton = (isNext = false): VNode => {
      const btnColor = props.options?.pagination?.buttonsColor || 'primary'
      const contentColor = props.options.contentColor || 'white'

      const disableIf = props.options?.pagination?.disableIf &&
        (
          (isNext && props.lastOnPage >= props.rowsLength) ||
          (!isNext && props.firstOnPage === 1)
        )

      return h(VButton, {
        width: 42,
        color: btnColor,
        elevation: 3,
        disabled: disableIf,
        text: disableIf,
        onClick: () => changeTableRowsPage(isNext),
      }, {
        default: () =>
          h(VIcon, {
            icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
            color: disableIf ? 'grey lighten-1' : contentColor,
          }),
      })
    }

    const genPaginationPageDisplay = (): VNode => {
      const displayColor = props.options?.pagination?.displayColor || 'primary'

      return h(VButton, {
        width: 42,
        style: { margin: '0 10px' },
        color: displayColor,
        elevation: 3,
      }, { default: () => props.page })
    }

    const genRowsCountSelectList = (): VNode => {
      const color = props.options?.counts?.displayColor || 'primary'
      const contentColor = props.options.contentColor || 'white'

      return h('div', {
          class: {
            'v-data-table__rows-count-list': true,
            ...(color ? setBackgroundClassNameColor(color) : {}),
            ...(contentColor ? setTextClassNameColor(contentColor) : {}),
          },
          style: {
            ...(color ? setBackgroundCssColor(color) : {}),
            ...(contentColor ? setTextCssColor(contentColor) : {}),
          },
        }, unref(rowsPerPageOptions).map((it) => h('div', {
          class: 'v-data-table__rows-count-item',
          onClick: () => emit('select-rows-count', it),
        }, [it])),
      )
    }

    const genMenu = () => h(VMenu, {
      activator: activator.value!,
      maxHeight: 240,
      zIndex: 12,
      openOnClick: true,
    }, {
      default: () => genRowsCountSelectList(),
    })


    const genRowsCountField = () => h('div', {
      class: 'v-data-table__rows-count-value',
      textColor: props.options.contentColor,
    }, props.rowsOnPage)


    const genRowsCountSelect = () => {
      const displayColor = props.options?.counts?.displayColor || 'primary'

      return h(VButton, {
        color: displayColor,
        ref: activator,
      }, {
        default: () => [
          genRowsCountField(),
          activator.value && genMenu(),
        ],
      })
    }

    const genRowsCountSelectCaption = (): VNode => {
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
        props.options?.counts?.rowsPerPageText || 'Rows per page',
      )
    }

    const genRowsCountSelectBlock = (): VNode => {
      return h('div', { class: 'v-data-table__pagination-select' }, [
        genRowsCountSelectCaption(),
        genRowsCountSelect(),
      ])
    }

    const genPagesCountDisplay = (): VNode => {
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

      return h(
        'div',
        propsData,
        (props.rowsLength && slots['pagination-text']?.()) ||
        (props.rowsLength && rowsCountText.value) ||
        '-',
      )
    }

    const genPaginationButtonsBlock = (): VNode => {
      return h('div', { class: { 'v-data-table__pagination-route': true } }, [
        genPaginationButton(),
        genPaginationPageDisplay(),
        genPaginationButton(true),
      ])
    }

    const genPaginationBlock = (): VNode => {
      return h('div', { class: 'v-data-table__pagination' }, [
        genRowsCountSelectBlock(),
        genPagesCountDisplay(),
        genPaginationButtonsBlock(),
      ])
    }

    emit('select-rows-count', unref(rowsPerPageOptions)[0])

    return () => h('div', {
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
    }, genPaginationBlock())
  },
})
