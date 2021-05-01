import { computed } from 'vue';
export function elevationProps() {
  return {
    elevation: [String, Number]
  };
}
export function useElevation(props) {
  const elevationClasses = computed(() => {
    return {
      [`elevation-${props.elevation}`]: !!props.elevation
    };
  });
  return {
    elevationClasses
  };
}
//# sourceMappingURL=use-elevation.js.map