import "../../../src/components/VAutocomplete/VAutocompleteList.scss";
import { h, defineComponent, ref } from 'vue';
import { VList, VListItem, VListItemTitle } from '../VList';
import { colorProps, useColors } from '../../effects/use-colors';
export const VAutocompleteList = defineComponent({
  name: 'v-autocomplete-list',
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
        const item = h(VListItemTitle, props.color ? setTextColor(props.color, propsData) : propsData, {
          default: () => key ? it[key] : it
        });
        return h(VListItem, {
          class: {
            'v-autocomplete-item--selected': it === selected.value
          },
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

    function genAutocompleteListItems() {
      return h(VList, {
        class: 'v-autocomplete--items-list'
      }, {
        default: () => genItems()
      });
    }

    function genList() {
      const propsData = {
        class: {
          'v-autocomplete-list': true
        },
        style: {}
      };
      return h('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genAutocompleteListItems());
    }

    return () => genList();
  }

});
//# sourceMappingURL=VAutocompleteList.js.map