"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateStringSeparator = dateStringSeparator;

function dateStringSeparator(str) {
  var symbol = str.match(/\W/)[0];
  if (!symbol) return null;
  var separated = str.trim().split(symbol);
  return {
    symbol: symbol,
    separated: separated
  };
}
//# sourceMappingURL=util.js.map