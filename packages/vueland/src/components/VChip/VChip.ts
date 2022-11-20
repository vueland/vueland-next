import { defineComponent, h, computed } from 'vue'

import { VIcon } from '../VIcon'

import { useColors, colorProps } from '../../composables/use-colors'
import { useIcons } from '../../composables/use-icons'

export default defineComponent({
  name: 'v-chip',
  props: {
    title: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    disabled: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    ...colorProps('primary')
  },
  emits: [ 'close', 'click' ],
  setup(props, { slots, emit }) {
    const {
      setBackgroundClassNameColor,
      setBackgroundCssColor,
      setTextCssColor,
      setTextClassNameColor
    } = useColors()
    const { icons } = useIcons()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-chip': true,
      'v-chip--disabled': props.disabled,
      ...(!props.disabled ? setBackgroundClassNameColor(props.color) : {}),
      ...setTextClassNameColor(props.textColor)
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(!props.disabled ? setBackgroundCssColor(props.color) : {}),
      ...setTextCssColor(props.textColor)
    }))

    const genCloseIcon = () => {
      return h(VIcon, {
        icon: icons.$close,
        clickable: !props.disabled
      })
    }

    const genIconWrapper = () => {
      return h('div', {
        class: 'v-chip__icon-wrapper',
        onClick: () => emit('close')
      }, genCloseIcon())
    }

    const genChipContent = () => {
      return h('div', {
        class: 'v-chip__content',
        onClick: () => emit('click')
      }, slots.default?.() || props.title)
    }

    return () => h('span', {
      class: classes.value,
      style: styles.value
    }, [
      genChipContent(),
      props.closable ? genIconWrapper() : null
    ])
  }
})
