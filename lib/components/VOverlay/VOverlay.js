import "../../../src/components/VOverlay/VOverlay.scss";
import { defineComponent, computed, h } from 'vue';
import { colorProps, useColors } from '@/effects/use-colors';
const overlayProps = {
  hide: Boolean,
  active: Boolean,
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
      style: [],
      ref: 'overlay'
    };
    return h('div', setBackground(props.color, dataObject));
  }

});
//# sourceMappingURL=VOverlay.js.map