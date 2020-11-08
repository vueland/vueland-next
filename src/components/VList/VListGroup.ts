// Styles
import './VList.scss'

// Vue API
import {
  h,
  defineComponent,
} from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

const vListGroupProps = {
  activeClass: {
    type: String,
    default: '',
  },
  appendIcon: String,
  color: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
  group: String,
  noAction: Boolean,
  prependIcon: String,
  ripple: {
    type: [Boolean, Object],
    default: true,
  },
  subGroup: Boolean,
}

export const VList = defineComponent({
  name: 'v-list-group',
  props: vListGroupProps,

  setup(props) {
    const { setTextColor } = useColors()

    const genPrependIcon = () => {
    }
    const genAppendIcon = () => {
    }

    const genDataProps = () => {
      return {}
    }

    return () => h('div', setTextColor(props.color, genDataProps()))
  },
})