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
  hooks?: any,
): VNode {
  const props = hooks ? {
    ...hooks,
  } : { name: transition }
  return createBlock(
    Transition,
    props,
    {
      default: withCtx(() => vNode && [h(vNode)]),
    },
  )
}
