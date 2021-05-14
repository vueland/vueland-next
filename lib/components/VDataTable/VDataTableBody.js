import "../../../src/components/VDataTable/VDataTableBody.scss";
import { h, ref, watch, computed, defineComponent } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { VDataTableCell } from './VDataTableCell';
import { VCheckbox } from '../VCheckbox';
export const VDataTableBody = defineComponent({
  name: 'v-data-table-body',
  props: {
    cols: Array,
    rows: Array,
    dark: Boolean,
    showSequence: Boolean,
    showCheckbox: Boolean,
    checkAllRows: Boolean,
    align: String,
    colWidth: {
      type: [String, Number],
      default: 125
    },
    page: Number,
    rowsOnPage: Number,
    ...colorProps()
  },
  emits: ['select', 'click:row', 'dblclick:row', 'contextmenu:row'],

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

      return (_props$rows = props.rows) === null || _props$rows === void 0 ? void 0 : _props$rows.slice((props.page - 1) * props.rowsOnPage, props.page * props.rowsOnPage);
    });
    watch(() => props.checkAllRows, to => {
      if (to) onSelectRows(props.rows);else onSelectRows([]);
    });

    function onSelectRows(rows) {
      checkedRows.value = rows;
      emit('select', checkedRows.value);
    }

    function genNumberCell(count) {
      return h(VDataTableCell, {
        width: 50,
        align: 'center',
        dark: props.dark,
        color: props.color,
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
        color: props.color,
        class: 'v-data-table__row-checkbox'
      }, {
        default: () => h(VCheckbox, {
          modelValue: checkedRows.value,
          color: props.dark ? 'white' : '',
          value: row,
          onChecked: onSelectRows
        })
      });
    }

    function genRowCell(col, row) {
      const {
        format
      } = col;
      const slotContent = slots[col.key] && slots[col.key]({
        row,
        format
      });
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

    function genTableRow(row, rowCount) {
      const rowCells = [];
      props.showSequence && rowCells.push(genNumberCell(rowCount));
      props.showCheckbox && rowCells.push(genCheckboxCell(row));
      props.cols.forEach(col => {
        col.show && rowCells.push(genRowCell(col, row));
      });
      return h('div', {
        class: {
          'v-data-table__row': true
        },
        onClick: () => emit('click:row', row),
        onDblclick: () => emit('dblclick:row', row),
        onContextmenu: e => {
          e.preventDefault();
          emit('contextmenu:row', row);
        }
      }, rowCells);
    }

    function genTableRows() {
      var _rowsOnTable$value;

      const tableRows = [];
      const rowsLength = (_rowsOnTable$value = rowsOnTable.value) === null || _rowsOnTable$value === void 0 ? void 0 : _rowsOnTable$value.length;
      const count = (props.page - 1) * props.rowsOnPage;

      for (let i = 0; i < rowsLength; i += 1) {
        tableRows.push(genTableRow(rowsOnTable.value[i], count + i));
      }

      return tableRows;
    }

    return () => {
      var _props$options;

      const propsData = {
        class: classes.value
      };
      return h('div', (_props$options = props.options) !== null && _props$options !== void 0 && _props$options.color ? setBackground(props.options.color, propsData) : propsData, genTableRows());
    };
  }

});
//# sourceMappingURL=VDataTableBody.js.map