// Vue API
import { ref } from 'vue'; // Components

import { VOverlay } from '../components';
export function overlayProps() {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      default: () => {
        return 'white--base';
      }
    }
  };
}
export function useOverlay(props) {
  const overlayComponent = ref(null);
  const hideOverlay = ref(true);

  const createOverlay = () => {
    overlayComponent.value = VOverlay;
    console.log(overlayComponent.value, props);
  };

  const removeOverlay = () => {
    if (overlayComponent) {
      hideOverlay.value = false;
    }
  };

  return {
    createOverlay,
    removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map