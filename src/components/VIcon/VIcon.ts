// Vue API
import { defineComponent, h, computed } from 'vue'

// Composable
import { useColors, colorProps } from '../../composable/use-colors'
import { sizeProps } from '../../composable/use-size'

// Helpers
import { convertToUnit } from '../../helpers'

// Types
import { VNode } from 'vue'

// Services
import { sizes } from '../../services/sizes'

export const VIcon = defineComponent({
  name: 'v-icon',

  props: {
    disabled: Boolean,
    clickable: Boolean,
    size: [String, Number],
    icon: String,
    tag: {
      type: String,
      default: 'i',
    },
    ...colorProps(),
    ...sizeProps('sm'),
  } as any,

  emits: ['click'],

  setup(props, { slots, emit }): () => VNode {
    const { setTextCssColor, setTextClassNameColor } = useColors()
    const iconTag = props.clickable ? 'button' : props.tag

    const computedIcon = computed<string>(() => {
      return (
        props.icon ||
        (slots.default && slots.default()[0].children)
      )?.trim()
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-icon': true,
      'v-icon--disabled': props.disabled,
      'v-icon--clickable': props.clickable,
      [computedIcon.value]: !!computedIcon.value,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      fontSize: getSizes(),
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const getSizes = (): string => {
      const sizeProps = {
        sm: props.sm,
        md: props.md,
        lg: props.lg,
        xl: props.xl,
      }
      const explicitSize = Object.keys(sizeProps).find((key) => sizeProps[key])!

      return convertToUnit((explicitSize && sizes[explicitSize]) || props.size)!
    }

    const onClick = () => {
      if (!props.disabled && props.clickable) emit('click')
    }

    return () =>
      h(iconTag, {
        class: classes.value,
        style: styles.value,
        onClick,
      })
  },
})
