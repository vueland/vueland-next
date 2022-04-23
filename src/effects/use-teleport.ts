import { createBlock, Teleport, VNode, h } from 'vue'

export function teleportProps() {
  return {
    portTo: String,
  }
}

export function useTeleport(props: any, component: VNode): VNode {
  return createBlock(
    Teleport as any,
    {
      to: props.portTo,
    },
    [h(component)],
  ) as VNode
}
