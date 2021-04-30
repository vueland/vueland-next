import "../../../src/components/VAutocomplete/VAutocompleteList.scss";
import { h, defineComponent, withDirectives, vShow } from 'vue';
import { VList, VListItem, VListItemTitle } from '../VList';
import { useToggle } from '../../effects/use-toggle';
import { useTransition } from '../../effects/use-transition';
import { useElevation } from '../../effects/use-elevation';
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
          'v-autocomplete-list': true,
          ...elevationClasses.value
        },
        style: {}
      };
      return withDirectives(h('div', props.listColor ? setBackground(props.listColor, propsData) : propsData, genAutocompleteListItems()), [[vShow, isActive.value]]);
    }

    return () => useTransition(genList(), 'fade');
  }

});
//# sourceMappingURL=VAutocompleteList.js.map