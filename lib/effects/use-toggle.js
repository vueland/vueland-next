// Vue API
import { ref, watch } from 'vue';
export function toggleProps() {
  return {
    value: Boolean
  };
}
export function useToggle(props, context) {
  console.log(props, context);
  return {};
}
export function factory(prop = 'value', event = 'input', emit) {
  const isActive = ref(false);
  const model = {
    prop,
    event
  };
  watch([prop], val => isActive.value = !!val);
  watch(isActive, val => {
    !!val !== isActive.value && emit(event, val);
  });
  return {
    model,
    isActive
  };
}
//# sourceMappingURL=use-toggle.js.map