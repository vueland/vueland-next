"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VProgressLinear = require("./VProgressLinear");

Object.keys(_VProgressLinear).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VProgressLinear[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VProgressLinear[key];
    }
  });
});
//# sourceMappingURL=index.js.map