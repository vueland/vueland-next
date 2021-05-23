// Styles
import './VListItem.scss'

// Vue API
import { h, ref, computed, defineComponent } from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'

export const VListItem = defineComponent({
  name: 'v-list-item',

  props: {
    value: String,
    modelValue: [String, Number],
    ...colorProps()
  } as any,

  emits: ['update:active', 'active'],

  setup(props, { slots, emit }) {
    const isActive = ref<boolean>(false)

    const { setTextColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-item': true,
      'v-list-item--active': isActive.value
    }))

    function onClick() {
      isActive.value = !isActive.value
      emit('update:active', !props.active)
      emit('active', !props.active)
    }

    return () => {
      const content =
        props.value || props.modelValue || (slots.default && slots.default({
          active: isActive.value
        }))

      const propsData = {
        class: classes.value,
        onClick
      }

      return h('div',
        props.color && isActive.value ?
          setTextColor(props.color, propsData) : propsData, content)
    }
  }
})
