import "../../../src/components/VForm/VForm.scss";
import { defineComponent, h, renderSlot } from 'vue';
export const VForm = defineComponent({
  name: 'v-form',

  setup(_, {
    slots
  }) {
    const validate = () => {
      const promises = [];
      const fields = document.getElementsByClassName('v-validatable');
      Array.prototype.forEach.call(fields, it => {
        const {
          validateValue
        } = it.__vnode.props.methods;
        promises.push(validateValue());
      });
      return Promise.resolve(!promises.some(f => !f));
    };

    const genSlot = () => {
      return renderSlot(slots, 'default', {
        validate
      });
    };

    return () => h('div', {
      class: {
        'v-form': true
      }
    }, genSlot());
  }

});
//# sourceMappingURL=VForm.js.map