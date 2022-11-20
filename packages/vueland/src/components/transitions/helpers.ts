// Vue API
import { h, withCtx, createBlock, Transition } from 'vue'

// Types
import { VNode } from 'vue'

export function createTransition(
  hooks: Record<string, any>,
  mode: string = 'in-out'
) {
  return (vNode: VNode) => {
    return createBlock(
      Transition,
      {
        mode,
        ...hooks,
      },
      {
        default: withCtx(() => [ vNode && h(vNode) ]),
      }
    )
  }
}
