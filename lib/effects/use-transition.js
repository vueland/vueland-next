import { Transition, withCtx, createBlock, h } from 'vue';
export function transitionProps() {
  return {
    transition: String
  };
}
export function useTransition({
  transition
}, vNode) {
  return () => {
    return createBlock(Transition, {
      name: transition
    }, {
      default: withCtx(() => vNode && [h(vNode)])
    });
  };
}
//# sourceMappingURL=use-transition.js.map