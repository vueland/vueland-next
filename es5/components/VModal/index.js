"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VModal = require("./VModal");

Object.keys(_VModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VModal[key];
    }
  });
});
//# sourceMappingURL=index.js.map