import "../../../src/components/VSelect/VSelectList.scss";
import { h, defineComponent, withDirectives, vShow } from 'vue';
import { VList, VListItem, VListItemTitle } from '../VList';
import { useToggle } from '../../effects/use-toggle';
import { useTransition } from '../../effects/use-transition';
import { useElevation } from '../../effects/use-elevation';
import { colorProps, useColors } from '../../effects/use-colors';
export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: String,
    elevation: {
      type: [String, Number],
      default: 4
    },
    ...colorProps()
  },

  setup(props, {
    emit
  }) {
    const {
      isActive
    } = useToggle(props, 'active');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      setTextColor,
      setBackground
    } = useColors();

    function genItems() {
      const key = props.valueKey;
      const propsData = {
        class: {},
        style: {}
      };
      return props.items.map(it => {
        const item = h(VListItemTitle, props.color ? setTextColor(props.color, propsData) : propsData, {
          default: () => key ? it[key] : it
        });
        return h(VListItem, {
          key: props.idKey,
          onClick: () => emit('select', it)
        }, {
          default: () => item
        });
      });
    }

    function genSelectListItems() {
      return h(VList, {
        class: 'v-select--items-list'
      }, {
        default: () => genItems()
      });
    }

    function genList() {
      const propsData = {
        class: {
          'v-select-list': true,
          ...elevationClasses.value
        },
        style: {}
      };
      return withDirectives(h('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genSelectListItems()), [[vShow, isActive.value]]);
    }

    return () => useTransition(genList(), 'fade');
  }

});
//# sourceMappingURL=VSelectList.js.map