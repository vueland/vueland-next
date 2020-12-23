import "../../../src/components/VDatePicker/VYears.scss";
import { h, ref, watchEffect, inject, computed, defineComponent } from 'vue';
import { genTableRows } from './helpers';
import { useTransition } from '../../effects/use-transition';
export const VYears = defineComponent({
  name: 'v-years',
  props: {
    year: [Number, String]
  },

  setup(props, {
    emit
  }) {
    const LIMIT = 100;
    const ON_TABLE = 20;
    const CELLS_IN_ROW = 4;
    const CURRENT_YEAR = new Date().getFullYear();
    const ANIMATION_TIMEOUT = 100;
    const years = ref([]);
    const onTableIndex = ref(0);
    const isListChanged = ref(false);
    const transition = ref('');
    const handlers = inject('handlers');
    watchEffect(() => isListChanged.value && setTimeout(() => {
      isListChanged.value = false;
    }, ANIMATION_TIMEOUT));
    const computedYear = computed({
      get() {
        return +props.year || CURRENT_YEAR;
      },

      set(val) {
        emit('update:year', val);
      }

    });

    if (handlers !== null && handlers !== void 0 && handlers.value) {
      handlers.value = {
        onNext: () => changeYearsList(true),
        onPrev: () => changeYearsList(false)
      };
    }

    function setCurrentTransition(isNext) {
      transition.value = isNext ? 'fade-in-down' : 'fade-in-up';
    }

    function setTableIndex() {
      onTableIndex.value = years.value.findIndex(row => {
        return row.find(year => year === computedYear.value);
      });
    }

    function changeYearsList(isNext) {
      const max = years.value.length - 1;
      const val = isNext ? 1 : -1;
      if (onTableIndex.value === max && val > 0 || onTableIndex.value === 0 && val < 0) return;
      setCurrentTransition(isNext);
      onTableIndex.value += val;
      isListChanged.value = true;
    }

    function genTableYears() {
      const fromYear = CURRENT_YEAR - LIMIT;
      const maxYears = LIMIT * 2;
      let yearsList = [];

      for (let i = 0; i <= maxYears; i += 1) {
        if (yearsList.length === ON_TABLE) {
          years.value.push(yearsList);
          yearsList = [];
        }

        yearsList.push(fromYear + i);
      }
    }

    function genYearCell(year) {
      const isSelected = year === computedYear.value;
      const propsData = {
        class: {
          'v-years__cell': true,
          'v-years__cell--selected': isSelected,
          'v-years__cell--current-year': year === CURRENT_YEAR
        },
        onClick: () => computedYear.value = year
      };
      return h('div', propsData, year);
    }

    function genYearsRows() {
      const currentYears = years.value[onTableIndex.value];
      const yearsVNodes = currentYears.map(genYearCell);
      return genTableRows(yearsVNodes, 'v-years__row', CELLS_IN_ROW);
    }

    function genYears() {
      const propsData = {
        class: 'v-years__years'
      };
      return !isListChanged.value && h('div', propsData, genYearsRows()) || null;
    }

    genTableYears();
    setTableIndex();
    return () => {
      const content = useTransition(genYears(), transition.value);
      const propsData = {
        class: {
          'v-years': true
        }
      };
      return h('div', propsData, content);
    };
  }

});
//# sourceMappingURL=VYears.js.map