// Styles
import './VDataTableFooter.scss'

// Vue API
import { defineComponent, h, ref } from 'vue'

// Components
import { VIcon } from '../VIcon'
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
  } as any,

  setup(props, { emit }) {

    const itemsOnPage = ref<number>(10)

    function changePagination(isNext) {
      const event = isNext ? 'next' : 'prev'
      emit(event, isNext ? 1 : -1)
    }

    function genButton(isNext) {
      return h(VIcon, {
        icon: isNext ? FaIcons.$arrowRight : FaIcons.$arrowLeft,
        color: props.dark ? 'white' : '',
        size: 18,
        clickable: true,
        onClick: () => changePagination(isNext),
      })
    }

    function genPageDisplay() {
      return h('span', {}, props.page)
    }

    function genPageItemsSelect() {

      return h(VSelect, {
        items: props.counts,
        modelValue: itemsOnPage.value
      })
    }

    function genButtons() {
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
    }, genButtons())
  },
})
