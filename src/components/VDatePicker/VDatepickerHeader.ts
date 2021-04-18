// Styles
import './VDatePickerHeader.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Services
import { FaIcons } from '../../services/icons'

// Components
import { VIcon } from '../VIcon'

export const VDatepickerHeader = defineComponent({
  name: 'v-date-picker-header',

  props: {
    onNext: Function,
    onPrev: Function,
    color: String,
  } as any,

  emits: ['table'],

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const genHeaderButton = (isRight) => {
      const icon = isRight ? FaIcons.$arrowRight : FaIcons.$arrowLeft

      const propsData = {
        class: 'v-date-picker__header-button',
      }

      const iconPropsData = {
        icon,
        clickable: true,
        size: 18,
        onClick: () => (isRight ? props.onNext() : props.onPrev()),
      }

      const arrowBtn = h(
        VIcon,
        props.color ? setTextColor(props.color, iconPropsData) : iconPropsData
      )

      return h('div', propsData, arrowBtn)
    }

    const genHeaderDisplay = () => {
      const propsData = {
        class: {
          'v-date-picker__header-display': true,
        },
        onClick: () => emit('table'),
      }

      return h(
        'div',
        props.color ? setTextColor(props.color, propsData) : propsData,
        slots.default && slots.default()
      )
    }

    return () =>
      h(
        'div',
        {
          class: 'v-date-picker__header',
        },
        [genHeaderButton(false), genHeaderDisplay(), genHeaderButton(true)]
      )
  },
})
