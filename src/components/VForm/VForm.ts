// Styles
import "./VForm.scss";

// Vue API
import { defineComponent, h, ref, renderSlot, provide } from "vue";

// Types
import { Ref } from "vue";

export const VForm = defineComponent({
  name: "v-form",

  setup(_, { slots }) {
    const fields: Ref<(() => boolean)[]> = ref([]);

    provide("fields", fields);

    const validate = () => {
      const promises: boolean[] = [];

      fields.value.forEach((it) => {
        promises.push(it());
      });

      return !promises.some((f) => !f) ? Promise.resolve() : Promise.reject();
    };

    const genSlot = () => {
      return renderSlot(slots, "default", { validate });
    };

    return () => h("span", { class: "v-form" }, genSlot());
  },
});
