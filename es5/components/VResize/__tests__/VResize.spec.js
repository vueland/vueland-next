"use strict";

var _testUtils = require("@vue/test-utils");

var _VResize = require("../VResize");

var _VCard = require("../../VCard");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('VResize', function () {
  var mountInWrapFunction;
  var mountFunction;
  beforeEach(function () {
    mountInWrapFunction = function mountInWrapFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VCard.VCard, _objectSpread({
        slots: {
          "default": _VResize.VResize.setup(options, {})
        }
      }, options));
    };

    mountFunction = function mountFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VResize.VResize, _objectSpread({}, options));
    };
  });
  it('should mount the component and match snapshot', function () {
    var cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set top prop and match snapshot', function () {
    var top = true;
    var cmp = mountFunction({
      propsData: {
        top: top
      }
    });
    expect(cmp.find('.v-resize').attributes()["class"]).toContain('v-resize--top');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set left prop and match snapshot', function () {
    var left = true;
    var cmp = mountFunction({
      propsData: {
        left: left
      }
    });
    expect(cmp.find('.v-resize').attributes()["class"]).toContain('v-resize--left');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set right prop and match snapshot', function () {
    var right = true;
    var cmp = mountFunction({
      propsData: {
        right: right
      }
    });
    expect(cmp.find('.v-resize').attributes()["class"]).toContain('v-resize--right');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set bottom prop and match snapshot', function () {
    var bottom = true;
    var cmp = mountFunction({
      propsData: {
        bottom: bottom
      }
    });
    expect(cmp.find('.v-resize').attributes()["class"]).toContain('v-resize--bottom');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set top prop and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var cmp, resizer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cmp = mountInWrapFunction({
              top: true
            });
            resizer = cmp.find('.v-resize');
            _context.next = 4;
            return resizer.trigger('mousedown');

          case 4:
            _context.next = 6;
            return resizer.trigger('mousemove');

          case 6:
            expect(cmp.html()).toMatchSnapshot();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=VResize.spec.js.map