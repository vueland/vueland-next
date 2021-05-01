import { Transition, withCtx, createBlock, VNode, h } from 'vue'

export function transitionProps() {
  return {
    transition: String,
  }
}

export function useTransition(
  vNode: VNode,
  transition: string,
  mode: string = '',
): VNode {
  const props = { name: transition, mode }
  return createBlock(Transition, props, {
    default: withCtx(() => vNode && [h(vNode)]),
  })
}
