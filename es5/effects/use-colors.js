"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorProps = colorProps;
exports.useColors = void 0;

var _colorParser = require("../utils/color-parser");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function colorProps() {
  return {
    color: String
  };
}

var useColors = function useColors(props) {
  var setBackground = function setBackground(color, data) {
    if (!(0, _colorParser.isCssColor)(color)) {
      data["class"][color] = true;
    } else {
      data.style.push({
        'background-color': props.color,
        'border-color': props.color
      });
    }

    return data;
  };

  var setTextColor = function setTextColor(color) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ((0, _colorParser.isCssColor)(color)) {
      data.style = _objectSpread(_objectSpread({}, data.style), {}, {
        color: "".concat(color),
        'caret-color': "".concat(color)
      });
    } else if (color) {
      var _color$trim$split = color.trim().split(' ', 2),
          _color$trim$split2 = _slicedToArray(_color$trim$split, 2),
          colorName = _color$trim$split2[0],
          colorModifier = _color$trim$split2[1];

      data["class"] = _objectSpread(_objectSpread({}, data["class"]), {}, _defineProperty({}, colorName + '--text', true));

      if (colorModifier) {
        data["class"]['text--' + colorModifier] = true;
      }
    }

    return data;
  };

  return {
    setBackground: setBackground,
    setTextColor: setTextColor
  };
};

exports.useColors = useColors;
//# sourceMappingURL=use-colors.js.map