import "../../../src/components/VList/VList.scss";
import { h, defineComponent } from 'vue';
import { useGroup } from '../../effects/use-group';
export const VList = defineComponent({
  name: 'v-list',

  setup(_, {
    slots
  }) {
    const {
      provideGroup
    } = useGroup();
    provideGroup('list-groups', {
      listClick
    });

    function listClick(groups, listGroup) {
      groups.value.length && groups.value.forEach(group => {
        if (group.ref === listGroup.ref.value) {
          group.active = !group.active;
        }
      });
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