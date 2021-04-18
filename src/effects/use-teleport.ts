import { createBlock, Teleport, VNode, h } from "vue";

import { Props } from "../types";

export function teleportProps() {
  return {
    portTo: String,
  };
}

export function useTeleport(props: Props, component: VNode): () => VNode {
  return createBlock(
    Teleport as any,
    {
      to: props.portTo,
    },
    [h(component)]
  ) as any;
}
