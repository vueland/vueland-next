// Styles
import './VDatepickerHeader.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Services
import { FaIcons } from '../../services/icons'
import { VIcon } from '@/components'

const props: any = {
  onNext: Function,
  onPrev: Function,
  color: String,
}

export const VDatepickerHeader = defineComponent({
  name: 'v-datepicker-header',
  props,

  setup(props, { slots }) {
    const { setTextColor } = useColors()

    const genHeaderButton = (isRight) => {
      const icon = isRight ?
        FaIcons.$arrowRight :
        FaIcons.$arrowLeft

      const arrowBtn = h(VIcon,
        setTextColor(props.color, {
          icon,
          clickable: true,
          size: 18,
          onClick: () => isRight ?
            props.onNext() :
            props.onPrev(),
        }),
      )

      return h('div', {
        class: 'v-datepicker__header-button',
      }, arrowBtn)
    }

    const genHeaderDisplay = () => {
      return h('div', setTextColor(props.color, {
        class: {
          'v-datepicker__header-display': true,
        },
      }), slots.default && slots.default())
    }

    return () => h('div', {
      class: 'v-datepicker__header',
    }, [
      genHeaderButton(false),
      genHeaderDisplay(),
      genHeaderButton(true),
    ])
  },
})
