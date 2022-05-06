import { defineComponent, h, computed } from 'vue'

import { VIcon } from '../VIcon'

import { useColors, colorProps } from '../../composable/use-colors'
import { useIcons } from '../../composable/use-icons'

export const VChip = defineComponent({
  name: 'v-chip',
  props: {
    title: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '#ffffff',
    },
    disabled: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    ...colorProps('primary'),
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const {
      setBackgroundClassNameColor,
      setBackgroundCssColor,
      setTextCssColor,
      setTextClassNameColor,
    } = useColors()
    const { icons } = useIcons()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-chip': true,
      'v-chip--disabled': props.disabled,
      ...(!props.disabled ? setBackgroundClassNameColor(props.color) : {}),
      ...setTextClassNameColor(props.textColor),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(!props.disabled ? setBackgroundCssColor(props.color) : {}),
      ...setTextCssColor(props.textColor),
    }))

    const genCloseIcon = () => {
      return h(VIcon, {
        icon: icons.$close,
        clickable: !props.disabled,
        onClick: () => emit('close'),
      })
    }

    const genChipContent = () => {
      return h('div', {
        class: 'v-chip__content',
      }, slots.default?.() || props.title)
    }

    return () => h('span', {
      class: classes.value,
      style: styles.value,
    }, [
      genChipContent(),
      props.closable ? genCloseIcon() : null,
    ])
  },
})