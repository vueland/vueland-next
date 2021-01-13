import "../../../src/components/VList/VList.scss";
import { h, reactive, provide, defineComponent } from 'vue';
export const VList = defineComponent({
  name: 'v-list',

  setup(_, {
    slots
  }) {
    const groups = reactive({
      items: [],

      register(group) {
        this.items.push(group);
      },

      unRegister(group) {
        this.items.filter(it => {
          return it.ref !== group._value;
        });
      },

      listClick(ref) {
        this.items.length && this.items.forEach(group => {
          if (group.ref === ref._value) {
            group.active = !group.active;
          }
        });
      }

    });
    provide('groups', groups);
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