import { inject } from 'vue'
import {
  FaIcons,
  MaterialIcons,
} from '../services/icons'

export const useIcons = () => {
  const options: any = inject('$v_icons', 'fa')
  const isMaterial = options === 'material-icons'

  let icons: any = MaterialIcons

  if (!isMaterial) {
    icons = FaIcons
  }

  return { icons, isMaterial }
}
