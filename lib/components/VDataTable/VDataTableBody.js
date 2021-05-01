import "../../../src/components/VDataTable/VDataTableBody.scss";
import { h, ref, watch, computed, defineComponent } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { VDataTableCell } from './VDataTableCell';
import { VCheckbox } from '../VCheckbox';
export const VDataTableBody = defineComponent({
  name: 'v-data-table-body',
  props: {
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    checkAllRows: Boolean,
    cols: Array,
    rows: Array,
    align: String,
    colWidth: {
      type: [String, Number],
      default: 125
    },
    bodyHeight: {},
    page: Number,
    rowsPerPage: Number,
    ...colorProps()
  },
  emits: ['check'],

  setup(props, {
    slots,
    emit
  }) {
    const checkedRows = ref([]);
    const {
      setBackground
    } = useColors();
    const classes = computed(() => ({
      'v-data-table__body': true
    }));
    const rowsOnTable = computed(() => {
      var _props$rows;

      return (_props$rows = props.rows) === null || _props$rows === void 0 ? void 0 : _props$rows.slice((props.page - 1) * props.rowsPerPage, props.page * props.rowsPerPage);
    });
    watch(() => props.checkAllRows, to => {
      if (to) onCheckRows(props.rows);else onCheckRows([]);
    });

    function onCheckRows(rows) {
      checkedRows.value = rows;
      emit('check', checkedRows.value);
    }

    function genTableRow(cells) {
      return h('div', {
        class: {
          'v-data-table__row': true
        }
      }, cells);
    }

    function genNumberCell(count) {
      return h(VDataTableCell, {
        width: 50,
        align: 'center',
        dark: props.dark,
        class: 'v-data-table__row-number'
      }, {
        default: () => count + 1
      });
    }

    function genCheckboxCell(row) {
      return h(VDataTableCell, {
        width: 50,
        align: 'center',
        dark: props.dark,
        class: 'v-data-table__row-checkbox'
      }, {
        default: () => h(VCheckbox, {
          modelValue: checkedRows.value,
          color: props.dark ? 'white' : '',
          value: row,
          ['onUpdate:modelValue']: onCheckRows
        })
      });
    }

    function genRowCell(col, row) {
      const {
        format
      } = col;
      const slotContent = slots[col.key] && slots[col.key](row);
      return h(VDataTableCell, {
        width: col.width,
        align: col.align || props.align,
        dark: props.dark,
        class: {
          [col.rowCellClass]: !!col.rowCellClass
        }
      }, {
        default: () => slotContent ? slotContent : format ? format(row) : String(row[col.key])
      });
    }

    function genTableRows() {
      var _rowsOnTable$value;

      const tableRows = [];
      const rowsLength = (_rowsOnTable$value = rowsOnTable.value) === null || _rowsOnTable$value === void 0 ? void 0 : _rowsOnTable$value.length;
      const colsLength = props.cols.length;
      let rowCells = [];
      const count = (props.page - 1) * props.rowsPerPage;

      for (let i = 0; i < rowsLength; i += 1) {
        props.numbered && rowCells.push(genNumberCell(count + i));
        props.checkbox && rowCells.push(genCheckboxCell(props.rows[i]));

        for (let j = 0; j < colsLength; j += 1) {
          props.cols[j].show && rowCells.push(genRowCell(props.cols[j], rowsOnTable.value[i]));
        }

        tableRows.push(genTableRow(rowCells));
        rowCells = [];
      }

      return tableRows;
    }

    return () => {
      const propsData = {
        class: classes.value
      };
      return h('div', props.color ? setBackground(props.color, propsData) : propsData, genTableRows());
    };
  }

});
//# sourceMappingURL=VDataTableBody.js.map