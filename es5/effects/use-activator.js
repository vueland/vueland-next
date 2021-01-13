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
    activatorSizes.left = activatorRef.value.$el.offsetLeft;
    activatorSizes.top = activatorRef.value.$el.offsetTop;
    activatorSizes.height = activatorRef.value.$el.offsetHeight;
    activatorSizes.width = activatorRef.value.$el.offsetWidth;
    return activatorSizes;
  };

  var genActivatorListeners = function genActivatorListeners(props, isActive) {
    if (props.openOnHover) {
      listeners.mouseenter = function () {
        isActive.value = true;
      };

      listeners.mouseleave = function () {
        isActive.value = false;
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