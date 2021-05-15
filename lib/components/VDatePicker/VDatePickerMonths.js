import "../../../src/components/VDatePicker/VDatePickerMonths.scss";
import { h, inject, computed, defineComponent } from 'vue';
import { genTableRows } from './helpers';
export const VDatePickerMonths = defineComponent({
  name: 'v-date-picker-months',
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    month: [String, Number],
    year: [String, Number],
    locale: Array
  },
  emits: ['update:month', 'update:year'],

  setup(props, {
    emit
  }) {
    const CELLS_IN_ROW = 3;
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const CURRENT_MONTH = new Date().getMonth();
    const handlers = inject('handlers');
    handlers.value = {
      onNext: () => updateYear(true),
      onPrev: () => updateYear(false)
    };
    const computedMonth = computed({
      get() {
        return props.month !== undefined ? +props.month : CURRENT_MONTH;
      },

      set(val) {
        emit('update:month', val);
      }

    });

    function updateYear(isNext) {
      const year = +props.year + (isNext ? 1 : -1);
      emit('update:year', year);
    }

    function genMonthCell(month) {
      const isSelected = month === computedMonth.value;
      const propsData = {
        class: {
          'v-date-picker-months__cell': true,
          'v-date-picker-months__cell--selected': isSelected,
          'v-date-picker-months__cell--current-month': month === CURRENT_MONTH
        },
        onClick: () => computedMonth.value = month
      };
      return h('div', propsData, props.locale[month]);
    }

    function genMonthRows() {
      const monthsVNodes = MONTHS.map(genMonthCell);
      return genTableRows(monthsVNodes, 'v-date-picker-months__row', CELLS_IN_ROW);
    }

    return () => {
      const propsData = {
        class: 'v-date-picker-months'
      };
      return h('div', propsData, genMonthRows());
    };
  }

});
//# sourceMappingURL=VDatePickerMonths.js.map