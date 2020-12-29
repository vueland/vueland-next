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
    var _activatorRef$value, _activatorRef$value2, _activatorRef$value3, _activatorRef$value4;

    activatorSizes.left = (_activatorRef$value = activatorRef.value) === null || _activatorRef$value === void 0 ? void 0 : _activatorRef$value.offsetLeft;
    activatorSizes.top = (_activatorRef$value2 = activatorRef.value) === null || _activatorRef$value2 === void 0 ? void 0 : _activatorRef$value2.offsetTop;
    activatorSizes.height = (_activatorRef$value3 = activatorRef.value) === null || _activatorRef$value3 === void 0 ? void 0 : _activatorRef$value3.offsetHeight;
    activatorSizes.width = (_activatorRef$value4 = activatorRef.value) === null || _activatorRef$value4 === void 0 ? void 0 : _activatorRef$value4.offsetWidth;
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