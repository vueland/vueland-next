"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VButton = require("./VButton");

Object.keys(_VButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VButton[key];
    }
  });
});
//# sourceMappingURL=index.js.map