import { render } from "vue";

// Components
import { VOverlay } from "../components";

// Types
import { Props } from "../types";
import { SetupContext, VNode } from "vue";

// Helpers
import { addOnceListener } from "@/helpers";

interface Overlayable {
  createOverlay: () => void;
  removeOverlay: () => void;
}

const TIMEOUT = 40;

export function overlayProps(): Props {
  return {
    overlay: Boolean,
    overlayColor: {
      type: String,
      default: "#000000",
    },
  };
}

export function useOverlay(props: Props, overlayOn?: Element): Overlayable {
  const container = document.createElement("div");

  const overlayPropsObject: Props = {
    active: false,
    hide: true,
    color: props.overlayColor,
  };

  const overlayVNode = () => {
    return VOverlay.setup!(
      overlayPropsObject as typeof VOverlay.props,
      {} as SetupContext
    );
  };

  const renderOverlay = () => {
    render(overlayVNode() as VNode, container!);
  };

  renderOverlay();
  const overlayElement = container.firstChild;

  const createOverlay = () => {
    overlayOn?.parentNode?.insertBefore(overlayElement!, overlayOn);

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
      overlayOn?.parentNode?.removeChild(overlayElement!);
    };

    addOnceListener(overlayElement!, "transitionend", remove);
  };

  return {
    createOverlay,
    removeOverlay,
  };
}
