// Vue API
import { defineComponent, h, inject, computed } from 'vue'

// Effects
import { useColors, colorProps } from '../../composable/use-colors'
import { sizeProps } from '../../composable/use-sizes'

// Helpers
import { convertToUnit } from '../../helpers'

// Types
import { VNode } from 'vue'

// Services
import { Sizes } from '../../services/sizes'

export const VIcon = defineComponent({
  name: 'v-icon',

  props: {
    disabled: Boolean,
    active: Boolean,
    clickable: Boolean,
    size: [String, Number],
    icon: String,
    tag: {
      type: String,
      default: 'i',
    },
    ...colorProps(),
    ...sizeProps(),
  } as any,

  emits: ['click'],

  setup(props, { slots, emit }): () => VNode {
    const { setTextClassNameColor, setTextCssColor } = useColors()
    const iconTag = props.clickable ? 'button' : props.tag
    const options: any = inject('$options')

    const icon = computed<string>(() => {
      return props.icon || (slots.default && slots.default()[0].children)
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-icon': true,
      'v-icon--disabled': props.disabled,
      'v-icon--link': props.clickable,
      'v-icon--clickable': props.clickable,
      [options?.icons]: !!options?.icons,
      [icon.value]: !options?.icons && !!icon.value,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      fontSize: getSizes(),
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const isMedium = computed<boolean>(() => {
      return (
        !props.large &&
        !props.small &&
        !props.xLarge &&
        !props.xSmall &&
        !props.size
      )
    })

    function getSizes(): string {
      const sizeProps = {
        large: props.large,
        small: props.small,
        xLarge: props.xLarge,
        xSmall: props.xSmall,
        medium: isMedium.value,
      }
      const explicitSize = Object.keys(sizeProps).find((key) => sizeProps[key])

      return (explicitSize && Sizes[explicitSize]) || convertToUnit(props.size)
    }

    function onClick() {
      if (!props.disabled && props.clickable) {
        emit('click')
      }
    }

    return () => {
      const propsData = {
        class: classes.value,
        style: styles.value,
        onClick,
      }

      return h(iconTag, propsData, options?.icons ? icon.value : '')
    }
  },
})
