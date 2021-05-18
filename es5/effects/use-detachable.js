"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDetachable = useDetachable;

function useDetachable() {
  var target;

  var setDetached = function setDetached(el) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (selector) target = document.querySelector(selector);
    if (!selector) target = document.querySelector('.v-app');
    if (!target) target = document.querySelector('#app');
    if (!target) target = document.querySelector('body');
    target.appendChild(el);
  };

  var removeDetached = function removeDetached(el) {
    target.removeChild(el);
  };

  return {
    setDetached: setDetached,
    removeDetached: removeDetached
  };
}
//# sourceMappingURL=use-detachable.js.map