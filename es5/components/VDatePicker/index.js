"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VDatepicker = require("./VDatepicker");

Object.keys(_VDatepicker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VDatepicker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VDatepicker[key];
    }
  });
});
//# sourceMappingURL=index.js.map