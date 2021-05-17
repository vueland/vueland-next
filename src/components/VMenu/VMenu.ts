// Styles
import './VMenu.scss'

import {
  h,
  ref,
  defineComponent,
  withDirectives,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useDimensions } from '../../effects/use-dimensions'
import { useActivator } from '../../effects/use-activator'
import { useDetachable } from '../../effects/use-detachable'
import { useTransition } from '../../effects/use-transition'
import { useElevation } from '../../effects/use-elevation'

// Helpers
import { convertToUnit } from '../../helpers'

// Directives
import { clickOutside } from '../../directives'
import { vShow } from 'vue'

export const VMenu = defineComponent({
  name: 'v-menu',
  props: {
    maxHeight: {
      type: [Number, String],
      default: 200,
    },
    width: {
      type: [Number, String],
      default: 0,
    },
    offsetY: {
      type: [Number, String],
      default: 10,
    },
    openOnHover: Boolean,
    openOnClick: Boolean,
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: [Number, String],
      default: 10,
    },
  },
  setup(props, { slots }) {
    const { elevationClasses } = useElevation(props)
    const { contentRef, setDimensions, dimensions } = useDimensions()
    const { setDetached, removeDetached } = useDetachable()
    const {
      activatorRef,
      genActivatorListeners,
      addActivatorEvents,
      removeActivatorEvents,
    } = useActivator()

    const isActive = ref<boolean>(false)

    const handlers = {
      click: () => {
        setDimensions(activatorRef)
        isActive.value = true
      },
      mouseenter: () => (isActive.value = true),
      mouseleave: () => (isActive.value = false),
    }

    const listeners = genActivatorListeners(props, handlers)

    const directive = computed(() => {
      return isActive.value
        ? {
            handler: () => {
              isActive.value = false
            },
            closeConditional: props.closeOnContentClick,
          }
        : undefined
    })

    function genMenuActivator() {
      const slotContent = slots.activator && slots.activator({ on: listeners })
      return h(slotContent![0], { ref: activatorRef })
    }

    function genMenuContent() {
      const propsData = {
        ref: contentRef,
        class: {
          'v-menu__content': true,
          ...elevationClasses.value,
        },
        style: {
          maxHeight: convertToUnit(props.maxHeight),
          top: convertToUnit(dimensions.content.top - +props.offsetY),
          left: convertToUnit(dimensions.content.left),
          width: convertToUnit(props.width || dimensions.content.width),
        },
        onClick: () => {
          isActive.value = !props.closeOnContentClick
        }
      }

      const content = h('div', propsData, slots.content && slots.content())
      const directives: any = [[vShow, isActive.value]]

      if (props.closeOnClick) directives.push([clickOutside, directive.value])

      return withDirectives(content, directives)
    }

    onMounted(() => {
      setDimensions(activatorRef)
      addActivatorEvents()
      setDetached(contentRef.value)
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      removeActivatorEvents()
      removeDetached(contentRef.value)
      window.removeEventListener('resize', onResize)
    })

    function onResize() {
      setDimensions(activatorRef)
    }

    return () => [
      h('div', { class: { 'v-menu': true } }),
      genMenuActivator(),
      useTransition(genMenuContent(), 'fade'),
    ]
  },
})
