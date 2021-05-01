import { inject } from 'vue';
import { FaIcons, MaterialIcons, FaSizes, MaterialSizes } from '../services/icons';
export function useIcons(size) {
  const options = inject('$options');
  let icons = FaIcons;
  let iconSize = FaSizes[size];

  if (options !== null && options !== void 0 && options.icons) {
    if (options.icons.includes('material-icons')) {
      icons = MaterialIcons;
      iconSize = MaterialSizes[size];
    }
  }

  return {
    icons,
    iconSize
  };
}
//# sourceMappingURL=use-icons.js.map