"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCssColor = isCssColor;

function isCssColor(color) {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
}
//# sourceMappingURL=color-parser.js.map