"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIcons = useIcons;

var _vue = require("vue");

var _icons = require("../services/icons");

function useIcons(size) {
  var options = (0, _vue.inject)('$options');
  var icons = _icons.FaIcons;
  var iconSize = _icons.FaSizes[size];

  if (options !== null && options !== void 0 && options.icons) {
    if (options.icons.includes('material-icons')) {
      icons = _icons.MaterialIcons;
      iconSize = _icons.MaterialSizes[size];
    }
  }

  return {
    icons: icons,
    iconSize: iconSize
  };
}
//# sourceMappingURL=use-icons.js.map