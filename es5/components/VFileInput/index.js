"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VFileInput = require("./VFileInput");

Object.keys(_VFileInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VFileInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VFileInput[key];
    }
  });
});
//# sourceMappingURL=index.js.map