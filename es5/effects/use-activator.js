"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActivator = useActivator;

var _vue = require("vue");

function useActivator() {
  var activatorRef = (0, _vue.ref)(null);
  var activatorSizes = {};
  var listeners = {};

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
      listeners.mouseenter = function () {
        handlers.mouseenter();
      };

      listeners.mouseleave = function () {
        handlers.mouseleave();
      };
    }

    if (props.openOnClick) {
      listeners.click = function () {
        return handlers.click();
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
    getActivatorSizes: getActivatorSizes,
    addActivatorEvents: addActivatorEvents,
    removeActivatorEvents: removeActivatorEvents,
    genActivatorListeners: genActivatorListeners
  };
}
//# sourceMappingURL=use-activator.js.map