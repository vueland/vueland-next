import "../../../src/components/VDataTable/VDataTable.scss";
import { h, watch, computed, defineComponent, reactive } from 'vue';
import { useColors } from '../../effects/use-colors';
import { VDataTableHeader } from './VDataTableHeader';
import { VDataTableBody } from './VDataTableBody';
import { VDataTableFooter } from './VDataTableFooter';
import { toComparableStringFormat } from './helpers';
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
    rowsOnTable: {
      type: Array,
      default: () => [10, 15, 20, 25]
    },
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    align: {
      type: String,
      validator: val => ['left', 'center', 'right'].includes(val)
    },
    color: {
      type: String,
      default: 'white'
    },
    headerProps: Object,
    footerProps: Object
  },
  emits: ['checked', 'filter', 'last-page'],

  setup(props, {
    slots,
    emit
  }) {
    const data = reactive({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsPerPage: 20,
      page: 1,
      isAllRowsChecked: false
    });
    const filters = {};
    const {
      setBackground
    } = useColors();
    const classes = computed(() => ({
      'v-data-table': true
    }));
    const pages = computed(() => {
      var _data$rows;

      return Math.ceil(((_data$rows = data.rows) === null || _data$rows === void 0 ? void 0 : _data$rows.length) / data.rowsPerPage);
    });
    watch(() => props.cols, to => data.cols = to, {
      immediate: true
    });
    watch(() => props.rows, to => data.rows = to, {
      immediate: true
    });

    function onCheckAll(value) {
      data.isAllRowsChecked = value;
      data.rows.forEach(row => row.checked = value);
    }

    function onCheck(rows) {
      data.checkedRows = rows;
      emit('checked', data.checkedRows);
    }

    function onPrevTable(num) {
      data.page = data.page > 1 ? data.page + num : data.page;
    }

    function onNextTable(num) {
      if (data.rows.length - data.page * data.rowsPerPage > 0) {
        data.page += num;
      }
    }

    function onSort(col) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        return data.rows.reverse();
      }

      data.cols.forEach(c => {
        c.sorted = col.key === c.key;
      });
      sortColumn(col);
    }

    function onFilter({
      value,
      col
    }) {
      if (!value && filters[col.key]) {
        delete filters[col.key];
      }

      if (value) filters[col.key] = value;
      if (props.stateOut) emit('filter', filters);

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return data.rows = props.rows;
        }

        data.rows = filterRows(props.rows);
      }

      data.page = 1;
    }

    function onSelectRowsCount(count) {
      data.rowsPerPage = count;
    }

    function sortColumn(col) {
      data.rows.sort((a, b) => {
        if (col.format) {
          return col.format(a) > col.format(b) ? 1 : -1;
        }

        return a[col.key] > b[col.key] ? 1 : -1;
      });
    }

    function filterRows(rows) {
      const filterKeys = Object.keys(filters);
      return rows.reduce((acc, row) => {
        const rowResults = [];
        filterKeys.forEach(key => {
          const {
            format
          } = data.cols.find(col => col.key === key);
          const value = format ? format(row) : row[key];
          const rowKeyValue = toComparableStringFormat(value);
          const filterValue = toComparableStringFormat(filters[key]);

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(!!row[key]);
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
        color: props.headerColor || props.color,
        checkbox: props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter,
        onSort,
        onCheckAll,
        ...props.headerProps
      };
      return h(VDataTableHeader, propsData);
    }

    function genTableBody() {
      const propsData = {
        cols: data.cols,
        rows: data.rows,
        page: data.page,
        rowsPerPage: data.rowsPerPage,
        checkbox: props.checkbox,
        checkAllRows: data.isAllRowsChecked,
        align: props.align,
        dark: props.dark,
        numbered: props.numbered,
        onCheck
      };
      const content = props.cols.reduce((acc, col) => {
        const slotContent = row => {
          const scoped = {
            row
          };

          if (col.format) {
            scoped.format = col.format;
          }

          return slots[col.key] && slots[col.key](scoped);
        };

        if (slots[col.key]) acc[col.key] = slotContent;
        return acc;
      }, {});
      return h(VDataTableBody, propsData, content);
    }

    function genTableFooter() {
      var _data$rows2;

      const propsData = {
        pages: pages.value,
        page: data.page,
        counts: props.rowsOnTable,
        tableRowsCount: (_data$rows2 = data.rows) === null || _data$rows2 === void 0 ? void 0 : _data$rows2.length,
        allRowsCount: props.rows.length,
        rowsPerPage: data.rowsPerPage,
        dark: props.dark,
        color: props.color,
        toolbar: props.toolbar,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
        onLastPage: val => emit('last-page', val),
        onResetPage: val => data.page += val
      };
      return h(VDataTableFooter, propsData);
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