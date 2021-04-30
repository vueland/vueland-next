import { render } from "vue";
import { VOverlay } from "../components";
import { addOnceListener } from "@/helpers";
const TIMEOUT = 40;
export function overlayProps() {
  return {
    overlay: Boolean,
    overlayColor: {
      type: String,
      default: "#000000"
    }
  };
}
export function useOverlay(props, overlayOn) {
  const container = document.createElement("div");
  const overlayPropsObject = {
    active: false,
    hide: true,
    color: props.overlayColor
  };

  const overlayVNode = () => {
    return VOverlay.setup(overlayPropsObject, {});
  };

  const renderOverlay = () => {
    render(overlayVNode(), container);
  };

  renderOverlay();
  const overlayElement = container.firstChild;

  const createOverlay = () => {
    var _overlayOn$parentNode;

    overlayOn === null || overlayOn === void 0 ? void 0 : (_overlayOn$parentNode = overlayOn.parentNode) === null || _overlayOn$parentNode === void 0 ? void 0 : _overlayOn$parentNode.insertBefore(overlayElement, overlayOn);
    setTimeout(() => {
      overlayPropsObject.active = true;
      overlayPropsObject.hide = !props.overlay;
      renderOverlay();
    }, TIMEOUT);
  };

  const removeOverlay = () => {
    overlayPropsObject.active = false;
    renderOverlay();

    const remove = () => {
      var _overlayOn$parentNode2;

      overlayOn === null || overlayOn === void 0 ? void 0 : (_overlayOn$parentNode2 = overlayOn.parentNode) === null || _overlayOn$parentNode2 === void 0 ? void 0 : _overlayOn$parentNode2.removeChild(overlayElement);
    };

    addOnceListener(overlayElement, "transitionend", remove);
  };

  return {
    createOverlay,
    removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map