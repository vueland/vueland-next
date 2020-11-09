import {
  Transition,
  withCtx,
  h,
  VNode,
} from 'vue'

export function createVTransition(
  hooks: Record<string, any>,
  mode: string = 'in-out',
) {
  return (vNode: VNode) => {
    return h(Transition, {
      mode,
      ...hooks,
    }, {
      default: withCtx(() => [
        vNode && h(vNode),
      ]),
    })
  }
}
