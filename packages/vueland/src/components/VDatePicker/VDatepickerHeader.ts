// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { useColors } from '../../composables/use-colors'
import { useIcons } from '../../composables/use-icons'

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
    const { setTextClassNameColor, setTextCssColor } = useColors()
    const { icons } = useIcons()

    const genHeaderButton = (isRight) => {
      const icon = isRight ? icons.$arrowRight : icons.$arrowLeft

      const propsData = {
        class: 'v-date-picker__header-button',
      }

      const iconPropsData = {
        icon,
        clickable: true,
        class: {
          ...(props.color ? setTextClassNameColor(props.color) : {}),
        },
        style: {
          ...(props.color ? setTextCssColor(props.color) : {}),
        },
        onClick: () => (isRight ? props.onNext() : props.onPrev()),
      }

      const arrowBtn = h(VIcon, iconPropsData)

      return h('div', propsData, arrowBtn)
    }

    const genHeaderDisplay = () => {
      const propsData = {
        class: {
          'v-date-picker__header-display': true,
          ...(props.color ? setTextClassNameColor(props.color) : {}),
        },
        style: {
          ...(props.color ? setTextCssColor(props.color) : {}),
        },
        onClick: () => emit('table'),
      }

      return h('div', propsData, slots.default && slots.default())
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
