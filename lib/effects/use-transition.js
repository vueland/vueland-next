import { Transition, withCtx, createBlock, h } from 'vue';
export function transitionProps() {
  return {
    transition: String
  };
}
export function useTransition(props, vnode) {
  return () => {
    return createBlock(Transition, {
      name: props.transition
    }, {
      default: withCtx(() => [h(vnode)])
    });
  };
}
//# sourceMappingURL=use-transition.js.map