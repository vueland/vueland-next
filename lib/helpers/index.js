import { defineComponent, h } from 'vue';
export const createSimpleFunctional = (c, el = 'div', name = '') => {
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
};
export const addOnceListener = (el, eventName, cb, options = false) => {
  const once = event => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
};
export const convertToUnit = (str, unit = 'px') => {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
};
export const warning = warningText => {
  console.warn(warningText);
};
export const copyWithoutLink = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const addScopedSlot = (slotName, slots) => {
  return scoped => {
    const arg = { ...scoped
    };
    return slots[slotName] && slots[slotName](arg);
  };
};
export const getKeyValueFromTarget = (valueKey, target) => {
  return valueKey.split('.').reduce((acc, it) => acc[it], target);
};
//# sourceMappingURL=index.js.map