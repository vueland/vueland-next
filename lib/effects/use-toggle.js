import { ref, watch } from "vue";
export function useToggle(props, propName) {
  const isActive = ref(false);
  const prop = propName ? propName : "modelValue";
  watch(() => props[prop], to => isActive.value = !!to, {
    immediate: true
  });
  return {
    isActive
  };
}
//# sourceMappingURL=use-toggle.js.map