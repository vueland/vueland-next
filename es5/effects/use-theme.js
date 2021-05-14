"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeProps = themeProps;
exports.useTheme = useTheme;

var _vue = require("vue");

var _colors = _interopRequireDefault(require("../utils/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultThemeColors = {
  light: {
    base: _colors["default"].grey.darken4,
    primary: _colors["default"].blue.base,
    secondary: _colors["default"].blue.darken2,
    accent: _colors["default"].blue.accent3,
    error: _colors["default"].red.accent3,
    info: _colors["default"].blue.accent3,
    success: _colors["default"].green.base,
    warning: _colors["default"].amber.base
  },
  dark: {
    base: _colors["default"].shades.white,
    primary: _colors["default"].purple.base,
    secondary: _colors["default"].purple.darken2,
    accent: _colors["default"].pink.accent2,
    error: _colors["default"].red.accent3,
    info: _colors["default"].blue.accent3,
    success: _colors["default"].green.accent3,
    warning: _colors["default"].amber.accent3
  }
};

function themeProps() {
  return {
    dark: Boolean
  };
}

function useTheme() {
  var _options$theme, _options$theme$themes, _options$theme2, _options$theme2$theme, _options$theme3;

  var options = (0, _vue.inject)('$options');
  var light = (options === null || options === void 0 ? void 0 : (_options$theme = options.theme) === null || _options$theme === void 0 ? void 0 : (_options$theme$themes = _options$theme.themes) === null || _options$theme$themes === void 0 ? void 0 : _options$theme$themes.light) || {};
  var dark = (options === null || options === void 0 ? void 0 : (_options$theme2 = options.theme) === null || _options$theme2 === void 0 ? void 0 : (_options$theme2$theme = _options$theme2.themes) === null || _options$theme2$theme === void 0 ? void 0 : _options$theme2$theme.dark) || {};

  if (!(options !== null && options !== void 0 && (_options$theme3 = options.theme) !== null && _options$theme3 !== void 0 && _options$theme3.dark)) {
    return _objectSpread(_objectSpread({}, defaultThemeColors.light), light);
  }

  return _objectSpread(_objectSpread({}, defaultThemeColors.dark), dark);
}
//# sourceMappingURL=use-theme.js.map