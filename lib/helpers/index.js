import { defineComponent, h } from 'vue';
export function createSimpleFunctional(c, el = 'div', name = '') {
  return defineComponent({
    name: name || c.replace(/__/g, '-'),

    setup(_, {
      slots
    }) {
      const propsData = {
        class: {
          [c.trim()]: true
        }
      };
      return () => h(el, propsData, slots.default && slots.default());
    }

  });
}
export function addOnceListener(el, eventName, cb, options = false) {
  const once = event => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}
export function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}
export function warning(warningText) {
  console.warn(warningText);
}
export function copyWithoutLink(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export const addScopedSlot = (slotName, slots) => {
  return scoped => {
    const arg = { ...scoped
    };
    return slots[slotName] && slots[slotName](arg);
  };
};
//# sourceMappingURL=index.js.map