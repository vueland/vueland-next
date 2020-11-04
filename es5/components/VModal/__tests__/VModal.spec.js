"use strict";

var _testUtils = require("@vue/test-utils");

var _VModal = require("../VModal");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('VModal', function () {
  var mountFunction;
  beforeEach(function () {
    mountFunction = function mountFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VModal.VModal, _objectSpread({}, options));
    };
  });
  it('should mount component and match snapshot', function () {
    var cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set overlay and match snapshot', function () {
    var overlay = true;
    var props = {
      overlay: overlay
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.props().overlay).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set transition and match snapshot', function () {
    var transition = 'fade';
    var props = {
      transition: transition
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.props().transition).toBe(transition);
    expect(cmp.html()).toMatchSnapshot();
  });
});
//# sourceMappingURL=VModal.spec.js.map