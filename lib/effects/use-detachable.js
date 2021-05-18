export function useDetachable() {
  let target;

  const setDetached = (el, selector = '') => {
    if (selector) target = document.querySelector(selector);
    if (!selector) target = document.querySelector('.v-app');
    if (!target) target = document.querySelector('#app');
    if (!target) target = document.querySelector('body');
    target.appendChild(el);
  };

  const removeDetached = el => {
    target.removeChild(el);
  };

  return {
    setDetached,
    removeDetached
  };
}
//# sourceMappingURL=use-detachable.js.map