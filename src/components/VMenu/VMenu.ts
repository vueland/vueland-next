import './VMenu.scss'

import { h, ref, defineComponent, withDirectives, computed, onMounted, vShow } from 'vue'

import { useDimensions } from '../../effects/use-dimensions'
import { useActivator } from '../../effects/use-activator'
import { convertToUnit } from '../../helpers'
import { clickOutside } from '../../directives'
import { useTransition } from '@/effects/use-transition'

export const VMenu = defineComponent({
  name: 'v-menu',
  props: {
    maxHeight: {
      type: Number,
      default: 200
    },
    openOnHover: Boolean,
    openOnClick: Boolean
  },
  setup(props, { slots }) {
    const { contentRef, setDimensions } = useDimensions()
    const { activatorRef, genActivatorListeners } = useActivator()
    const isActive = ref<boolean>(false)

    const listeners = genActivatorListeners(props, isActive)

    const directive = computed(() => {
      return isActive.value
        ? {
          handler: () => isActive.value = false,
          closeConditional: true
        }
        : undefined
    })

    function genMenuActivator() {
      const slotContent = slots.activator && slots.activator({
        on: listeners
      })
      return h(slotContent![0], { ref: activatorRef })
    }

    function genMenuContent() {
      const content = h('div', {
        ref: contentRef,
        class: 'v-menu__content',
        style: {
          maxHeight: convertToUnit(props.maxHeight)
        }
      }, slots.content && slots.content())

      return withDirectives(content, [
        [vShow, isActive.value],
        [clickOutside, directive.value]
      ])
    }

    onMounted(() => {
      setDimensions(activatorRef)
    })

    // function onResize() {}

    return () => [
      h('div', { class: { 'v-menu': true } }),
      genMenuActivator(),
      useTransition(genMenuContent(), 'fade')
    ]
  }
})
