import "../../../src/components/VCard/VCard.scss";
import { defineComponent, h, computed } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
export const VCard = defineComponent({
  name: 'v-card',
  props: {
    width: {
      type: [String, Number],
      default: 350
    },
    ...colorProps(),
    ...elevationProps()
  },

  setup(props, {
    slots
  }) {
    const {
      setBackground
    } = useColors();
    const {
      elevationClasses
    } = useElevation(props);
    const classes = computed(() => {
      return {
        'v-card': true,
        ...elevationClasses.value
      };
    });
    const styles = computed(() => ({
      width: `${props.width}px`
    }));
    const cachedCard = computed(() => {
      const propsData = {
        class: classes.value,
        style: styles.value
      };
      return h('div', props.color ? setBackground(props.color, propsData) : propsData, slots.default && slots.default());
    });
    return () => cachedCard.value;
  }

});
//# sourceMappingURL=VCard.js.map