"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = void 0;
var resize = {
  mounted: function mounted(el, binding) {
    var callback = binding.value;
    var options = binding.options || {
      passive: true
    };
    window.addEventListener('resize', callback, options);
    el._onResize = {
      callback: callback,
      options: options
    };

    if (!binding.modifiers || !binding.modifiers.quiet) {
      callback();
    }
  },
  beforeUnmount: function beforeUnmount(el) {
    if (!el._onResize) return;
    var _el$_onResize = el._onResize,
        callback = _el$_onResize.callback,
        options = _el$_onResize.options;
    window.removeEventListener('resize', callback, options);
    delete el._onResize;
  }
};
exports.resize = resize;
//# sourceMappingURL=index.js.map