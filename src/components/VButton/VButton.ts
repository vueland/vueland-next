// Styles
import './VButton.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Compositions
import { useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { usePosition } from '../../effects/use-position'

// Components
import { VProgressCircular } from '../VProgressCircular'

// Types
import { VNode } from 'vue'
import { convertToUnit } from '@/helpers'

export const VButton = defineComponent({
  name: 'v-button',
  props: {
    disabled: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    absolute: Boolean,
    loading: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    label: String,
    width: [String, Number],
    color: {
      type: String,
      default: 'grey lighten-1'
    },
    ...elevationProps()
  } as any,
  emits: ['click'],

  setup(props, {
    slots,
    emit
  }): () => VNode {
    const {
      setTextColor,
      setBackground
    } = useColors()

    const { elevationClasses } = useElevation(props)

    const { positionClasses } = usePosition(props)

    const isFlat = computed<boolean>(() => {
      return props.text || props.outlined
    })

    const isDisabled = computed<boolean>(() => {
      return props.disabled || props.loading
    })

    const classes = computed<Record<string, boolean>>(() => {
      const elevations = isDisabled.value ? {} : elevationClasses.value

      return {
        'v-button': true,
        'v-button--text': !isDisabled.value && (props.text || props.outlined),
        'v-button--outlined': props.outlined,
        'v-button--rounded': props.rounded,
        'v-button--disabled': isDisabled.value,
        'v-button--loading': props.loading,
        ...elevations,
        ...positionClasses.value
      }
    })

    function genLoader() {
      return h('span', {
        class: 'v-button__loader'
      }, h(VProgressCircular, {
        indeterminate: true,
        size: 23,
        width: 2
      }))
    }

    function genLabel() {
      const propsData = {
        class: 'v-button__label'
      }

      return h('span', propsData, props.label)
    }

    function genContent() {
      return h('div', {
        class: 'v-button__content'
      }, [
        props.label && genLabel(),
        slots.default && slots.default()
      ])
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground

      const propsData = {
        class: classes.value,
        style: {
          minWidth: !props.width && !props.rounded ? '80px' : '',
          width: props.width && convertToUnit(props.width),
          height: props.rounded ? convertToUnit(props.width) : ''
        },
        onClick: () => !props.disabled && emit('click')
      }

      return h(
        'button',
        props.color && !isDisabled.value
          ? setColor(props.color, propsData)
          : propsData,
        [
          genContent(),
          props.loading && genLoader()
        ]
      )
    }
  }
})
