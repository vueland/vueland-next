"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VAutocomplete = require("./VAutocomplete");

Object.keys(_VAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VAutocomplete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VAutocomplete[key];
    }
  });
});
//# sourceMappingURL=index.js.map