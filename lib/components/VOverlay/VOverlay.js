import "../../../src/components/VOverlay/VOverlay.scss";
import { defineComponent, computed, h } from 'vue';
import { useColors } from '@/effects/use-colors';
export const VOverlay = defineComponent({
  name: 'v-overlay',
  props: {
    hide: Boolean,
    active: Boolean,
    color: String
  },

  setup(props) {
    const {
      setBackground
    } = useColors();
    const classes = computed(() => {
      return {
        'v-overlay': true,
        'v-overlay--hidden': props.hide,
        'v-overlay--active': props.active
      };
    });

    function genDataProps() {
      return {
        class: classes.value,
        style: [],
        ref: 'overlay'
      };
    }

    return h('div', setBackground(props.color, genDataProps()));
  }

});
//# sourceMappingURL=VOverlay.js.map