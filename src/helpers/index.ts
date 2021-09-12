import { defineComponent, h, Slots } from 'vue'

export const createSimpleFunctional = (
  c: string,
  el = 'div',
  name: string = ''
) => {
  return defineComponent({
    name: name || c.replace(/__/g, '-'),

    setup(_, { slots }) {
      const propsData = {
        class: {
          [c.trim()]: true
        }
      }

      return () => h(el, propsData, slots.default && slots.default())
    }
  })
}

export const addOnceListener = (
  el: EventTarget,
  eventName: string,
  cb: (event: Event) => void,
  options: boolean | AddEventListenerOptions = false
): void => {
  const once = (event: Event) => {
    cb(event)
    el.removeEventListener(eventName, once, options)
  }

  el.addEventListener(eventName, once, options)
}

export const convertToUnit = (
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined => {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str!)) {
    return String(str)
  } else {
    return `${ Number(str) }${ unit }`
  }
}

export const warning = (warningText) => {
  console.warn(warningText)
}

export const copyWithoutLink = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const addScopedSlot = (slotName: string, slots: Slots) => {
  return (scoped) => {
    const arg: any = { ...scoped }

    return slots[slotName] && slots[slotName]!(arg)
  }
}

export const getKeyValueFromTarget = <T>(valueKey: string, target: T): string => {
  return valueKey.split('.').reduce((acc, it) => acc[it], target)
}
