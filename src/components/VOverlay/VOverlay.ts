// Styles
import "./VOverlay.scss";

// Vue API
import { defineComponent, computed, h } from "vue";

// Compositions
import { useColors } from "@/effects/use-colors";

// Types
import { VNode } from "vue";

export const VOverlay = defineComponent({
  name: "v-overlay",

  props: {
    hide: Boolean,
    active: Boolean,
    color: String,
  } as any,

  setup(props): VNode {
    const { setBackground } = useColors();

    const classes = computed(() => {
      return {
        "v-overlay": true,
        "v-overlay--hidden": props.hide,
        "v-overlay--active": props.active,
      };
    });

    function genDataProps() {
      return {
        class: classes.value,
        style: [],
        ref: "overlay",
      };
    }

    return h("div", setBackground(props.color, genDataProps()));
  },
});
