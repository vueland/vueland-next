import "../../../src/components/VSelect/VSelectList.scss";
import { h, ref, defineComponent } from 'vue';
import { VList, VListGroup, VListItem, VListItemTitle } from '../VList';
import { colorProps, useColors } from '../../effects/use-colors';
export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    listColor: {
      type: String,
      default: 'white'
    },
    elevation: {
      type: [String, Number],
      default: 4
    },
    clear: Boolean,
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
          default: () => key ? it[key] : it
        });
        return h(VListItem, {
          key: props.idKey,
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
        noAction: true
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