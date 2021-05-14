import { Transition, h } from 'vue';
export function transitionProps() {
  return {
    transition: String
  };
}
export function useTransition(vNode, transition, mode = '') {
  const props = {
    name: transition,
    mode
  };
  return h(Transition, props, {
    default: () => vNode
  });
}
//# sourceMappingURL=use-transition.js.map