"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VIcon = require("./VIcon");

Object.keys(_VIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VIcon[key];
    }
  });
});
//# sourceMappingURL=index.js.map