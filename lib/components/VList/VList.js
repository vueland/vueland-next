import "../../../src/components/VList/VList.scss";
import { h, ref, provide, defineComponent } from 'vue';
export const VList = defineComponent({
  name: 'v-list',

  setup(_, {
    slots
  }) {
    const groups = ref([]);

    function register(group) {
      groups.value.push(group);
    }

    function unRegister(group) {
      groups.value.filter(it => {
        return it.ref !== group.value;
      });
    }

    function listClick(ref) {
      groups.value.length && groups.value.forEach(group => {
        if (group.ref === ref.value) {
          group.active = !group.active;
        }
      });
    }

    provide('groups', {
      groups,
      register,
      unRegister,
      listClick
    });
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