import "../../../src/components/VCard/VCard.scss";
import { defineComponent, h, computed } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
const cardProps = {
  width: [String, Number],
  ...colorProps(),
  ...elevationProps()
};
export const VCard = defineComponent({
  props: cardProps,

  setup(props, {
    slots
  }) {
    const {
      setBackground
    } = useColors(props);
    const {
      elevationClasses
    } = useElevation(props);
    const classes = computed(() => {
      return {
        'v-card': true,
        ...elevationClasses.value
      };
    });
    const dataObject = {
      class: classes.value,
      style: {
        maxWidth: `${props.width}px`
      }
    };
    return () => h('div', props.color && setBackground(props.color, dataObject) || dataObject, slots.default && slots.default());
  }

});
//# sourceMappingURL=VCard.js.map