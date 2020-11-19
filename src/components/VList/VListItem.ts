// Styles
import './VListItem.scss'

// Vue API
import { h, ref, computed, defineComponent } from 'vue'

// Types
import { Props } from '../../types'

const vListItemProps: Props = {
  value: String,
  modelValue: [String, Number],
  activeClass: String,
  active: Boolean,
}

export const VListItem = defineComponent({
  name: 'v-list-item',
  props: vListItemProps,

  setup(props, { slots, emit }) {
    const state = ref(false)

    const classes = computed(() => ({
      'v-list-item': true,
      [props.activeClass]: !!props.activeClass && state.value,
    }))

    const onClick = () => {
      if (props.active) {
        state.value = !state.value
      }
      emit('click')
      emit('active')
    }

    return () =>
      h(
        'div',
        {
          class: classes.value,
          onClick,
        },
        [props.value || props.modelValue || (slots.default && slots.default())],
      )
  },
})
