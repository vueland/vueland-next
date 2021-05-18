import "../../../src/components/VDataTable/VDataTable.scss";
import { h, watch, computed, defineComponent, reactive } from 'vue';
import { useColors } from '../../effects/use-colors';
import { VDataTableHeader } from './VDataTableHeader';
import { VDataTableBody } from './VDataTableBody';
import { VDataTableFooter } from './VDataTableFooter';
import { addScopedSlot } from '../../helpers';
export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    dark: Boolean,
    showSequence: Boolean,
    showCheckbox: Boolean,
    align: {
      type: String,
      validator: val => ['left', 'center', 'right'].includes(val)
    },
    color: {
      type: String,
      default: 'white'
    },
    headerOptions: {
      type: Object,
      default: () => ({})
    },
    footerOptions: {
      type: Object,
      default: () => ({
        rowsPerPageOptions: [5, 10, 15, 20]
      })
    },
    customFilter: Function
  },
  emits: ['last-page', 'select:row', 'click:row', 'dblclick:row', 'contextmenu:row'],

  setup(props, {
    slots,
    emit
  }) {
    const data = reactive({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsOnPage: 20,
      page: 1,
      isAllRowsChecked: false
    });
    const {
      setBackground
    } = useColors();
    const filters = {};
    const classes = computed(() => ({
      'v-data-table': true
    }));
    const headerOptions = computed(() => ({
      color: props.color,
      dark: props.dark,
      ...props.headerOptions
    }));
    const footerOptions = computed(() => ({
      color: props.color,
      dark: props.dark,
      ...props.footerOptions
    }));
    const pages = computed(() => {
      var _data$rows;

      return Math.ceil(((_data$rows = data.rows) === null || _data$rows === void 0 ? void 0 : _data$rows.length) / data.rowsOnPage);
    });
    const firstOnPage = computed(() => {
      return data.page === 1 ? 1 : (data.page - 1) * data.rowsOnPage + 1;
    });
    const lastOnPage = computed(() => {
      var _data$rows2, _data$rows3;

      return data.page * data.rowsOnPage > ((_data$rows2 = data.rows) === null || _data$rows2 === void 0 ? void 0 : _data$rows2.length) ? (_data$rows3 = data.rows) === null || _data$rows3 === void 0 ? void 0 : _data$rows3.length : data.page * data.rowsOnPage;
    });
    const pageCorrection = computed(() => {
      var _data$rows4;

      if ((data.page - 1) * data.rowsOnPage > ((_data$rows4 = data.rows) === null || _data$rows4 === void 0 ? void 0 : _data$rows4.length)) {
        var _data$rows5;

        return Math.ceil((data.page * data.rowsOnPage - ((_data$rows5 = data.rows) === null || _data$rows5 === void 0 ? void 0 : _data$rows5.length)) / data.rowsOnPage);
      }

      return null;
    });
    watch(() => props.cols, to => data.cols = Object.assign([], to), {
      immediate: true
    });
    watch(() => props.rows, to => data.rows = Object.assign([], to), {
      immediate: true
    });

    function onSelectAll(value) {
      data.isAllRowsChecked = value;
      data.rows.forEach(row => row.checked = value);
    }

    function onSelect(rows) {
      data.checkedRows = rows;
      emit('select:row', data.checkedRows);
    }

    function onPrevPage(num) {
      data.page = data.page > 1 ? data.page + num : data.page;
    }

    function onNextPage(num) {
      if (data.rows.length - data.page * data.rowsOnPage > 0) {
        data.page += num;
      }
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        return sortColumn(col);
      }

      data.cols.forEach(c => c.sorted = col.key === c.key);
      sortColumn(col);
    }

    function sortColumn(col) {
      if (!col.sorted) {
        return data.rows.reverse();
      }

      const executor = col.sort || ((a, b) => {
        if (col.format) return col.format(a) > col.format(b) ? 1 : -1;
        if (col.sorted) return a[col.key] > b[col.key] ? 1 : -1;
      });

      data.rows.sort(executor);
    }

    function onFilter({
      value,
      col
    }) {
      if (!value && filters[col.key]) delete filters[col.key];
      if (value) filters[col.key] = value;

      if (col.filter) {
        return data.rows = col.filter({
          value,
          col
        });
      }

      if (props.customFilter) {
        return props.customFilter(filters);
      }

      if (!Object.keys(filters).length) {
        return data.rows = props.rows;
      }

      data.rows = filterRows(props.rows, props.cols);
      data.page = 1;
    }

    function onSelectRowsCount(count) {
      data.rowsOnPage = count;
    }

    function filterRows(rows, cols) {
      const filterKeys = Object.keys(filters);
      return rows.reduce((acc, row) => {
        const rowResults = [];
        filterKeys.forEach(key => {
          const {
            format
          } = cols.find(col => col.key === key);
          const value = format ? format(row) : row[key];
          const rowKeyValue = `${value}`.toLowerCase();
          const filterValue = `${filters[key]}`.toLowerCase();

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(row[key]);
          }
        });

        if (rowResults.length === filterKeys.length && rowResults.every(value => !!value)) {
          acc.push(row);
        }

        return acc;
      }, []);
    }

    function genTableTools() {
      const propsData = {
        class: 'v-data-table__toolbar'
      };
      return h('div', propsData, {
        default: () => slots.toolbar && slots.toolbar()
      });
    }

    function genTableHeader() {
      const propsData = {
        cols: data.cols,
        color: props.color,
        showCheckbox: props.showCheckbox,
        dark: props.dark,
        align: props.align,
        showSequence: props.showSequence,
        options: headerOptions.value,
        onFilter,
        onSort,
        onSelectAll
      };
      const content = data.cols.reduce((acc, col) => {
        const slotName = `${col.key}-filter`;

        if (col && slots[slotName]) {
          acc[slotName] = addScopedSlot(slotName, slots);
        }

        return acc;
      }, {});
      content.header = addScopedSlot('header', slots);
      return h(VDataTableHeader, propsData, content);
    }

    function genTableBody() {
      const propsData = {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsOnPage: data.rowsOnPage,
        showCheckbox: props.showCheckbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        showSequence: props.showSequence,
        color: props.color,
        onSelect,
        ['onClick:row']: e => emit('click:row', e),
        ['onDblclick:row']: e => emit('dblclick:row', e),
        ['onContextmenu:row']: e => emit('contextmenu:row', e)
      };
      const content = props.cols.reduce((acc, col) => {
        if (col && slots[col.key]) {
          acc[col.key] = addScopedSlot(col.key, slots);
        }

        return acc;
      }, {});
      return h(VDataTableBody, propsData, content);
    }

    function genTableFooter() {
      var _data$rows6;

      const propsData = {
        pages: pages.value,
        page: data.page,
        firstOnPage: firstOnPage.value,
        lastOnPage: lastOnPage.value,
        pageCorrection: pageCorrection.value,
        rowsOnPage: data.rowsOnPage,
        rowsLength: (_data$rows6 = data.rows) === null || _data$rows6 === void 0 ? void 0 : _data$rows6.length,
        dark: props.dark,
        options: footerOptions.value,
        onPrevPage,
        onNextPage,
        onSelectRowsCount,
        onLastPage: () => emit('last-page', props.rows.length),
        onCorrectPage: val => data.page += val
      };
      const content = slots.paginationText ? {
        paginationText: () => {
          var _data$rows7;

          return slots.paginationText && slots.paginationText({
            start: firstOnPage.value,
            last: lastOnPage.value,
            length: (_data$rows7 = data.rows) === null || _data$rows7 === void 0 ? void 0 : _data$rows7.length
          });
        }
      } : '';
      return h(VDataTableFooter, propsData, content);
    }

    function genTableInner() {
      const propsData = {
        class: 'v-data-table__inner'
      };
      return h('div', propsData, [genTableHeader(), genTableBody()]);
    }

    return () => {
      const propsData = {
        class: classes.value
      };
      return h('div', setBackground(props.color, propsData), [slots.toolbar && genTableTools(), genTableInner(), genTableFooter()]);
    };
  }

});
//# sourceMappingURL=VDataTable.js.map