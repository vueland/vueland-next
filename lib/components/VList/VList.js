import "../../../src/components/VList/VList.scss";
import { h, ref, provide, defineComponent } from 'vue';
import { useSelectMultiple } from '../../effects/use-select-multiple';
export const VList = defineComponent({
  name: 'v-list',

  setup(_, {
    slots
  }) {
    const {
      select
    } = useSelectMultiple();
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
      isInList: false
    });

    function register(items, item) {
      items.value.push(item);
    }

    function unregister(items, item) {
      items.value.filter(it => {
        return it.ref !== item.ref;
      });
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
      select(items, item);
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