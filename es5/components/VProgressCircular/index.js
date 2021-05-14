"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VProgressCircular = require("./VProgressCircular");

Object.keys(_VProgressCircular).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VProgressCircular[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VProgressCircular[key];
    }
  });
});
//# sourceMappingURL=index.js.map