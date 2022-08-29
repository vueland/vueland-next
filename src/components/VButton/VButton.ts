// Vue API
import { defineComponent, h, computed } from 'vue'

// Composable
import { useColors } from '../../composables/use-colors'
import { elevationProps, useElevation } from '../../composables/use-elevation'
import { usePosition } from '../../composables/use-position'

// Components
import { VProgressCircular } from '../VProgressCircular'

// Types
import { VNode } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

export default defineComponent({
  name: 'v-button',
  props: {
    disabled: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    round: Boolean,
    absolute: Boolean,
    loading: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    dark: Boolean,
    label: String,
    width: [String, Number],
    height: [String, Number],
    color: {
      type: String,
      default: 'grey lighten-1',
    },
    ...elevationProps(),
  } as any,
  emits: ['click'],

  setup(props, { slots, emit }): () => VNode {
    const {
      setTextClassNameColor,
      setBackgroundClassNameColor,
      setBackgroundCssColor,
      setTextCssColor,
    } = useColors()

    const { elevationClasses } = useElevation(props)
    const { positionClasses } = usePosition(props)

    const isFlat = computed<boolean>(() => {
      return props.text || props.outlined
    })

    const isLoadable = computed<boolean>(() => {
      return !props.text && !props.outlined && props.loading
    })

    const isElevetable = computed<boolean>(() => {
      return !isLoadable.value && !props.disabled
    })

    const classes = computed<Record<string, boolean>>(() => {
      const elevations = isElevetable.value ? elevationClasses.value : {}

      return {
        'v-button': true,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined,
        'v-button--rounded': !props.round && props.rounded,
        'v-button--round': props.round,
        'v-button--disabled': props.disabled || isLoadable.value,
        'v-button--loading': props.loading,
        ...elevations,
        ...positionClasses.value,
        ...(!props.disabled && props.color && isFlat.value
          ? setTextClassNameColor(props.color)
          : {}),
        ...(!props.disabled && props.color && !isFlat.value
          ? setBackgroundClassNameColor(props.color)
          : {}),
      }
    })

    const styles = computed<Record<string, any>>(() => {
      const width = props.width || 40
      const height = props.round ? width: props.height ? props.height : ''

      return {
        width: (props.width || props.round) && convertToUnit(width),
        height: !!height && convertToUnit(height),
        ...(!props.disabled && props.color && isFlat.value ? setTextCssColor(props.color) : {}),
        ...(!props.disabled && props.color && !isFlat.value
          ? setBackgroundCssColor(props.color)
          : {}),
      }
    })

    const genLoader = (): VNode => {
      return h('span', {
          class: 'v-button__loader',
        },
        slots.loading?.() ||
        h(VProgressCircular, {
          indeterminate: true,
          size: 23,
          width: 2,
        }),
      )
    }

    const genLabel = (): VNode => {
      return h('span', {
        class: 'v-button__label',
      }, props.label)
    }

    const genContent = (): VNode => {
      return h('div', { class: 'v-button__content' },
        [(slots.default && slots.default()) || (props.label && genLabel())],
      )
    }

    return () =>
      h('button', {
          class: classes.value,
          style: styles.value,
          onClick: () => !props.disabled && emit('click'),
        },
        [genContent(), props.loading && genLoader()],
      )
  },
})
