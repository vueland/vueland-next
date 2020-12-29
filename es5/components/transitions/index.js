"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VFadeTransition = exports.VExpandTransition = void 0;

var _createTransition = require("./create-transition");

var _expandTransition = require("./expand-transition");

var _fadeTransition = require("./fade-transition");

var VExpandTransition = (0, _createTransition.createVTransition)((0, _expandTransition.expandHooks)('expand-transition'));
exports.VExpandTransition = VExpandTransition;
var VFadeTransition = (0, _createTransition.createVTransition)((0, _fadeTransition.fadeHooks)('fade-transition'));
exports.VFadeTransition = VFadeTransition;
//# sourceMappingURL=index.js.map