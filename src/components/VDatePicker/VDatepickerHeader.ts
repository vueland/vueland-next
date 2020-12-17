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
  dark: Boolean,
  year: String,
  month: String,
  onNext: Function,
  onPrev: Function,
}

export const VDatepickerHeader = defineComponent({
  name: 'v-datepicker-header',
  props,

  setup(props, { slots }) {
    const color = props.dark ? 'white' : ''
    const { setTextColor } = useColors()

    const genHeaderButton = (isRight) => {
      const icon = isRight ?
        FaIcons.$arrowRight :
        FaIcons.$arrowLeft

      const arrowBtn = h(VIcon,
        setTextColor(color as string, {
          icon,
          clickable: true,
          size: 18,
          onClick: () => isRight ?
            props.onNext() :
            props.onPrev(),
        }),
      )

      return h('div', {
        class: 'v-datepicker-header__button',
      }, arrowBtn)
    }

    const genHeaderDisplay = () => {
      return h('div', setTextColor(color, {
        class: {
          'v-datepicker-header__display': true,
        },
      }), slots.default && slots.default())
    }

    return () => h('div', {
      class: 'v-datepicker-header',
    }, [
      genHeaderButton(false),
      genHeaderDisplay(),
      genHeaderButton(true),
    ])
  },
})
