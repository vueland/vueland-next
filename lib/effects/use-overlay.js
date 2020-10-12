// Components
import { VOverlay } from '../components';
export function overlayProps() {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      default: () => {
        return 'white';
      }
    }
  };
}
export function useOverlay(props) {
  const createOverlay = () => {
    const propsObject = {
      active: props.overlay,
      hide: !props.overlay,
      opacity: props.overlayOpacity,
      color: props.overlayColor
    };
    return VOverlay.setup(propsObject, {});
  };

  const removeOverlay = () => {// if (props.overlay) {
    // }
  };

  return {
    createOverlay,
    removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map