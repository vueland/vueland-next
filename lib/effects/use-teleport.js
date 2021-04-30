import { createBlock, Teleport, h } from "vue";
export function teleportProps() {
  return {
    portTo: String
  };
}
export function useTeleport(props, component) {
  return createBlock(Teleport, {
    to: props.portTo
  }, [h(component)]);
}
//# sourceMappingURL=use-teleport.js.map