import { Transition, VNode, h } from 'vue'

export function transitionProps() {
  return {
    transition: String
  }
}

export function useTransition(
  vNode: VNode,
  transition: string,
  mode: string = ''
): VNode {
  const props = { name: transition, mode }
  return h(Transition, props, {
    default: () => vNode
  })
}
