import "../../../src/components/VDataTable/VDataTableFooter.scss";
import { watch, computed, defineComponent, h } from 'vue';
import { VIcon } from '../VIcon';
import { VButton } from '../VButton';
import { VSelect } from '../VSelect';
import { FaIcons } from '../../services/icons';
import { colorProps, useColors } from '../../effects/use-colors';
export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {
    dark: Boolean,
    pages: Number,
    page: Number,
    rowsPerPage: Number,
    tableRowsCount: Number,
    allRowsCount: Number,
    counts: Array,
    ...colorProps()
  },
  emits: ['last-page', 'reset-page', 'select', 'next', 'prev'],

  setup(props, {
    emit
  }) {
    const {
      setTextColor
    } = useColors();
    const lastOnPage = computed(() => {
      const {
        page,
        tableRowsCount,
        rowsPerPage
      } = props;
      return page * rowsPerPage > tableRowsCount ? tableRowsCount : page * rowsPerPage;
    });
    const firstOnPage = computed(() => {
      const {
        page,
        rowsPerPage
      } = props;
      return page === 1 ? 1 : (page - 1) * rowsPerPage + 1;
    });
    const paginationDisplay = computed(() => {
      return props.tableRowsCount ? `${firstOnPage.value} - ${lastOnPage.value} from ${props.tableRowsCount}` : '-';
    });
    const isLastPage = computed(() => {
      return props.page >= props.pages;
    });
    const overPages = computed(() => {
      const {
        page,
        tableRowsCount,
        rowsPerPage
      } = props;

      if ((page - 1) * rowsPerPage > tableRowsCount) {
        return Math.ceil((page * rowsPerPage - tableRowsCount) / rowsPerPage);
      }

      return null;
    });
    watch(() => isLastPage.value, to => {
      if (to && props.tableRowsCount === props.allRowsCount) {
        emit('last-page', props.allRowsCount);
      }
    });

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return;
      const event = isNext ? 'next' : 'prev';
      emit(event, isNext ? 1 : -1);
    }

    function genPaginationButton(isNext) {
      return h(VButton, {
        width: 42,
        color: props.dark ? 'white' : 'primary',
        text: props.dark,
        elevation: 3,
        onClick: () => changeTableRowsPage(isNext)
      }, {
        default: () => h(VIcon, {
          icon: isNext ? FaIcons.$arrowRight : FaIcons.$arrowLeft,
          color: props.dark ? 'white' : '',
          size: 18
        })
      });
    }

    function genPageDisplay() {
      return h(VButton, {
        width: 42,
        style: {
          margin: '0 10px'
        },
        color: props.dark ? 'white' : 'blue lighten-1',
        text: props.dark,
        elevation: 3
      }, {
        default: () => props.page
      });
    }

    function genSelect() {
      return h(VSelect, {
        items: props.counts,
        modelValue: props.rowsPerPage,
        dark: props.dark,
        listColor: props.color,
        onSelect: e => emit('select', e)
      });
    }

    function genSelectCaption() {
      const propsData = {
        class: {
          'v-data-table__pagination-label': true
        }
      };
      const color = props.dark ? 'white' : '';
      return h('span', color ? setTextColor(color, propsData) : propsData, 'Rows per page');
    }

    function genPageItemsSelect() {
      return h('div', {
        class: 'v-data-table__pagination-select'
      }, [genSelectCaption(), genSelect()]);
    }

    function genPagesCountDisplay() {
      const propsData = {
        class: {
          'v-data-table__pagination-pages': true
        }
      };
      const color = props.dark ? 'white' : '';
      overPages.value && emit('reset-page', -overPages.value);
      return h('div', color ? setTextColor(color, propsData) : propsData, paginationDisplay.value);
    }

    function genPaginationButtonsBlock() {
      return h('div', {
        class: {
          'v-data-table__pagination-route': true
        }
      }, [genPaginationButton(false), genPageDisplay(), genPaginationButton(true)]);
    }

    function genPaginationBlock() {
      return h('div', {
        class: 'v-data-table__pagination'
      }, [genPageItemsSelect(), genPagesCountDisplay(), genPaginationButtonsBlock()]);
    }

    return () => h('div', {
      class: 'v-data-table__footer'
    }, genPaginationBlock());
  }

});
//# sourceMappingURL=VDataTableFooter.js.map