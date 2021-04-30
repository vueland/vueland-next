"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VCard", {
  enumerable: true,
  get: function get() {
    return _VCard.VCard;
  }
});
exports.VCardActions = exports.VCardContent = exports.VCardSubtitle = exports.VCardTitle = void 0;

var _helpers = require("../../helpers");

var _VCard = require("./VCard");

var VCardTitle = (0, _helpers.createSimpleFunctional)("v-card__title");
exports.VCardTitle = VCardTitle;
var VCardSubtitle = (0, _helpers.createSimpleFunctional)("v-card__subtitle");
exports.VCardSubtitle = VCardSubtitle;
var VCardContent = (0, _helpers.createSimpleFunctional)("v-card__content");
exports.VCardContent = VCardContent;
var VCardActions = (0, _helpers.createSimpleFunctional)("v-card__actions");
exports.VCardActions = VCardActions;
//# sourceMappingURL=index.js.map