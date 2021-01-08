// Styles
import './VDataTableFooter.scss'

// Vue API
import { computed, defineComponent, h } from 'vue'

// Components
import { VIcon } from '../VIcon'
import { VButton } from '../VButton'
import { VSelect } from '../VSelect'

// Services
import { FaIcons } from '@/services/icons'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    dark: Boolean,
    toolbar: Boolean,
    pages: Number,
    page: Number,
    rowsPerPage: Number,
    rowsCount: Number,
    counts: Array,
    ...colorProps(),
  } as any,

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const lastOnPage = computed<number>(() => {
      const { page, rowsCount, rowsPerPage } = props
      return page * rowsPerPage > rowsCount ? rowsCount : page * rowsPerPage
    })

    const firstOnPage = computed<number>(() => {
      const { page, rowsPerPage } = props
      return page === 1 ? 1 : (page - 1) * rowsPerPage + 1
    })

    const paginationDisplay = computed<string>(() => {
      return props.rowsCount ? `${firstOnPage.value} - 
      ${lastOnPage.value} from ${props.rowsCount}` : '-'
    })

    const overPages = computed<number | null>(() => {
      const { page, rowsCount, rowsPerPage } = props

      if ((page - 1) * rowsPerPage > rowsCount) {
        return Math.ceil(((page - 1) * rowsPerPage - rowsCount) / rowsPerPage)
      }

      return null
    })

    function genAddButton() {
      return h(VButton, {
          class: 'v-data-table__add',
          color: props.dark ? 'white' : 'primary',
          width: 42,
          outlined: props.dark,
          elevation: 3,
          onClick: () => emit('add-row'),
        },
        {
          default: () =>
            h(VIcon, {
              icon: FaIcons.$add,
              size: 20,
              color: props.dark ? 'white' : '',
            }),
        },
      )
    }

    function genDeleteButton() {
      return h(VButton, {
          class: 'v-data-table__delete',
          color: props.dark ? 'white' : 'danger',
          width: 42,
          outlined: props.dark,
          elevation: 3,
          onClick: () => emit('delete-row'),
        },
        {
          default: () =>
            h(VIcon, {
              icon: FaIcons.$delete,
              size: 20,
              color: props.dark ? 'white' : '',
            }),
        },
      )
    }

    function genEditButton() {
      return h(VButton, {
          class: 'v-data-table__edit',
          color: props.dark ? 'white' : 'primary',
          width: 42,
          outlined: props.dark,
          elevation: 3,
          onClick: () => emit('edit-row'),
        },
        {
          default: () =>
            h(VIcon, {
              icon: FaIcons.$edit,
              size: 20,
              color: props.dark ? 'white' : '',
            }),
        },
      )
    }

    function genTableTools() {
      return h('div', {
          class: {
            'v-data-table__toolbar': true,
          },
        },
        {
          default: () => [
            genAddButton(),
            genEditButton(),
            genDeleteButton(),
            slots.toolbar && slots.toolbar(),
          ],
        },
      )
    }

    function changeTableRowsPage(isNext) {
      const event = isNext ? 'next' : 'prev'
      emit(event, isNext ? 1 : -1)
    }

    function genPaginationButton(isNext) {
      return h(VButton, {
          width: 42,
          color: props.dark ? 'white' : 'primary',
          outlined: props.dark,
          onClick: () => changeTableRowsPage(isNext),
        },
        {
          default: () =>
            h(VIcon, {
              icon: isNext ? FaIcons.$arrowRight : FaIcons.$arrowLeft,
              color: props.dark ? 'white' : '',
              size: 18,
            }),
        },
      )
    }

    function genPageDisplay() {
      return h(VButton, {
          width: 42,
          style: { margin: '0 10px' },
          color: props.dark ? 'white' : 'blue lighten-1',
          outlined: props.dark,
        },
        {
          default: () => props.page,
        },
      )
    }

    function genSelect() {
      return h(VSelect, {
        items: props.counts,
        modelValue: props.rowsPerPage,
        dark: props.dark,
        listColor: props.color,
        onSelect: e => emit('select', e),
      })
    }

    function genSelectCaption() {
      const propsData = {
        class: {
          'v-data-table__pagination-label': true,
        },
      }
      const color = props.dark ? 'white' : ''

      return h(
        'span',
        color ? setTextColor(color, propsData) : propsData,
        'Rows per page',
      )
    }

    function genPageItemsSelect() {
      return h(
        'div',
        {
          class: 'v-data-table__pagination-select',
        },
        [genSelectCaption(), genSelect()],
      )
    }

    function genPagesCountDisplay() {
      const propsData = {
        class: {
          'v-data-table__pagination-pages': true,
        },
      }

      const color = props.dark ? 'white' : ''

      overPages.value && emit('resetPage', -overPages.value)

      return h(
        'div',
        color ? setTextColor(color, propsData) : propsData,
        paginationDisplay.value,
      )
    }

    function genPaginationButtonsBlock() {
      return h('div', {
          class: {
            'v-data-table__pagination-route': true,
          },
        }, [
          genPaginationButton(false),
          genPageDisplay(),
          genPaginationButton(true),
        ],
      )
    }

    function genPaginationBlock() {
      return h('div', {
          class: 'v-data-table__pagination',
        }, [
          genPageItemsSelect(),
          genPagesCountDisplay(),
          genPaginationButtonsBlock(),
        ],
      )
    }

    return () => h('div', {
        class: 'v-data-table__footer',
      }, [
        props.toolbar && genTableTools(),
        genPaginationBlock(),
      ],
    )
  },
})
