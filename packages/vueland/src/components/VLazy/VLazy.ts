import { defineComponent, h, ref, unref, onMounted } from 'vue'
import './VLazy.scss'

export const VLazy = defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    rootMargin: {
      type: String,
      default: '0px'
    },
    threshold: {
      type: [ Number, String ],
      default: 0.1
    },
    transition: {
      type: String,
      default: 'fade-in-transition'
    }
  },

  setup(props, { slots }){
    const LAZY_ATTR = 'data-src'
    const containerRef = ref<HTMLElement | null>(null)

    const observerOptions = {
      root: unref(containerRef)!,
      rootMargin: props.rootMargin,
      threshold: Number(props.threshold),
    }

    let observer: IntersectionObserver

    function onTransitionEnd(){
      this.classList.remove(`${ props.transition }-enter-active`)
      this.removeEventListener('transitionend', onTransitionEnd)
    }

    const onEnter = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      let duration = 0

      entries.forEach((it: any) => {
        if (it.isIntersecting) {

          it.target.classList.add(`${ props.transition }-enter-from`)

          requestAnimationFrame(() => {
            it.target.src = it.target.dataset.src
            it.target.removeAttribute(LAZY_ATTR)

            if (!duration) {
              duration = parseFloat(getComputedStyle(it.target).transitionDuration) * 1000
            }

            it.target.classList.add(`${ props.transition }-enter-active`)

            observer.unobserve(it.target)

            setTimeout(() => {
              it.target.classList.remove(`${ props.transition }-enter-from`)
            }, duration)

            it.target.addEventListener('transitionend', onTransitionEnd)

          })
        }
      })
    }

    onMounted(() => {
      const elems = unref(containerRef)!.querySelectorAll(`*[${ LAZY_ATTR }]`)

      observer = new IntersectionObserver(onEnter, observerOptions)

      elems.forEach((el: any) => {
        observer.observe(el)
      })
    })

    return () => h(props.tag, {
      class: 'v-lazy',
      ref: containerRef,
    }, slots.default?.())
  }
})
