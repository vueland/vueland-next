"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VForm = require("./VForm");

Object.keys(_VForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VForm[key];
    }
  });
});
//# sourceMappingURL=index.js.map