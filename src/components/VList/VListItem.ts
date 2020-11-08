// Styles
import './VListItem.scss'

// Vue API
import {
  h,
  computed,
  defineComponent,
} from 'vue'

// Types
import { Props } from '../../types'

const vListItemProps: Props = {
  value: String,
  modelValue: [String, Number]
}

export const VListItem = defineComponent({
  name: 'v-list-item',
  props: vListItemProps,

  setup(props, { slots }) {

    const classes = computed(() => ({
      'v-list-item': true
    }))

    return () => h('div', {
      class: classes.value
    }, [props.value || props.modelValue || slots.default && slots.default()])
  },
})
