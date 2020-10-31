import { Transition, withCtx, createBlock, VNode, h } from 'vue'

// Types
import { Props } from '../types'

export function transitionProps() {
  return {
    transition: String
  }
}

export function useTransition(props: Props, vnode: VNode): () => VNode {
  return (): VNode => {
    return createBlock(Transition, {
      name: props.transition
    }, {
      default: withCtx(() => [h(vnode)])
    })
  }
}
