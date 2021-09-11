import { ref } from 'vue';
export function activatorProps() {
  return {
    activator: {
      type: [Object, String]
    },
    internalActivator: Boolean
  };
}
export function useActivator(props = null) {
  const activatorRef = ref(null);
  const activatorSizes = {};
  const listeners = {};

  const getActivator = e => {
    if (activatorRef.value) return activatorRef.value;
    const target = props.internalActivator ? props.activator.value.$el : document;

    if (props.inputActivator) {
      return activatorRef.value = target.querySelector(props.inputActivator);
    }

    if (props !== null && props !== void 0 && props.activator) {
      if (typeof props.activator === 'string') {
        return activatorRef.value = target.querySelector(props.activator);
      }

      if (props.activator.value.$el) {
        return activatorRef.value = props.activator.value.$el;
      }

      if (props.activator.value) {
        return activatorRef.value = props.activator.value;
      }
    }

    if (e) {
      return activatorRef.value = e.target || e.currentTarget;
    }

    return null;
  };

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
      listeners.mouseenter = e => handlers.mouseenter(e);

      listeners.mouseleave = e => handlers.mouseleave(e);
    }

    if (props.openOnClick) {
      listeners.click = e => handlers.click(e);
    }

    if (props.openOnContextmenu) {
      listeners.contextmenu = e => handlers.contextmenu(e);
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
    getActivator,
    getActivatorSizes,
    addActivatorEvents,
    removeActivatorEvents,
    genActivatorListeners
  };
}
//# sourceMappingURL=use-activator.js.map