import { defineComponent, h } from 'vue'

export function createSimpleFunctional(c: string, el = 'div') {
  return defineComponent({
    name: name || c.replace(/__/g, '-'),

    setup(_, { slots }) {
      return () =>
        h(
          el,
          {
            class: {
              [c.trim()]: true,
            },
          },
          slots.default && slots.default(),
        )
    },
  })
}

export function addOnceListener(
  el: EventTarget,
  eventName: string,
  cb: (event: Event) => void,
  options: boolean | AddEventListenerOptions = false,
): void {
  const once = (event: Event) => {
    cb(event)
    el.removeEventListener(eventName, once, options)
  }

  el.addEventListener(eventName, once, options)
}
