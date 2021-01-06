// Styles
import './VDataTableFooter.scss'

// Vue API
import { defineComponent, h } from 'vue'

// Components
import { VIcon } from '../VIcon'
import { VButton } from '../VButton'
import { VSelect } from '../VSelect'

// Services
import { FaIcons } from '@/services/icons'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    dark: Boolean,
    pages: Number,
    counts: Array,
    page: Number,
    color: String,
    rowsPerPage: Number,
  } as any,

  setup(props, { slots, emit }) {

    function genAddButton() {
      return h(VButton, {
        class: 'v-data-table__add',
        color: 'primary',
        width: 42,
      }, {
        default: () => h(VIcon, {
          icon: FaIcons.$add,
          size: 20,
          color: 'white',
        }),
      })
    }

    function genDeleteButton() {
      return h(VButton, {
        class: 'v-data-table__add',
        color: 'danger',
        width: 42,
      }, {
        default: () => h(VIcon, {
          icon: FaIcons.$delete,
          size: 20,
          color: 'white',
        }),
      })
    }

    function genEditButton() {
      return h(VButton, {
        class: 'v-data-table__add',
        color: 'primary',
        width: 42,
      }, {
        default: () => h(VIcon, {
          icon: FaIcons.$edit,
          size: 20,
          color: 'white',
        }),
      })
    }

    function genTableTools() {
      return h('div', {
        class: {
          'v-data-table__toolbar': true,
        },
      }, {
        default: () => [
          genAddButton(),
          genEditButton(),
          genDeleteButton(),
          slots.toolbar && slots.toolbar(),
        ],
      })
    }

    function changeTableRowsPage(isNext) {
      const event = isNext ? 'next' : 'prev'
      emit(event, isNext ? 1 : -1)
    }

    function genButton(isNext) {
      return h(VButton, {
        width: 42,
        color: 'primary',
        onClick: () => changeTableRowsPage(isNext),
      }, {
        default: () => h(VIcon, {
          icon: isNext ? FaIcons.$arrowRight : FaIcons.$arrowLeft,
          color: 'white',
          size: 18,
        }),
      })
    }

    function genPageDisplay() {
      return h('span', {}, props.page)
    }

    function genSelect() {
      return h(VSelect, {
        items: props.counts,
        modelValue: props.rowsPerPage,
        dark: props.dark,
        listColor: props.color,
        style: {
          width: '50px',
          textAlign: 'center',
        },
        onSelect: e => emit('select', e),
      })
    }

    function genSelectCaption() {
      return h('span', {
        class: 'v-data-table__options-label',
      }, 'Rows per page')
    }

    function genPageItemsSelect() {
      return h('div', {
        class: 'v-data-table__options',
      }, [
        genSelectCaption(),
        genSelect(),
      ])
    }

    function genPaginationBlock() {
      return h('div', {
        class: 'v-data-table__footer-pagination',
      }, [
        genPageItemsSelect(),
        genButton(false),
        genPageDisplay(),
        genButton(true),
      ])
    }

    return () => h('div', {
      class: 'v-data-table__footer',
    }, [
      genTableTools(),
      genPaginationBlock(),
    ])
  },
})
