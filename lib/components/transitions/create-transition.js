import { h, withCtx, createBlock, Transition } from 'vue';
export function createVTransition(hooks, mode = 'in-out') {
  return vNode => {
    return createBlock(Transition, {
      mode,
      ...hooks
    }, {
      default: withCtx(() => [vNode && h(vNode)])
    });
  };
}
//# sourceMappingURL=create-transition.js.map