import {
  defineComponent,
  h,
  inject,
  ref,
  computed,
  onBeforeUnmount,
  onBeforeMount,
} from 'vue'
import { List } from '../../../types/components'

export default defineComponent({
  name: 'v-list-item',
  emits: [ 'click' ],

  setup(_, { emit, slots }) {
    const itemRef = ref<Maybe<HTMLElement>>(null)
    const isActive = ref<boolean>(false)
    const list = inject<Maybe<List>>('$v_list', null)

    const item = { itemRef, isActive }

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-item': true,
      'v-list-item--selected': !list?.activeClass && isActive.value,
      [list?.activeClass as string]: isActive.value,
    }))

    const onClick = () => {
      list?.click(item)
      emit('click')
    }

    onBeforeMount(() => list?.add(item))

    onBeforeUnmount(() => list?.remove(item))

    return () => h('div', {
        class: classes.value,
        ref: itemRef,
        onClick,
      },
      {
        default: () => slots.default && slots.default({ active: isActive }),
      },
    )
  },
})
