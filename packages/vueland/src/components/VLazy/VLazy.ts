import { defineComponent, h, ref, unref, onMounted } from 'vue'

export default defineComponent({
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
      default: 'fade'
    }
  },

  setup(props, { slots }){
    const LAZY_ATTR = 'data-src'
    const containerRef = ref<HTMLElement | null>(null)

    const intersectionObserverOptions = {
      root: unref(containerRef)!,
      rootMargin: props.rootMargin,
      threshold: Number(props.threshold),
    }

    const mutationObserverOptions = {
      childList: true,
      subtree: true
    }

    let intersectionObserver: IntersectionObserver
    let mutationObserver: MutationObserver

    function onTransitionEnd(){
      this.classList.remove(`${ props.transition }-enter-active`)
      this.removeEventListener('transitionend', onTransitionEnd)
    }

    function onEnter(entries: IntersectionObserverEntry[], observer: IntersectionObserver){
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

    function onMutation(/*mutationRecords: MutationRecord[]*/){
      const elems = unref(containerRef)!.querySelectorAll(`*[${ LAZY_ATTR }]`)

      elems.forEach((el: any) => {
        intersectionObserver.unobserve(el)
        intersectionObserver.observe(el)
      })
    }

    onMounted(() => {
      intersectionObserver = new IntersectionObserver(onEnter, intersectionObserverOptions)
      mutationObserver = new MutationObserver(onMutation)

      mutationObserver.observe(unref(containerRef)!, mutationObserverOptions)
      onMutation()
    })

    return () => h(props.tag, {
      class: 'v-lazy',
      ref: containerRef,
    }, slots.default?.())
  }
})
