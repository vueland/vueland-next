import { ref, watch } from 'vue';
export function toggleProps() {
  return {
    modelValue: [String, Boolean, Number]
  };
}
export function useToggle(props) {
  const isActive = ref(false);
  watch(() => props.modelValue, to => {
    isActive.value = !!to;
  }, {
    immediate: true
  });
  return {
    isActive
  };
}
//# sourceMappingURL=use-toggle.js.map