"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VDataTable = require("./VDataTable");

Object.keys(_VDataTable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VDataTable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VDataTable[key];
    }
  });
});
//# sourceMappingURL=index.js.map