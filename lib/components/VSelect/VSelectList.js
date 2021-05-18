import "../../../src/components/VSelect/VSelectList.scss";
import { h, ref, defineComponent } from 'vue';
import { VList, VListItem, VListItemTitle } from '../VList';
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
          class: {
            'v-select-item--selected': it === selected.value
          },
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