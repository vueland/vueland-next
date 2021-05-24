"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroup = useGroup;

var _vue = require("vue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useGroup() {
  var provideGroup = function provideGroup(groupName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var groups = (0, _vue.ref)([]);
    Object.keys(options).forEach(function (key) {
      var value;

      if (typeof options[key] === 'function') {
        value = options[key].bind(null, groups);
      } else {
        value = options[key];
      }

      Object.defineProperty(options, key, {
        value: value
      });
    });
    (0, _vue.provide)(groupName, _objectSpread({
      groups: groups
    }, options));
  };

  var injectGroup = function injectGroup(groupName) {
    var injected = {};
    injected = (0, _vue.inject)(groupName) || null;

    var register = function register(group) {
      injected.groups.value.push(group);
    };

    var unregister = function unregister(group) {
      injected.groups.value.filter(function (it) {
        return it.ref !== group.ref;
      });
    };

    if (injected) {
      return _objectSpread(_objectSpread({}, injected), {}, {
        register: register,
        unregister: unregister
      });
    }

    return null;
  };

  return {
    provideGroup: provideGroup,
    injectGroup: injectGroup
  };
}
//# sourceMappingURL=use-group.js.map