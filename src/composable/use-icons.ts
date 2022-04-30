import { inject } from 'vue'
import {
  FaIcons,
  MaterialIcons,
} from '../services/icons'

export function useIcons() {
  const options: any = inject('$options')

  let icons: any = FaIcons

  if (options?.icons) {
    if (options.icons.includes('material-icons')) {
      icons = MaterialIcons
    }
  }

  return { icons }
}
