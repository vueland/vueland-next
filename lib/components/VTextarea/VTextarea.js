import "../../../src/components/VTextarea/VTextarea.scss";
import { h, defineComponent } from 'vue';
import { VTextField } from '../VTextField';
export const VTextarea = defineComponent({
  name: 'v-textarea',

  setup() {
    return () => h(VTextField, {
      tag: 'textarea',
      class: 'v-textarea'
    });
  }

});
//# sourceMappingURL=VTextarea.js.map