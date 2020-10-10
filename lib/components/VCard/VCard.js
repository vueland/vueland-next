// Styles
import "../../../src/components/VCard/VCard.scss"; // Vue API

import { defineComponent, h, computed } from 'vue'; // Compositions

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
    const slotContent = slots.default && slots.default();
    return () => h('div', setBackground(props.color, dataObject), slotContent);
  }

});
//# sourceMappingURL=VCard.js.map