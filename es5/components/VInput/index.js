"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VInput = require("./VInput");

Object.keys(_VInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VInput[key];
    }
  });
});
//# sourceMappingURL=index.js.map