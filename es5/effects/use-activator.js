"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activatorProps = activatorProps;
exports.useActivator = useActivator;

var _vue = require("vue");

function activatorProps() {
  return {
    activator: {
      type: [Object, String]
    },
    internalActivator: Boolean
  };
}

function useActivator() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var activatorRef = (0, _vue.ref)(null);
  var activatorSizes = {};
  var listeners = {};

  var getActivator = function getActivator(e) {
    if (activatorRef.value) return activatorRef.value;
    var target = props.internalActivator ? props.activator.value.$el : document;

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

  var getActivatorSizes = function getActivatorSizes() {
    var el = activatorRef.value.$el || activatorRef.value;
    activatorSizes.left = el.offsetLeft;
    activatorSizes.top = el.offsetTop;
    activatorSizes.height = el.offsetHeight;
    activatorSizes.width = el.offsetWidth;
    return activatorSizes;
  };

  var genActivatorListeners = function genActivatorListeners(props, handlers) {
    if (props.openOnHover) {
      listeners.mouseenter = function (e) {
        return handlers.mouseenter(e);
      };

      listeners.mouseleave = function (e) {
        return handlers.mouseleave(e);
      };
    }

    if (props.openOnClick) {
      listeners.click = function (e) {
        return handlers.click(e);
      };
    }

    if (props.openOnContextmenu) {
      listeners.contextmenu = function (e) {
        return handlers.contextmenu(e);
      };
    }

    return listeners;
  };

  var addActivatorEvents = function addActivatorEvents() {
    var events = Object.keys(listeners);

    if (activatorRef.value) {
      events.forEach(function (key) {
        activatorRef.value.addEventListener(key, listeners[key]);
      });
    }
  };

  var removeActivatorEvents = function removeActivatorEvents() {
    var events = Object.keys(listeners);

    if (activatorRef.value) {
      events.forEach(function (key) {
        activatorRef.value.removeEventListener(key, listeners[key]);
      });
    }
  };

  return {
    activatorRef: activatorRef,
    getActivator: getActivator,
    getActivatorSizes: getActivatorSizes,
    addActivatorEvents: addActivatorEvents,
    removeActivatorEvents: removeActivatorEvents,
    genActivatorListeners: genActivatorListeners
  };
}
//# sourceMappingURL=use-activator.js.map