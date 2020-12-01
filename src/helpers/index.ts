import { defineComponent, h } from 'vue'

export function createSimpleFunctional(
  c: string,
  el = 'div',
  name: string = '',
) {
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

export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px',
): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str!)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export function warning(warningText) {
  console.warn(warningText)
}
