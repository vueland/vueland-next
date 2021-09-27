import "../../../src/components/VSelect/VSelectList.scss";
import { h, ref, watch, defineComponent } from 'vue';
import { VList, VListGroup, VListItem, VListItemTitle } from '../VList';
import { colorProps, useColors } from '../../effects/use-colors';
import { getKeyValueFromTarget } from '../../helpers';
export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    dark: Boolean,
    listColor: {
      type: String,
      default: 'white'
    },
    elevation: {
      type: [String, Number],
      default: 4
    },
    select: [Object, String, Array, Number],
    ...colorProps()
  },
  emits: ['select'],

  setup(props, {
    emit
  }) {
    const {
      setTextColor,
      setBackground
    } = useColors();
    const selected = ref(null);
    watch(() => props.select, to => selected.value = to, {
      immediate: true
    });

    function genItems() {
      var _props$items;

      const key = props.valueKey;
      const propsData = {
        class: {},
        style: {}
      };
      return (_props$items = props.items) === null || _props$items === void 0 ? void 0 : _props$items.map(it => {
        const color = props.dark ? 'white' : '';
        const item = h(VListItemTitle, setTextColor(color, propsData), {
          default: () => key ? getKeyValueFromTarget(key, it) : it
        });
        return h(VListItem, {
          key: props.idKey,
          active: selected.value === it,
          onClick: () => {
            selected.value = it;
            emit('select', it);
          }
        }, {
          default: () => item
        });
      });
    }

    function genSelectListItems() {
      return h(VList, {}, {
        default: () => genItemsGroup()
      });
    }

    function genItemsGroup() {
      return h(VListGroup, {
        color: props.color,
        noAction: true,
        expanded: true,
        dark: props.dark
      }, {
        default: () => genItems()
      });
    }

    function genList() {
      const propsData = {
        class: {
          'v-select-list': true
        },
        style: {}
      };
      return h('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genSelectListItems());
    }

    return () => genList();
  }

});
//# sourceMappingURL=VSelectList.js.map