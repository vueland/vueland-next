"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSimpleFunctional = createSimpleFunctional;
exports.addOnceListener = addOnceListener;
exports.convertToUnit = convertToUnit;
exports.warning = warning;
exports.copyWithoutLink = copyWithoutLink;
exports.addScopedSlot = void 0;

var _vue = require("vue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function copyWithoutLink(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var addScopedSlot = function addScopedSlot(slotName, slots) {
  return function (scoped) {
    var arg = _objectSpread({}, scoped);

    return slots[slotName] && slots[slotName](arg);
  };
};

exports.addScopedSlot = addScopedSlot;
//# sourceMappingURL=index.js.map