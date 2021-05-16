import './VMenu.scss'

import { h,reactive, defineComponent, withDirectives, computed } from 'vue'

import { useDimensions } from '../../effects/use-dimensions'
import { convertToUnit } from '../../helpers'
import { clickOutside } from '@/directives'

export const VMenu = defineComponent({
  name: 'v-menu',
  props: {
    maxHeight: {
      type: Number,
      default: 200
    },
    isActive: Boolean
  },
  setup(props, { slots }) {
    const { contentRef, activatorRef } = useDimensions()

    const directive = computed(() => {
      return props.isActive
        ? {
          handler: toggle,
          closeConditional: true
        }
        : undefined
    })

    function toggle() {
      props.isActive = false
    }

    function genMenuActivator() {
      return slots.activator && slots.activator(activatorRef)
    }

    function genMenuContent() {
      const content = h('div', {
        ref: contentRef,
        class: 'v-menu__content',
        style: {
          maxHeight: convertToUnit(props.maxHeight)
        }
      }, slots.content && slots.content())

      return withDirectives(content, [[clickOutside, directive.value]])
    }

    // function onResize() {}

    return () => [
      h('div', { class: { 'v-menu': true } }),
      genMenuActivator(),
      genMenuContent()
    ]
  }
})
