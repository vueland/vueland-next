import { inject } from 'vue'
import {
  FaIcons,
  MaterialIcons,
} from '../services/icons'

import { UserOptions } from '../../types'

export function useIcons() {
  const options: Maybe<UserOptions> = inject('$options', () => null) as UserOptions

  let icons: any = FaIcons

  if (options?.icons) {
    if (options.icons.includes('material-icons')) {
      icons = MaterialIcons
    }
  }

  return { icons }
}
