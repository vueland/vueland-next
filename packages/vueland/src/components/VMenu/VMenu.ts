// Vue API
import {
  defineComponent,
  watch,
  h,
  withDirectives,
  computed,
  onMounted,
  onBeforeUnmount,
  unref,
  vShow,
  VNode,
  DirectiveArguments,
} from 'vue'

// Composable
import {
  autoPositionProps,
  useAutoPosition,
} from '../../composables/use-auto-position'
import { activatorProps, useActivator } from '../../composables/use-activator'
import { useDetach } from '../../composables/use-detach'
import { useElevation } from '../../composables/use-elevation'
import { useToggle } from '../../composables/use-toggle'
import { useTransition } from '../../composables/use-transition'
import { positionProps } from '../../composables/use-position'

// Helpers
import { convertToUnit } from '../../helpers'

// Directives
import { clickOutside, resize } from '../../directives'

export default defineComponent({
  name: 'v-menu',
  directives: {
    clickOutside,
    resize,
  },
  props: {
    maxHeight: {
      type: [Number, String],
      default: 200,
    },
    width: {
      type: [Number, String],
      default: 0,
    },
    zIndex: {
      type: [String, Number],
      default: 10,
    },
    openOnHover: Boolean,
    openOnClick: Boolean,
    openOnContextmenu: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    elevation: {
      type: [Number, String],
      default: 10,
    },
    offsetX: {
      type: [String, Number],
      default: 20,
    },
    offsetY: {
      type: [String, Number],
      default: 20,
    },
    modelValue: Boolean,
    inputActivator: {
      type: String,
      default: '',
    },
    ...positionProps(),
    ...autoPositionProps(),
    ...activatorProps(),
  },

  emits: ['show', 'hide'],

  setup(props, { emit, slots }) {
    const { elevationClasses } = useElevation(props)
    const { isActive } = useToggle(props)
    const { contentRef, setDimensions, dimensions } = useAutoPosition(props)
    const { setDetached, removeDetached } = useDetach()
    const {
      activatorRef,
      getActivator,
      genActivatorListeners,
      addActivatorEvents,
      removeActivatorEvents,
    } = useActivator(props)

    const setDimensionsOn = (e, flag) => {
      setDimensions(getActivator(e)!).then(() => {
        requestAnimationFrame(() => (isActive.value = flag))
      })
    }

    const handlers = {
      click: (e) => setDimensionsOn(e, props.openOnClick),
      mouseenter: (e) => setDimensionsOn(e, props.openOnHover),
      mouseleave: (e) => setDimensionsOn(e, !props.openOnHover),
      contextmenu: (e) => setDimensionsOn(e, props.openOnContextmenu),
    }

    const listeners = genActivatorListeners(props, handlers)

    const directive = computed(() => {
      return unref(isActive)
        ? {
          handler: (e) => {
            if (
              props.internalActivator &&
              unref(activatorRef).contains(e.target)
            ) {
              return
            }

            isActive.value = false
          },
          closeConditional: props.closeOnClick,
        }
        : undefined
    })

    const calcWidth = computed<number | string>(() => {
      return props.width || +dimensions.content.width
    })

    watch(isActive, (state) => {
      state && emit('show')
      !state && emit('hide')
    })

    watch(
      () => [props.positionY, props.positionX],
      () => setDimensions(unref(activatorRef)),
    )

    watch(
      () => props.modelValue,
      (state) => {
        isActive.value = false
        setTimeout(() => (isActive.value = state))
      },
    )

    const contentClasses = computed<Record<string, boolean>>(() => ({
      'v-menu__content': true,
      ...unref(elevationClasses),
    }))

    const contentStyles = computed<Record<string, string | number>>(() => ({
      top: convertToUnit(dimensions.content.top)!,
      left: convertToUnit(dimensions.content.left)!,
      zIndex: props.zIndex,
    })) as any

    const onContentClick = () => {
      isActive.value = !props.closeOnClick
    }

    const onResize = () => {
      if (!unref(isActive)) {
        return
      }

      requestAnimationFrame(() => setDimensions(unref(activatorRef)))
    }

    const genActivatorSlot = (): Maybe<VNode> => {
      if (slots.activator) {
        const slotContent = slots.activator({ on: listeners })

        if (typeof slotContent![0].type === 'object') {
          return h('div', { ref: activatorRef }, h(slotContent![0]))
        }

        return h(slotContent![0], { ref: activatorRef })
      }

      return null
    }

    const genContentSlot = (): VNode => {
      const propsData = {
        ref: contentRef,
        class: unref(contentClasses),
        style: unref(contentStyles),
        onClick: onContentClick,
      }

      const slotContent = h(
        'div',
        {
          class: 'v-menu__slot',
          style: {
            maxHeight: convertToUnit(props.maxHeight),
            width: convertToUnit(unref(calcWidth)),
          },
        },
        [slots.default?.()],
      )

      const content = h('div', propsData, slotContent)

      const directives: DirectiveArguments = [
        [vShow, unref(isActive)],
        [resize, onResize],
        [clickOutside, unref(directive)],
      ]

      return withDirectives(content, directives)
    }

    onMounted(() => {
      activatorRef.value = getActivator()

      addActivatorEvents()
      setDetached(unref(contentRef)!)
    })

    onBeforeUnmount(() => {
      removeActivatorEvents()
      removeDetached(contentRef.value!)
    })

    return () => [
      h('div', { class: { 'v-menu': true } }),
      slots.activator && genActivatorSlot(),
      useTransition(genContentSlot(), 'fade'),
    ]
  },
})
