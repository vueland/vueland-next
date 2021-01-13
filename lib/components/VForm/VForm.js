import "../../../src/components/VForm/VForm.scss";
import { defineComponent, h, ref, renderSlot, provide } from 'vue';
export const VForm = defineComponent({
  name: 'v-form',

  setup(_, {
    slots
  }) {
    const fields = ref([]);
    provide('fields', fields);

    const validate = () => {
      const promises = [];
      fields.value.forEach(it => {
        promises.push(it());
      });
      return !promises.some(f => !f) ? Promise.resolve() : Promise.reject();
    };

    const genSlot = () => {
      return renderSlot(slots, 'default', {
        validate
      });
    };

    return () => h('span', {
      class: 'v-form'
    }, genSlot());
  }

});
//# sourceMappingURL=VForm.js.map