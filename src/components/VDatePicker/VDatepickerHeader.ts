// Styles
import './VDatepickerHeader.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Services
import { FaIcons } from '../../services/icons'
import { VIcon } from '@/components'

const vDatepickerHeaderProps: any = {
  dark: Boolean,
  year: String,
  month: String,
  rightHandler: Function,
  leftHandler: Function,
}

export const VDatepickerHeader = defineComponent({
  name: 'v-datepicker-header',
  props: vDatepickerHeaderProps,

  setup(props) {
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
          onClick: () => isRight ?
            props.rightHandler() :
            props.leftHandler(),
          size: 18,
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
      }) )
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