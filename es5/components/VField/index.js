"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VField = require("./VField");

Object.keys(_VField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VField[key];
    }
  });
});
//# sourceMappingURL=index.js.map