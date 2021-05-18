import { ref } from 'vue';
export function useActivator() {
  const activatorRef = ref(null);
  const activatorSizes = {};
  const listeners = {};

  const getActivatorSizes = () => {
    const el = activatorRef.value.$el || activatorRef.value;
    activatorSizes.left = el.offsetLeft;
    activatorSizes.top = el.offsetTop;
    activatorSizes.height = el.offsetHeight;
    activatorSizes.width = el.offsetWidth;
    return activatorSizes;
  };

  const genActivatorListeners = (props, handlers) => {
    if (props.openOnHover) {
      listeners.mouseenter = () => {
        handlers.mouseenter();
      };

      listeners.mouseleave = () => {
        handlers.mouseleave();
      };
    }

    if (props.openOnClick) {
      listeners.click = () => handlers.click();
    }

    return listeners;
  };

  const addActivatorEvents = () => {
    const events = Object.keys(listeners);

    if (activatorRef.value) {
      events.forEach(key => {
        activatorRef.value.addEventListener(key, listeners[key]);
      });
    }
  };

  const removeActivatorEvents = () => {
    const events = Object.keys(listeners);

    if (activatorRef.value) {
      events.forEach(key => {
        activatorRef.value.removeEventListener(key, listeners[key]);
      });
    }
  };

  return {
    activatorRef,
    getActivatorSizes,
    addActivatorEvents,
    removeActivatorEvents,
    genActivatorListeners
  };
}
//# sourceMappingURL=use-activator.js.map