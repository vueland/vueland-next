// Vue API
import { defineComponent, h, computed } from 'vue'

// Composable
import { useColors, colorProps } from '../../composables/use-colors'
import { sizeProps, useSize } from '../../composables/use-size'

// Helpers
import { convertToUnit } from '../../helpers'

// Types
import { VNode } from 'vue'

// Services
import { useIcons } from '@/composables/use-icons'

export default defineComponent({
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
    const { isMaterial, iconsBaseClass } = useIcons()
    const { size } = useSize(props)
    const iconTag = props.clickable ? 'button' : props.tag

    const computedIcon = computed<string>(() => {
      return props.icon || slots.default?.()[0].children
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-icon': true,
      'v-icon--disabled': props.disabled,
      'v-icon--clickable': props.clickable,
      [iconsBaseClass]: isMaterial,
      [computedIcon.value]: !isMaterial,
      [size.value]: !props.size,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      fontSize: props.size && convertToUnit(props.size),
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    const onClick = () => {
      if (!props.disabled && props.clickable) emit('click')
    }

    return () => h(iconTag, {
      class: classes.value,
      style: styles.value,
      onClick,
    }, {
      default: () => isMaterial ? computedIcon.value : null,
    })
  },
})
