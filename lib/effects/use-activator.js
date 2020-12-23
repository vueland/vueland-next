import { ref } from 'vue';
export function useActivator() {
  const activatorRef = ref(null);
  const activatorSizes = {};
  const listeners = {};

  const getActivatorSizes = () => {
    var _activatorRef$value, _activatorRef$value2, _activatorRef$value3, _activatorRef$value4;

    activatorSizes.left = (_activatorRef$value = activatorRef.value) === null || _activatorRef$value === void 0 ? void 0 : _activatorRef$value.offsetLeft;
    activatorSizes.top = (_activatorRef$value2 = activatorRef.value) === null || _activatorRef$value2 === void 0 ? void 0 : _activatorRef$value2.offsetTop;
    activatorSizes.height = (_activatorRef$value3 = activatorRef.value) === null || _activatorRef$value3 === void 0 ? void 0 : _activatorRef$value3.offsetHeight;
    activatorSizes.width = (_activatorRef$value4 = activatorRef.value) === null || _activatorRef$value4 === void 0 ? void 0 : _activatorRef$value4.offsetWidth;
    return activatorSizes;
  };

  const genActivatorListeners = (props, isActive) => {
    if (props.openOnHover) {
      listeners.mouseenter = () => {
        isActive.value = true;
      };

      listeners.mouseleave = () => {
        isActive.value = false;
      };
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