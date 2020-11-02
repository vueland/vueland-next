"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VOverlay = require("./VOverlay");

Object.keys(_VOverlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VOverlay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VOverlay[key];
    }
  });
});
//# sourceMappingURL=index.js.map