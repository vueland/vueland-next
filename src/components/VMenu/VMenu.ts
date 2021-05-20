// Styles
import './VMenu.scss'

// Vue API
import {
  h,
  defineComponent,
  withDirectives,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useAutoPosition } from '../../effects/use-auto-position'
import { useActivator } from '../../effects/use-activator'
import { useDetachable } from '../../effects/use-detachable'
import { useTransition } from '../../effects/use-transition'
import { useElevation } from '../../effects/use-elevation'
import { useToggle } from '../../effects/use-toggle'
import { positionProps } from '../../effects/use-position'

// Helpers
import { convertToUnit } from '../../helpers'

// Directives
import { clickOutside, resize } from '../../directives'
import { vShow } from 'vue'

// Types
import { VNode } from 'vue'

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
    openOnHover: Boolean,
    openOnClick: Boolean,
    closeOnContentClick: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    elevation: {
      type: [Number, String],
      default: 10,
    },
    ...positionProps(),
  },

  emits: ['open', 'close'],

  setup(props, { emit, slots }) {
    const { elevationClasses } = useElevation(props)
    const { isActive } = useToggle(props)
    const { contentRef, setDimensions, dimensions } = useAutoPosition(props)
    const { setDetached, removeDetached } = useDetachable()
    const {
      activatorRef,
      genActivatorListeners,
      addActivatorEvents,
      removeActivatorEvents,
    } = useActivator()

    const handlers = {
      click: () => {
        setDimensions(activatorRef.value).then(() => {
          requestAnimationFrame(() => (isActive.value = true))
        })
      },
      mouseenter: () => (isActive.value = true),
      mouseleave: () => (isActive.value = false),
    }

    const listeners = genActivatorListeners(props, handlers)

    const directive = computed(() => {
      return isActive.value
        ? {
            handler: (e) => {
              if (activatorRef.value!.contains(e.target)) return
              isActive.value = false
            },
            closeConditional: props.closeOnContentClick,
          }
        : undefined
    })

    const calcWidth = computed<string | number>(() => {
      return props.width || dimensions.content.width
    })

    watch(
      () => isActive.value,
      (to) => {
        to && emit('open')
        !to && emit('close')
      }
    )

    function genActivatorSlot(): VNode | null {
      if (slots.activator) {
        const slotContent = slots.activator({ on: listeners })

        if (typeof slotContent![0].type === 'object') {
          return h('div', { ref: activatorRef }, h(slotContent![0]))
        }

        return h(slotContent![0], { ref: activatorRef })
      }

      return null
    }

    function genContentSlot() {
      const propsData = {
        ref: contentRef,
        class: {
          'v-menu__content': true,
          ...elevationClasses.value,
        },
        style: {
          maxHeight: convertToUnit(props.maxHeight),
          width: convertToUnit(calcWidth.value),
          top: convertToUnit(dimensions.content.top),
          left: convertToUnit(dimensions.content.left),
        },
        onClick: () => {
          isActive.value = !props.closeOnContentClick
        },
      }

      const content = h('div', propsData, [slots.default && slots.default()])

      const directives: any = [
        [vShow, isActive.value],
        [resize, onResize],
      ]

      if (props.closeOnClick) directives.push([clickOutside, directive.value])

      return withDirectives(content, directives)
    }

    onMounted(() => {
      activatorRef.value = slots.activator
        ? activatorRef.value
        : contentRef.value.parentNode

      addActivatorEvents()
      setDetached(contentRef.value)
    })

    onBeforeUnmount(() => {
      removeActivatorEvents()
      removeDetached(contentRef.value)
    })

    function onResize() {
      if (!isActive.value) return
      requestAnimationFrame(() => setDimensions(activatorRef))
    }

    return () => [
      h('div', { class: { 'v-menu': true } }),
      slots.activator && genActivatorSlot(),
      useTransition(genContentSlot(), 'fade'),
    ]
  },
})
