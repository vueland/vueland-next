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
//# sourceMappingURL=index.js.map