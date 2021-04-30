"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VBadge = require("./VBadge");

Object.keys(_VBadge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VBadge[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VBadge[key];
    }
  });
});
//# sourceMappingURL=index.js.map