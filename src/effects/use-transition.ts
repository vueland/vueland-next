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
): () => VNode {
  return (): VNode => {
    return createBlock(
      Transition,
      {
        name: transition,
      },
      {
        default: withCtx(() => [h(vNode)]),
      },
    )
  }
}
