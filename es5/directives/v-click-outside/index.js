"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOutside = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function clickHandler(e, el) {
  if (el.contains(e.target) && el._binds.value && !el._binds.value.closeConditional) return;
  if (typeof el._binds.value === 'function') el._binds.value();
  if (_typeof(el._binds.value) === 'object') el._binds.value.handler();
}

function removeListener(el) {
  document.body.removeEventListener('click', el._onClick, true);
  delete el._onClick;
  delete el._binds;
}

var clickOutside = {
  beforeMount: function beforeMount(el, binding) {
    el._binds = binding;
  },
  mounted: function mounted(el) {
    el._onClick = function (e) {
      return clickHandler(e, el);
    };

    document.body.addEventListener('click', el._onClick, true);
  },
  beforeUpdate: function beforeUpdate(el, binding) {
    el._binds = binding;
  },
  beforeUnmount: function beforeUnmount(el) {
    removeListener(el);
  }
};
exports.clickOutside = clickOutside;
//# sourceMappingURL=index.js.map