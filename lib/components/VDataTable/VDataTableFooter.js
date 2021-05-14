import "../../../src/components/VDataTable/VDataTableFooter.scss";
import { watch, computed, defineComponent, h } from 'vue';
import { VIcon } from '../VIcon';
import { VButton } from '../VButton';
import { VSelect } from '../VSelect';
import { useColors } from '../../effects/use-colors';
import { useIcons } from '../../effects/use-icons';
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
    options: Object
  },
  emits: ['last-page', 'correct-page', 'select-rows-count', 'next-page', 'prev-page'],

  setup(props, {
    emit,
    slots
  }) {
    const {
      setTextColor,
      setBackground
    } = useColors();
    const {
      icons,
      iconSize
    } = useIcons('xs');
    const paginationDisplayText = computed(() => {
      return `${props.firstOnPage} - ${props.lastOnPage}
        of ${props.rowsLength}`;
    });
    const isLastPage = computed(() => {
      return props.page >= props.pages;
    });
    watch(() => isLastPage.value, to => to && emit('last-page'));

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return;
      const event = isNext ? 'next-page' : 'prev-page';
      emit(event, isNext ? 1 : -1);
    }

    function genPaginationButton(isNext = false) {
      var _props$options, _props$options$pagina;

      const btnColor = ((_props$options = props.options) === null || _props$options === void 0 ? void 0 : (_props$options$pagina = _props$options.pagination) === null || _props$options$pagina === void 0 ? void 0 : _props$options$pagina.buttonsColor) || (props.options.dark ? 'white' : 'primary');
      const disableIf = isNext && props.lastOnPage >= props.rowsLength || !isNext && props.firstOnPage === 1;
      const propsData = {
        width: 42,
        color: btnColor,
        text: props.options.dark,
        elevation: 3,
        disabled: disableIf,
        onClick: () => changeTableRowsPage(isNext)
      };
      return h(VButton, propsData, {
        default: () => h(VIcon, {
          icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
          color: props.options.dark ? 'white' : '',
          size: iconSize
        })
      });
    }

    function genPaginationPageDisplay() {
      var _props$options2, _props$options2$pagin;

      const displayColor = ((_props$options2 = props.options) === null || _props$options2 === void 0 ? void 0 : (_props$options2$pagin = _props$options2.pagination) === null || _props$options2$pagin === void 0 ? void 0 : _props$options2$pagin.displayColor) || (props.options.dark ? 'white' : 'blue lighten-1');
      const propsData = {
        width: 42,
        style: {
          margin: '0 10px'
        },
        color: displayColor,
        text: props.options.dark,
        elevation: 3
      };
      return h(VButton, propsData, {
        default: () => props.page
      });
    }

    function genRowsCountSelect() {
      const propsData = {
        items: props.options.rowsPerPageOptions,
        dark: props.options.dark,
        listColor: props.options.color,
        value: props.rowsOnPage,
        onSelect: e => emit('select-rows-count', e)
      };
      return h(VSelect, propsData);
    }

    function genRowsCountSelectCaption() {
      var _props$options3;

      const propsData = {
        class: 'v-data-table__pagination-label'
      };
      const color = props.options.dark ? 'white' : '';
      return h('span', color ? setTextColor(color, propsData) : propsData, ((_props$options3 = props.options) === null || _props$options3 === void 0 ? void 0 : _props$options3.rowsPerPageText) || 'Rows per page');
    }

    function genRowsCountSelectBlock() {
      return h('div', {
        class: 'v-data-table__pagination-select'
      }, [genRowsCountSelectCaption(), genRowsCountSelect()]);
    }

    function genPagesCountDisplay() {
      const propsData = {
        class: 'v-data-table__pagination-pages'
      };
      const color = props.options.dark ? 'white' : '';
      props.pageCorrection && emit('correct-page', -props.pageCorrection);
      return h('div', color ? setTextColor(color, propsData) : propsData, props.rowsLength && slots.paginationText && slots.paginationText() || props.rowsLength && paginationDisplayText.value || '-');
    }

    function genPaginationButtonsBlock() {
      return h('div', {
        class: {
          'v-data-table__pagination-route': true
        }
      }, [genPaginationButton(), genPaginationPageDisplay(), genPaginationButton(true)]);
    }

    function genPaginationBlock() {
      return h('div', {
        class: 'v-data-table__pagination'
      }, [genRowsCountSelectBlock(), genPagesCountDisplay(), genPaginationButtonsBlock()]);
    }

    return () => {
      var _props$options4;

      const propsData = {
        class: {
          'v-data-table__footer': true
        }
      };
      return h('div', (_props$options4 = props.options) !== null && _props$options4 !== void 0 && _props$options4.color ? setBackground(props.options.color, propsData) : propsData, genPaginationBlock());
    };
  }

});
//# sourceMappingURL=VDataTableFooter.js.map