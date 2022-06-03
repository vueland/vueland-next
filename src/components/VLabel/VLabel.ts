import { defineComponent, h, computed } from 'vue'
import { useColors, colorProps } from '../../composable/use-colors'

export default defineComponent({
  name: 'v-label',
  props: {
    disabled: Boolean,
    focused: Boolean,
    ...colorProps(),
  },
  setup(props, { slots }) {
    const { setTextClassNameColor, setTextCssColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-label': true,
      'v-label--disabled': props.disabled,
      'v-label--focused': props.focused,
      ...(!props.disabled ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(!props.disabled ? setTextCssColor(props.color) : {}),
    }))

    return () => h('label', {
        class: classes.value,
        style: styles.value,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})
