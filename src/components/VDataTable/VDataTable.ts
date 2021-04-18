// Styles
import "./VDataTable.scss";

// Vue API
import { h, watch, computed, defineComponent, reactive } from "vue";

// Effects
import { useColors } from "../../effects/use-colors";

// Components
import { VDataTableHeader } from "./VDataTableHeader";
import { VDataTableBody } from "./VDataTableBody";
import { VDataTableFooter } from "./VDataTableFooter";

// Helpers
import { toComparableStringFormat } from "./helpers";

// Types
import { VNode } from "vue";
import { Column, TableFilter } from "../../types";

type TableState = {
  cols: Column[];
  rows: { [key: string]: any }[];
  checkedRows: { [key: string]: any }[];
  rowsPerPage: number;
  page: number;
  isAllRowsChecked: boolean;
};

export const VDataTable = defineComponent({
  name: "v-data-table",
  props: {
    cols: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    headerColor: String,
    rowsOnTable: {
      type: Array,
      default: () => [10, 15, 20, 25],
    },
    dark: Boolean,
    numbered: Boolean,
    checkbox: Boolean,
    stateOut: Boolean,
    align: String,
    color: {
      type: String,
      default: "white",
    },
  } as any,

  setup(props, { slots, emit }) {
    const data = reactive<TableState>({
      cols: [],
      rows: [],
      checkedRows: [],
      rowsPerPage: 20,
      page: 1,
      isAllRowsChecked: false,
    });
    const filters = {};
    const { setBackground } = useColors();

    const classes = computed<Record<string, boolean>>(() => ({
      "v-data-table": true,
    }));

    const pages = computed<number>(() => {
      return Math.ceil(data.rows?.length / data.rowsPerPage);
    });

    watch(
      () => props.cols,
      (to) => (data.cols = to),
      { immediate: true }
    );

    watch(
      () => props.rows,
      (to) => (data.rows = to),
      { immediate: true }
    );

    function onCheckAll(value: boolean) {
      data.isAllRowsChecked = value;
      data.rows.forEach((row) => (row.checked = value));
    }

    function onCheck<T extends TableState["rows"]>(rows: T) {
      data.checkedRows = rows;
      emit("checked", data.checkedRows);
    }

    function onPrevTable(num: number) {
      data.page = data.page > 1 ? data.page + num : data.page;
    }

    function onNextTable(num: number) {
      if (data.rows.length - data.page * data.rowsPerPage > 0) {
        data.page += num;
      }
    }

    function onSort(col: Column) {
      if (col.sorted) {
        col.sorted = !col.sorted;
        return data.rows!.reverse();
      }

      data.cols.forEach((c) => {
        c.sorted = col.key === c.key;
      });

      sortColumn(col);
    }

    function onFilter({ value, col }: TableFilter) {
      if (!value && filters[col.key]) {
        delete filters[col.key];
      }

      if (value) filters[col.key] = value;

      if (props.stateOut) emit("filter", filters);

      if (!props.stateOut) {
        if (!Object.keys(filters).length) {
          return (data.rows = props.rows);
        }
        data.rows = filterRows(props.rows);
      }

      data.page = 1;
    }

    function onSelectRowsCount(count: number) {
      data.rowsPerPage = count;
    }

    function sortColumn(col: Column): void {
      data.rows!.sort((a, b) => {
        if (col.format) {
          return col.format(a) > col.format(b) ? 1 : -1;
        }

        return a[col.key] > b[col.key] ? 1 : -1;
      });
    }

    function filterRows<T>(rows: T[]) {
      const filterKeys = Object.keys(filters);

      return rows.reduce((acc, row) => {
        const rowResults: any[] = [];

        filterKeys.forEach((key) => {
          const { format } = data.cols.find((col) => col.key === key) as Column;
          const value = format ? format(row) : row[key];

          const rowKeyValue = toComparableStringFormat(value);
          const filterValue = toComparableStringFormat(filters[key]);

          if (rowKeyValue.includes(filterValue)) {
            rowResults.push(!!row[key]);
          }
        });

        if (
          rowResults.length === filterKeys.length &&
          rowResults.every((value) => !!value)
        ) {
          acc.push(row);
        }

        return acc;
      }, [] as T[]);
    }

    function genTableTools(): VNode {
      return h(
        "div",
        {
          class: "v-data-table__toolbar",
        },
        {
          default: () => slots.toolbar && slots.toolbar(),
        }
      );
    }

    function genTableHeader(): VNode {
      return h(VDataTableHeader, {
        cols: data.cols,
        color: props.headerColor || props.color,
        checkbox: props.checkbox,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
        onFilter,
        onSort,
        onCheckAll,
      });
    }

    function genTableBody(): VNode {
      return h(
        VDataTableBody,
        {
          cols: data.cols,
          rows: data.rows,
          page: data.page,
          rowsPerPage: data.rowsPerPage,
          checkbox: props.checkbox,
          checkAllRows: data.isAllRowsChecked,
          align: props.align,
          dark: props.dark,
          color: props.color,
          numbered: props.numbered,
          onCheck,
        },

        props.cols.reduce((acc, col) => {
          const slotContent = (row) => {
            const scoped: any = { row };

            if (col.format) {
              scoped.format = col.format;
            }

            return slots[col.key] && slots[col.key]!(scoped);
          };

          if (slots[col.key]) acc[col.key] = slotContent;

          return acc;
        }, {})
      );
    }

    function genTableFooter(): VNode {
      return h(VDataTableFooter, {
        pages: pages.value,
        page: data.page,
        counts: props.rowsOnTable,
        tableRowsCount: data.rows?.length,
        allRowsCount: props.rows.length,
        rowsPerPage: data.rowsPerPage,
        dark: props.dark,
        color: props.color,
        toolbar: props.toolbar,
        onPrev: onPrevTable,
        onNext: onNextTable,
        onSelect: onSelectRowsCount,
        onLastPage: (val) => emit("last-page", val),
        onResetPage: (val) => (data.page += val),
      });
    }

    function genTableInner(): VNode {
      return h(
        "div",
        {
          class: {
            "v-data-table__inner": true,
          },
        },
        [genTableHeader(), genTableBody()]
      );
    }

    return () => {
      const propsData = {
        class: classes.value,
      };

      return h("div", setBackground(props.color, propsData), [
        slots.toolbar && genTableTools(),
        genTableInner(),
        genTableFooter(),
      ]);
    };
  },
});
