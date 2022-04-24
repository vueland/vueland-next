// Vue API
import { h, computed, defineComponent } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

// Effects
import { colorProps, useColors } from '../../composable/use-colors'

// Types
import { VNode } from 'vue'

// @ts-ignore
export const VLabel = defineComponent({
  name: 'v-label',

  props: {
    absolute: Boolean,
    disabled: Boolean,
    focused: Boolean,
    onField: Boolean,
    left: {
      type: [Number, String],
      default: 0,
    },
    right: {
      type: [Number, String],
      default: 'auto',
    },
    hasState: Boolean,
    ...colorProps(),
  } as any,

  setup(props, { slots }): () => VNode {
    const { setTextClassNameColor, setTextCssColor } = useColors()

    const isActive = computed<boolean>(() => {
      return !!props.hasState || !!props.focused
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-label': true,
      'v-label--active': isActive.value,
      'v-label--has-state': props.hasState,
      'v-label--on-field': !!props.onField,
      'v-label--is-disabled': props.disabled,
      ...(props.color ? setTextClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      left: convertToUnit(props.left),
      right: convertToUnit(props.right),
      position: props.absolute ? 'absolute' : 'relative',
      ...(props.color ? setTextCssColor(props.color) : {}),
    }))

    return (): VNode => {
      return h(
        'label',
        {
          class: classes.value,
          style: styles.value,
        },
        slots.default && slots.default()
      )
    }
  },
})
