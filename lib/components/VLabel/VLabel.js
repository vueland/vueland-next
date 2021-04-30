import "../../../src/components/VLabel/VLabel.scss";
import { h, computed, defineComponent } from "vue";
import { convertToUnit } from "../../helpers";
import { colorProps, useColors } from "../../effects/use-colors";
export const VLabel = defineComponent({
  name: "v-label",
  props: {
    absolute: Boolean,
    disabled: Boolean,
    focused: Boolean,
    onField: Boolean,
    left: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: [Number, String],
      default: "auto"
    },
    hasState: Boolean,
    ...colorProps()
  },

  setup(props, {
    slots
  }) {
    const {
      setTextColor
    } = useColors();
    const isActive = computed(() => {
      return !!props.hasState || !!props.focused;
    });
    const classes = computed(() => ({
      "v-label": true,
      "v-label--active": isActive.value,
      "v-label--on-field": props.onField,
      "v-label--has-state": props.hasState,
      "v-label--is-disabled": !!props.disabled
    }));

    function genPropsData() {
      return {
        class: classes.value,
        style: {
          left: convertToUnit(props.left),
          right: convertToUnit(props.right),
          position: props.absolute ? "absolute" : "relative"
        }
      };
    }

    return () => {
      const propsData = genPropsData();
      return h("label", props.color ? setTextColor(props.color, propsData) : propsData, slots.default && slots.default());
    };
  }

});
//# sourceMappingURL=VLabel.js.map