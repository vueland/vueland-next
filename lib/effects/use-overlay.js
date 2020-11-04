import { render } from 'vue';
import { VOverlay } from '../components';
import { addOnceListener } from '@/helpers';
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
export function useOverlay(props, overlayOn) {
  const doc = document;
  let overlayable;
  requestAnimationFrame(() => {
    overlayable = !!overlayOn && doc.querySelector(`.${overlayOn}`);
  });
  const overlayPropsObject = {
    active: false,
    hide: true,
    color: props.overlayColor
  };
  const container = doc.createElement('div');

  const overlayVNode = () => VOverlay.setup(overlayPropsObject, {});

  const renderOverlay = vNode => render(vNode, container);

  renderOverlay(overlayVNode());
  const overlayElement = container.firstChild;

  function createOverlay() {
    overlayable.parentNode.insertBefore(overlayElement, overlayable);
    setTimeout(() => {
      overlayPropsObject.active = true;
      overlayPropsObject.hide = !props.overlay;
      renderOverlay(overlayVNode());
    }, 40);
  }

  function removeOverlay() {
    overlayPropsObject.active = false;
    renderOverlay(overlayVNode());

    function remove() {
      overlayable.parentNode.removeChild(overlayElement);
    }

    addOnceListener(overlayElement, 'transitionend', remove);
  }

  return {
    createOverlay,
    removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map