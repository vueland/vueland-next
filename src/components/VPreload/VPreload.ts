// Styles
import './VPreload.scss'

// Vue API
import { h, ref, defineComponent } from 'vue'

export const VPreload = defineComponent({
  name: 'v-preload',
  props: {
    active: Boolean,
  },

  setup(props, { slots }) {
    const preloadRef = ref(null)

    const genPreloaderWrap = () => {
      return h(
        'span',
        {
          class: 'v-preload',
          ref: preloadRef,
        },
        slots.default && slots.default(),
      )
    }

    return () => {
      const clsProcess = 'v-preload--in-process'

      if (preloadRef.value) {
        const all = (preloadRef.value as any).querySelectorAll('.v-preload > *')

        const hasClass = [].find.call(all, (it: Element) => {
          return it.classList.contains(clsProcess)
        })

        if (props.active) {
          all!.forEach(it => it.classList.add(clsProcess))
        }

        if (!props.active && hasClass) {
          all!.forEach(it => it.classList.remove(clsProcess))
        }
      }

      return genPreloaderWrap()
    }
  },
})
