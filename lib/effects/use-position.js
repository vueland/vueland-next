import { computed } from 'vue';
export const positionProps = () => {
  return {
    absolute: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,
    bottom: Boolean,
    offsetX: {
      type: [String, Number],
      default: 0
    },
    offsetY: {
      type: [String, Number],
      default: 0
    }
  };
};
export const usePosition = props => {
  const positionClasses = computed(() => {
    return {
      'position--absolute': props.absolute,
      'to--left': props.left,
      'to--right': props.right,
      'to--top': props.top,
      'to--bottom': props.bottom
    };
  });
  return {
    positionClasses
  };
};
//# sourceMappingURL=use-position.js.map