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
      default: 'grey lighten-2'
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

    const classes = computed<Record<string, boolean>>(() => {
      const elevations = props.disabled ? {} : elevationClasses.value

      return {
        'v-button': true,
        'v-button--disabled': props.disabled,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined,
        'v-button--rounded': props.rounded,
        ...elevations,
        ...positionClasses.value
      }
    })

    function genLoader() {
      return h('span', {
        class: 'v-button__loader'
      }, h(VProgressCircular, {
        indeterminate: true,
        size: 20,
        width: 2,
        style: {
          marginLeft: '5px'
        }
      }))
    }

    function genLabel() {
      const propsData = {
        class: 'v-button__label'
      }

      return h('span', propsData, props.label)
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground
      const content: any[] = []

      const propsData = {
        class: classes.value,
        style: {
          minWidth: !props.width ? '80px' : '',
          width: props.width && convertToUnit(props.width),
          height: props.rounded ? convertToUnit(props.width) : ''
        },
        onClick: () => !props.disabled && emit('click')
      }

      props.label && content.push(genLabel())
      slots.default && content.push(slots.default())
      props.loading && content.push(genLoader())

      return h(
        'button',
        props.color && !props.disabled
          ? setColor(props.color, propsData)
          : propsData,
        content
      )
    }
  }
})
