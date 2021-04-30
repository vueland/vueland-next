import { Transition, withCtx, createBlock, h } from "vue";
export function transitionProps() {
  return {
    transition: String
  };
}
export function useTransition(vNode, transition, mode = "") {
  const props = {
    name: transition,
    mode
  };
  return createBlock(Transition, props, {
    default: withCtx(() => vNode && [h(vNode)])
  });
}
//# sourceMappingURL=use-transition.js.map