"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VTextarea = require("./VTextarea");

Object.keys(_VTextarea).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VTextarea[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VTextarea[key];
    }
  });
});
//# sourceMappingURL=index.js.map