"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toComparableStringFormat = void 0;

var toComparableStringFormat = function toComparableStringFormat(val) {
  return String(Number(val) || val.toLowerCase());
};

exports.toComparableStringFormat = toComparableStringFormat;
//# sourceMappingURL=helpers.js.map