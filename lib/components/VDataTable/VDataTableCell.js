import "../../../src/components/VDataTable/VDataTableCell.scss";
import { h, computed, defineComponent } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { convertToUnit } from '../../helpers';
import { VResize } from '../VResize';
export const VDataTableCell = defineComponent({
  name: 'v-data-table-cell',
  props: {
    dark: Boolean,
    resizeable: Boolean,
    align: {
      type: String,
      default: 'start'
    },
    width: {
      type: [String, Number],
      default: 75
    },
    ...colorProps()
  },

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor,
      setBackground
    } = useColors();
    const classes = computed(() => ({
      'v-data-table__cell': true,
      [`text-align--${props.align}`]: !!props.align
    }));

    function genResize() {
      return h(VResize, {
        right: true,
        emit: true,
        class: {
          'white': props.dark,
          'primary': !props.dark
        },
        onResize: $size => emit('resize', $size)
      });
    }

    function genCellContent() {
      return h('div', {
        class: 'v-data-table__cell-content'
      }, slots.default && slots.default());
    }

    return () => {
      const propsData = setTextColor(props.dark ? 'white' : '', {
        class: classes.value,
        style: {
          width: convertToUnit(+props.width)
        }
      });
      return h('div', setBackground(props.color, propsData), [genCellContent(), props.resizeable && genResize()]);
    };
  }

});
//# sourceMappingURL=VDataTableCell.js.map