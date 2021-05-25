// Styles
import './VListItem.scss'

// Vue API
import {
  h,
  ref,
  computed,
  watch,
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'
import { useToggle } from '../../effects/use-toggle'
import { useGroup } from '../../effects/use-group'

// Types
import { RefGroup } from '../../../types'

export const VListItem = defineComponent({
  name: 'v-list-item',

  props: {
    activeClass: {
      type: String,
      default: '',
    },
    dark: Boolean,
    inactive: Boolean,
    active: Boolean,
    link: Boolean,
    value: {
      type: [Object, String, Number, Boolean],
      default: null,
    },
    ...colorProps(),
  },

  emits: ['click'],

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()
    const { isActive } = useToggle(props)
    const { injectGroup } = useGroup()
    const itemRef = ref(null)

    const itemsGroup = injectGroup('items-group')

    const item: RefGroup = {
      ref: itemRef,
      active: isActive,
    }

    watch(
      () => props.active,
      (to) => (isActive.value = to),
      { immediate: true }
    )

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-item': true,
      'v-list-item--active': isActive.value,
      'v-list-item--link': props.link,
      [props.activeClass]: isActive.value && !!props.activeClass
    }))

    function onClick(e) {
      isActive.value = !isActive.value
      emit('click', e)
    }

    onMounted(() => !props.link && itemsGroup?.register(item))
    onBeforeUnmount(() => itemsGroup?.unregister(item))

    return () => {
      const content = slots.default && slots.default({ active: isActive.value })

      const propsData = {
        class: classes.value,
        ref: itemRef,
        onClick,
      }

      const color = props.dark ? 'white' : props.link ? '' : props.color

      return h(
        'div',
        color && isActive.value ? setTextColor(color, propsData) : propsData,
        content
      )
    }
  },
})
