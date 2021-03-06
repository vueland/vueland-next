import "../../../src/components/VDataTable/VDataTableHeader.scss";
import { h, computed, withDirectives, defineComponent } from 'vue';
import { useColors } from '../../effects/use-colors';
import { useIcons } from '../../effects/use-icons';
import { VIcon } from '../VIcon';
import { VCheckbox } from '../VCheckbox';
import { VDataTableCell } from './VDataTableCell';
import { VTextField } from '../VTextField';
import { vShow } from 'vue';
import { clickOutside } from '../../directives/v-click-outside';
export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',
  props: {
    showSequence: Boolean,
    showCheckbox: Boolean,
    cols: Array,
    colWidth: {
      type: [String, Number],
      default: 125
    },
    align: String,
    options: Object
  },
  emits: ['sort', 'filter', 'select-all', 'update:cols'],

  setup(props, {
    emit,
    slots
  }) {
    const {
      setBackground
    } = useColors();
    const {
      icons,
      iconSize
    } = useIcons('s');
    const classes = computed(() => ({
      'v-data-table__header': true
    }));
    const computedContentColor = computed(() => {
      var _props$options, _props$options2;

      return props.options.dark ? ((_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.contentColor) || 'white' : (_props$options2 = props.options) === null || _props$options2 === void 0 ? void 0 : _props$options2.contentColor;
    });
    const cols = computed(() => [...props.cols]);

    function onSort(item) {
      emit('sort', item);
    }

    function onInput($value, item) {
      item.filtered = !!$value;
      emit('filter', {
        value: $value,
        col: item
      });
    }

    function showFilter(item) {
      if (item.showFilter) return;
      item.showFilter = true;
    }

    function genSortButton(item) {
      const classes = {
        'v-data-table-col__actions-sort': true,
        'v-data-table-col__actions-sort--active': item.sorted
      };
      const propsData = {
        clickable: true,
        class: classes,
        size: iconSize,
        icon: icons.$arrowUp,
        color: !item.cellClass ? computedContentColor.value : '',
        onClick: () => onSort(item)
      };
      return h(VIcon, propsData);
    }

    function genFilterButton(item) {
      const classes = {
        'v-data-table-col__actions-filter': true,
        'v-data-table-col__actions-filter--active': item.filtered
      };
      const propsData = {
        clickable: true,
        class: classes,
        size: iconSize,
        icon: icons.$filter,
        color: !item.cellClass ? computedContentColor.value : '',
        onClick: () => showFilter(item)
      };
      return h(VIcon, propsData);
    }

    function genHeaderActions(item) {
      return h('span', {
        class: 'v-data-table-col__actions'
      }, [item.sortable && genSortButton(item), item.filterable && genFilterButton(item)]);
    }

    function genFilterInput(item) {
      const propsData = {
        label: 'search',
        dark: props.options.dark,
        color: !item.cellClass ? computedContentColor.value : '',
        prependIcon: icons.$search,
        clearable: true,
        onInput: $value => onInput($value, item)
      };
      return h(VTextField, propsData);
    }

    function genFilterWrapper(col) {
      var _props$options3, _props$options4;

      const color = props.options.dark ? ((_props$options3 = props.options) === null || _props$options3 === void 0 ? void 0 : _props$options3.color) || 'grey darken-3' : ((_props$options4 = props.options) === null || _props$options4 === void 0 ? void 0 : _props$options4.color) || 'white';
      const slotName = `${col.key}-filter`;
      const filterSlot = slots[slotName] && slots[slotName]({
        filter: event => onInput(event, col)
      });
      const directive = col.showFilter ? {
        handler: () => setTimeout(() => col.showFilter = false),
        closeConditional: false
      } : undefined;
      const propsData = {
        class: {
          'v-data-table-col__filter': !filterSlot,
          'v-data-table-col__custom-filter': !!filterSlot,
          'elevation-5': true,
          [col.cellClass]: !!col.cellClass
        }
      };
      return col.filterable && withDirectives(h('div', !col.filterClass ? setBackground(color, propsData) : propsData, filterSlot || genFilterInput(col)), [[clickOutside, directive], [vShow, col.showFilter]]);
    }

    function genHeaderTitle(col) {
      return h('div', {
        class: 'v-data-table-col__title'
      }, col.title);
    }

    function genNumberCell() {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__number': true,
          [props.cellClass]: !!props.cellClass
        },
        contentColor: computedContentColor.value,
        color: props.options.color,
        width: 50
      };
      return h(VDataTableCell, propsData, {
        default: () => '№'
      });
    }

    function genCheckboxCell() {
      const propsData = {
        align: 'center',
        class: {
          'v-data-table-col__checkbox': true,
          [props.cellClass]: !!props.cellClass
        },
        dark: props.options.dark,
        contentColor: computedContentColor.value,
        color: props.options.color,
        width: 50
      };
      const content = {
        default: () => h(VCheckbox, {
          color: computedContentColor.value,
          onChecked: e => emit('select-all', e)
        })
      };
      return h(VDataTableCell, propsData, content);
    }

    function genHeaderCell(col) {
      const propsData = {
        dark: props.options.dark,
        class: {
          'v-data-table-col': true,
          'v-data-table-col--sorted': col.sorted,
          [col.cellClass]: !!col.cellClass
        },
        contentColor: !col.cellClass ? computedContentColor.value : '',
        color: !col.cellClass ? props.options.color : '',
        width: col.width,
        resizeable: col.resizeable,
        align: col.align || props.align,
        onResize: $size => col.width = $size
      };
      return h(VDataTableCell, propsData, {
        default: () => [genHeaderTitle(col), genHeaderActions(col), genFilterWrapper(col)]
      });
    }

    function genHeaderChildren() {
      const children = [];
      const headerSlot = slots.header && slots.header(props);
      props.showSequence && children.push(genNumberCell());
      props.showCheckbox && children.push(genCheckboxCell());
      cols.value.forEach(col => {
        col.width = col.width || props.colWidth;

        if (!col.hasOwnProperty('show')) {
          col.show = !col.show;
        }

        !headerSlot[0].children && col.show && children.push(genHeaderCell(col));
      });
      headerSlot[0].children && children.push(headerSlot);
      return children;
    }

    return () => {
      const propsData = {
        class: classes.value
      };
      return h('div', props.options.color ? setBackground(props.options.color, propsData) : propsData, genHeaderChildren());
    };
  }

});
//# sourceMappingURL=VDataTableHeader.js.map