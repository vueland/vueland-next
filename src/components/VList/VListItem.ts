// Styles
import './VListItem.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

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
    const classes = computed(() => ({
      'v-list-item': true,
      [props.activeClass]: !!props.activeClass && props.active,
    }))

    const onClick = () => {
      if (props.activeClass) {
        emit('update:active', !props.active)
        emit('active', !props.active)
      }
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
