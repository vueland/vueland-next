"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VSelect = require("./VSelect");

Object.keys(_VSelect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VSelect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VSelect[key];
    }
  });
});
//# sourceMappingURL=index.js.map