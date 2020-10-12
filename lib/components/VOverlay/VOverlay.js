// Styles
import "../../../src/components/VOverlay/VOverlay.scss"; // Vue API

import { defineComponent, computed, h } from 'vue'; // Compositions

import { colorProps, useColors } from '@/effects/use-colors';
const overlayProps = {
  hide: Boolean,
  active: Boolean,
  opacity: [Number, String],
  ...colorProps()
};
export const VOverlay = defineComponent({
  name: 'v-overlay',
  props: overlayProps,

  setup(props) {
    const {
      setBackground
    } = useColors(props);
    const classes = computed(() => {
      return {
        'v-overlay': true,
        'v-overlay--hidden': props.hide,
        'v-overlay--active': props.active
      };
    });
    const dataObject = {
      class: classes.value,
      style: [{
        opacity: props.opacity
      }]
    };
    return h('div', setBackground(props.color, dataObject));
  }

});
//# sourceMappingURL=VOverlay.js.map