import { Transition, withCtx, createBlock, VNode, h } from 'vue'

// Types
import { Props } from '../types'

export function transitionProps() {
  return {
    transition: String,
  }
}

export function useTransition(
  { transition }: Props,
  vNode: VNode,
  mode: string = '',
): VNode {
  const props = { name: transition, mode }
  return createBlock(Transition, props, {
    default: withCtx(() => vNode && [h(vNode)]),
  })
}
