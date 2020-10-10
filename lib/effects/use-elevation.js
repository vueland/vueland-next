// Vue API
import { computed } from 'vue';
export function elevationProps() {
  return {
    elevation: [String, Number]
  };
}
export function useElevation(props) {
  const computedElevation = computed(() => {
    return props.elevation;
  });
  const elevationClasses = computed(() => {
    return {
      [`elevation-${props.elevation}`]: !!computedElevation.value
    };
  });
  return {
    elevationClasses
  };
}
//# sourceMappingURL=use-elevation.js.map