import "../../../src/components/VList/VList.scss";
import { h, ref, provide, defineComponent } from 'vue';
import { useSelect } from '../../effects/use-select-multiple';
export const VList = defineComponent({
  name: 'v-list',
  props: {
    multiple: Boolean
  },

  setup(props, {
    slots
  }) {
    const {
      select
    } = useSelect();
    const listsGroup = ref([]);
    const listItems = ref([]);
    provide('lists-group', {
      items: listsGroup,
      register: register.bind(null, listsGroup),
      unregister: unregister.bind(null, listsGroup)
    });
    provide('list-items', {
      items: listItems,
      register: register.bind(null, listItems),
      unregister: unregister.bind(null, listItems)
    });
    provide('list-handlers', {
      listClick,
      itemClick
    });
    provide('list-types', {
      isInGroup: false,
      isInList: false,
      isInMenu: false
    });

    function register(items, item) {
      items.value.push(item);
    }

    function unregister(items, item) {
      items.value.filter(it => it.ref !== item.ref);
    }

    function listClick(groups, item) {
      if (groups.value.length) {
        groups.value.forEach(it => {
          if (it.ref === item.ref.value) {
            it.active = !it.active;
          }
        });
      }
    }

    function itemClick(items, item) {
      !props.multiple && select(items, item);
      props.multiple && (item.active.value = !item.active.value);
    }

    return () => {
      const dataProps = {
        class: {
          'v-list': true
        }
      };
      return h('div', dataProps, slots.default && slots.default());
    };
  }

});
//# sourceMappingURL=VList.js.map