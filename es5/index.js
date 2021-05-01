"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  vueland: true
};
Object.defineProperty(exports, "vueland", {
  enumerable: true,
  get: function get() {
    return _library.library;
  }
});
exports["default"] = void 0;

require("../src/styles/scss/main.scss");

var _library = require("./library");

var _index = require("./components/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});
var _default = _library.library;
exports["default"] = _default;
//# sourceMappingURL=index.js.map