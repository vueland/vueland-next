// Styles
import './VTooltip.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { positionProps, usePosition } from '../../effects/use-position'

// Types
import { Props } from '../../types'

const vTooltipProps: Props = {
  ...positionProps()
}

export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: vTooltipProps,

  setup(props) {
    const { positionClasses } = usePosition(props)


    return () => h('div')
  }
})
