"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSimpleFunctional = createSimpleFunctional;
exports.addOnceListener = addOnceListener;
exports.convertToUnit = convertToUnit;
exports.warning = warning;

var _vue = require("vue");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return (0, _vue.defineComponent)({
    name: name || c.replace(/__/g, '-'),
    setup: function setup(_, _ref) {
      var slots = _ref.slots;
      var propsData = {
        "class": _defineProperty({}, c.trim(), true)
      };
      return function () {
        return (0, _vue.h)(el, propsData, slots["default"] && slots["default"]());
      };
    }
  });
}

function addOnceListener(el, eventName, cb) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var once = function once(event) {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}

function convertToUnit(str) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return "".concat(Number(str)).concat(unit);
  }
}

function warning(warningText) {
  console.warn(warningText);
}
//# sourceMappingURL=index.js.map