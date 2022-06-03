import { defineComponent, h } from 'vue'
import { VIcon } from '../../components/VIcon'

import { useIcons } from '../../composable/use-icons'

export default defineComponent({
  name: 'v-toolbar-nav-btn',
  emits: ['click'],
  setup(_, { slots, emit }) {
    const { icons } = useIcons()

    const onClick = () => emit('click')

    const genNavBtn = () => {
      return h(VIcon, {
        clickable: true,
        icon: icons.$menu,
        onClick,
      })
    }

    return () => {
      const content = slots.default?.() || genNavBtn()

      return h('div', {
        class: 'v-toolbar__nav-btn',
      }, content)
    }
  },
})
