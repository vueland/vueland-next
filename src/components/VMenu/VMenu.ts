import './VMenu.scss'

import { h, ref, onMounted, defineComponent } from 'vue'

export const VMenu = defineComponent({
  name: 'v-menu',
  setup(_, { slots }) {
    const menuRef = ref<HTMLElement | null>(null)

    function genMenuContent() {
      return h(
        'div',
        {
          class: 'v-menu__content',
        },
        slots.default && slots.default()
      )
    }

    onMounted(() => {
      console.log(menuRef.value?.offsetTop, window.pageYOffset)
    })

    return () =>
      h(
        'div',
        {
          class: { 'v-menu': true },
          ref: menuRef,
        },
        genMenuContent()
      )
  },
})
