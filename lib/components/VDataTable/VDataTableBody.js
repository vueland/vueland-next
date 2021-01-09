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

    function genTableRows() {
      var _rowsOnTable$value;

      const tableRows = [];
      const rowsLength = (_rowsOnTable$value = rowsOnTable.value) === null || _rowsOnTable$value === void 0 ? void 0 : _rowsOnTable$value.length;
      const colsLength = props.cols.length;
      let rowCells = [];
      let count = (props.page - 1) * props.rowsPerPage;

      for (let i = 0; i < rowsLength; i += 1) {
        props.numbered && rowCells.push(h(VDataTableCell, {
          width: 50,
          align: 'center',
          dark: props.dark,
          color: props.color,
          class: 'v-data-table__row-number'
        }, {
          default: () => count += 1
        }));
        props.checkbox && rowCells.push(h(VDataTableCell, {
          width: 50,
          align: 'center',
          dark: props.dark,
          color: props.color,
          class: 'v-data-table__row-checkbox'
        }, {
          default: () => h(VCheckbox, {
            modelValue: checkedRows.value,
            color: props.dark ? 'white' : '',
            value: props.rows[i],
            ['onUpdate:modelValue']: onCheckRows
          })
        }));

        for (let j = 0; j < colsLength; j += 1) {
          const {
            formatter
          } = props.cols[j];
          const slotContent = slots[props.cols[j].key] && slots[props.cols[j].key](rowsOnTable.value[i]);
          props.cols[j].show && rowCells.push(h(VDataTableCell, {
            width: props.cols[j].width,
            align: props.align || props.cols[j].align,
            dark: props.dark
          }, {
            default: () => slotContent ? slotContent : formatter ? formatter(rowsOnTable.value[i]) : String(rowsOnTable.value[i][props.cols[j].key])
          }));
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