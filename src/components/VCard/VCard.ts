// Styles
import "./VCard.scss";

// Vue API
import { defineComponent, h, computed } from "vue";

// Compositions
import { colorProps, useColors } from "../../effects/use-colors";
import { elevationProps, useElevation } from "../../effects/use-elevation";

// Types
import { VNode } from "vue";

export const VCard = defineComponent({
  name: "v-card",

  props: {
    width: {
      type: [String, Number],
      default: 350,
    },
    ...colorProps(),
    ...elevationProps(),
  } as any,

  setup(props, { slots }): () => VNode {
    const { setBackground } = useColors();
    const { elevationClasses } = useElevation(props);

    const classes = computed(
      (): Record<string, boolean> => {
        return {
          "v-card": true,
          ...elevationClasses.value,
        };
      }
    );

    const genDataProps = () => {
      return {
        class: classes.value,
        style: { width: `${props.width}px` },
      };
    };

    return () =>
      h(
        "div",
        props.color
          ? setBackground(props.color, genDataProps())
          : genDataProps(),
        slots.default && slots.default()
      );
  },
});
