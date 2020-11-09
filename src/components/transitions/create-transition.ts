import {
  h,
  withCtx,
  createBlock,
  VNode,
  Transition,
} from 'vue'

export function createVTransition(
  hooks: Record<string, any>,
  mode: string = 'in-out',
) {
  return (vNode: VNode) => {
    return createBlock(Transition, {
      mode,
      ...hooks,
    }, {
      default: withCtx(() => [vNode && h(vNode)]),
    })
  }
}
