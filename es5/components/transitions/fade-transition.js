"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeHooks = void 0;

var resetStyles = function resetStyles(el) {
  el.style.opacity = '';
};

var fadeHooks = function fadeHooks(fadeParentClass) {
  return {
    onBeforeEnter: function onBeforeEnter(el) {
      el.parentNode.classList.add(fadeParentClass);
    },
    onEnter: function onEnter(el) {
      el.style.opacity = '0';
      requestAnimationFrame(function () {
        return el.style.opacity = '1';
      });
    },
    onAfterEnter: function onAfterEnter(el) {
      resetStyles(el);
      el.parentNode.classList.remove(fadeParentClass);
    },
    onBeforeLeave: function onBeforeLeave(el) {
      el.parentNode.classList.add(fadeParentClass);
    },
    onLeave: function onLeave(el) {
      el.style.opacity = '1';
      requestAnimationFrame(function () {
        el.style.opacity = '0';
      });
    },
    onAfterLeave: function onAfterLeave(el) {
      resetStyles(el);
      el.parentNode.classList.remove(fadeParentClass);
    }
  };
};

exports.fadeHooks = fadeHooks;
//# sourceMappingURL=fade-transition.js.map