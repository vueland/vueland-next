import { defineComponent, h } from 'vue';
export function createSimpleFunctional(c, el = 'div') {
  return defineComponent({
    name: name || c.replace(/__/g, '-'),

    setup(_, {
      slots
    }) {
      return () => h(el, {
        class: {
          [c.trim()]: true
        }
      }, slots.default && slots.default());
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
//# sourceMappingURL=index.js.map