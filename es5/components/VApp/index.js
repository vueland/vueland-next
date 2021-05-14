"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VApp = require("./VApp");

Object.keys(_VApp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VApp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VApp[key];
    }
  });
});
//# sourceMappingURL=index.js.map