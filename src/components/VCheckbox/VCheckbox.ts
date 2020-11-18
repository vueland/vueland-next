// Styles
import './VCheckbox.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'

// Services
import { FaIcons } from '../../services/icons'

export const vCheckboxProps = {
  onIcon: {
    type: String,
    default: FaIcons.$checkOn,
  },

  offIcon: {
    type: String,
    default: FaIcons.$checkOff,
  },
  ...colorProps(),
}

export const VCheckbox = defineComponent({
  name: 'v-checkbox',

  setup() {

    const { setTextColor } = useColors()
    return h('div')
  },
})
