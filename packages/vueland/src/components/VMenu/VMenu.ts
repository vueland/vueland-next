// Vue API
import {
  computed,
  defineComponent,
  DirectiveArguments,
  h,
  onBeforeUnmount,
  onMounted,
  provide,
  unref,
  VNode,
  vShow,
  watch,
  withDirectives,
} from 'vue'

// Composable
import { autoPositionProps, useAutoPosition } from '../../composables/use-auto-position'
import { activatorProps, useActivator } from '../../composables/use-activator'
import { useDetach } from '../../composables/use-detach'
import { useElevation } from '../../composables/use-elevation'
import { useToggle } from '../../composables/use-toggle'
import { useTransition } from '../../composables/use-transition'
import { delayProps, useDelay } from '../../composables/use-delay'
import { positionProps } from '../../composables/use-position'

// Helpers
import { convertToUnit } from '../../helpers'

// Directives
import { clickOutside, resize } from '../../directives'
import { V_MENU_PROVIDE_SYMBOL } from '../../constants/provide-keys'

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
      default: 2000,
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
      default: 0,
    },
    offsetY: {
      type: [String, Number],
      default: 0,
    },
    edgeIndent: {
      type: Number,
      default: 20,
    },
    modelValue: Boolean,
    inputActivator: {
      type: String,
      default: '',
    },
    ...delayProps(),
    ...positionProps(),
    ...autoPositionProps(),
    ...activatorProps(),
  },

  emits: ['show', 'hide'],

  setup(props, { emit, slots }) {
    const { elevationClasses } = useElevation(props)
    const { isActive } = useToggle(props)
    const { dimensions, contentRef, setDimensions } = useAutoPosition(props)
    const { setDetached, removeDetached } = useDetach()
    const {
      activatorRef,
      getActivator,
      genActivatorListeners,
      addActivatorEvents,
      removeActivatorEvents,
    } = useActivator(props)

    const { openDelay, closeDelay } = useDelay(props)

    const handlers = {
      click: props.openOnClick ? async (e: MouseEvent) => {
        await setDimensions(getActivator(e)!)
        openDelay(() => (isActive.value = props.openOnClick))
      } : {},
      mouseenter: props.openOnHover ? async (e: MouseEvent) => {
        await setDimensions(getActivator(e)!)
        openDelay(() => (isActive.value = props.openOnHover))
      } : {},
      mouseleave: props.openOnHover ? async (e: MouseEvent) => {
        await setDimensions(getActivator(e)!)
        openDelay(() => (isActive.value = !props.openOnHover))
      } : {},
      contextmenu: props.openOnContextmenu ? async (e: MouseEvent) => {
        await setDimensions(getActivator(e)!)
        openDelay(() => (isActive.value = props.openOnContextmenu))
      } : {},
    }

    const listeners = genActivatorListeners(props, handlers)

    const directive = computed(() => {
      return unref(isActive)
        ? {
          handler: (e) => {
            const el = unref(activatorRef) || unref(activatorRef)
            if (
              props.internalActivator &&
              el.contains(e.target)
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
      async (state) => {
        const handler = state ? openDelay : closeDelay

        handler(() => (isActive.value = state))
      },
    )

    const contentClasses = computed<Record<string, boolean>>(() => ({
      'v-menu__content': true,
      'v-menu--absolute': props.absolute,
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

    const updateDimensions = () => {
      return setDimensions(unref(activatorRef))
    }

    const genActivatorSlot = (): Maybe<VNode> => {
      if (!slots.activator) return null

      const slotContent = slots.activator({ on: listeners })

      return h(slotContent![0], { ref: activatorRef })
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

    provide(V_MENU_PROVIDE_SYMBOL, {
      updateDimensions,
    })

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
