// Styles
import './VPreload.scss'

// Vue API
import { h, ref, defineComponent } from 'vue'

export const VPreload = defineComponent({
  name: 'v-preload',
  props: {
    loading: Boolean,
    darken: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { slots }) {
    const preloadRef = ref(null)

    const clsProcess: string = !props.darken ?
      'v-preload__loading--lighten' :
      'v-preload__loading--darken'

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
      if (preloadRef.value) {
        const all = (preloadRef.value! as Element).children

        if (props.loading) {
          [].forEach.call(all!, (it: Element) => it.classList.add(clsProcess))
        }

        if (!props.loading) {
          const hasClass = all && [].find.call(all, (it: Element) => {
            return it.classList.contains(clsProcess)
          })

          hasClass && [].forEach.call(all!, (it: Element) => it.classList.remove(clsProcess))
        }
      }

      return genPreloaderWrap()
    }
  },
})
