import { inject } from 'vue'
import { FaIcons, MaterialIcons, FaSizes, MaterialSizes } from '@/services/icons'

export function useIcons(size) {
  const options: any = inject('$options')
  let icons: any = FaIcons
  let iconSize = FaSizes[size]

  if (options?.$icons) {

    if (options.$icons.includes('material-icons')) {
      icons = MaterialIcons
      iconSize = MaterialSizes[size]
    }
  }

  return { icons, iconSize }
}
