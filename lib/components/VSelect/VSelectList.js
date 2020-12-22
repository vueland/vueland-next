import "../../../src/components/VSelect/VSelectList.scss";
import { h, defineComponent, withDirectives, vShow } from 'vue';
import { VList, VListItem, VListItemTitle } from '../VList';
import { VFadeTransition } from '../transitions';
import { useToggle } from '@/effects/use-toggle';
export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean
  },

  setup(props, {
    emit
  }) {
    const {
      isActive
    } = useToggle(props, 'active');

    function genItems() {
      const key = props.valueKey;
      return props.items.map(it => {
        const item = h(VListItemTitle, {}, {
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

    function genSelectList() {
      const listVNode = h(VList, {
        class: 'v-select--items-list'
      }, {
        default: () => genItems()
      });
      return withDirectives(h('div', {
        class: 'v-select-list'
      }, listVNode), [[vShow, isActive.value]]);
    }

    return () => VFadeTransition(genSelectList());
  }

});
//# sourceMappingURL=VSelectList.js.map