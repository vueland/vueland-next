// Styles
import './VListItem.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'
import { useToggle } from '../../effects/use-toggle'

export const VListItem = defineComponent({
  name: 'v-list-item',

  props: {
    activeClass: {
      type: String,
      default: '',
    },
    dark: Boolean,
    inactive: Boolean,
    value: {
      type: [Object, String, Number, Boolean],
      default: null,
    },
    ...colorProps(),
  },

  emits: ['click'],

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()
    const { isActive } = useToggle(props)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-item': true,
      'v-list-item--active': isActive.value,
    }))

    function onClick(e) {
      e.preventDefault()
      isActive.value = !isActive.value
      emit('click', e)
    }

    return () => {
      const content = slots.default && slots.default({ active: isActive.value })

      const propsData = {
        class: classes.value,
        onClick,
      }

      const color = props.dark ? 'white' : props.color

      return h(
        'div',
        color && isActive.value ? setTextColor(color, propsData) : propsData,
        content
      )
    }
  },
})
