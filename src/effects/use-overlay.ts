import { h, ref, vShow, withDirectives } from 'vue'

// Components
import { VOverlay } from '../components'

// Types
import { Props } from '../types'
import { SetupContext, VNode } from 'vue'
import { useTransition } from '@/effects/use-transition'


export function overlayProps(): Props {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      default: () => {
        return 'white'
      },
    },
  }
}

export function useOverlay(props: Props) {
  const show = ref(false)

  const genOverlay = () => {
    const overlay = withDirectives(
      h(VOverlay, {
        active: show.value,
        hide: !show.value,
        color: '#000000',
      }),
      [[vShow, show.value]],
    )

    return useTransition({ transition: 'fade' }, overlay)
  }
}
