"use strict";

var _vue = require("vue");

var _testUtils = require("@vue/test-utils");

var _VModal = require("../VModal");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OVERLAY_TIMEOUT = 100;

var delay = function delay() {
  return new Promise(function (res) {
    return setTimeout(res, OVERLAY_TIMEOUT);
  });
};

var WrapComponentFunction = function WrapComponentFunction(props) {
  return (0, _vue.defineComponent)({
    setup: function setup() {
      return function () {
        return (0, _vue.h)('div', {}, (0, _vue.h)(_VModal.VModal, props, {
          "default": function _default() {
            return 'slot content';
          }
        }));
      };
    }
  });
};

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
  it('should set scaleIn transition and match snapshot', function () {
    var props = {
      transition: 'scaleIn'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.props().transition).toBe('scaleIn');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set overlay to true', function () {
    var props = {
      overlay: true
    };
    var wrap = mountFunction({
      props: props
    });
    expect(wrap.props().overlay).toBe(true);
  });
  it('should set overlay color and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var props, wrap;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = {
              overlay: true,
              overlayColor: '#ffffff',
              modelValue: true
            };
            wrap = (0, _testUtils.mount)(WrapComponentFunction(props));
            _context.next = 4;
            return delay();

          case 4:
            expect(wrap.find('.v-overlay').exists()).toBe(true);
            expect(wrap.find('.v-overlay').attributes().style).toContain('background-color: rgb(255, 255, 255); border-color: #ffffff;');
            expect(wrap.html()).toMatchSnapshot();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should open modal and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var props, wrap;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            props = {
              overlay: true,
              modelValue: true
            };
            wrap = (0, _testUtils.mount)(WrapComponentFunction(props));
            _context2.next = 4;
            return delay();

          case 4:
            expect(wrap.find('.v-overlay').exists()).toBe(true);
            expect(wrap.html()).toMatchSnapshot();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should close modal and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var props, wrap;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            props = {
              overlay: true,
              modelValue: false
            };
            wrap = (0, _testUtils.mount)(WrapComponentFunction(props));
            _context3.next = 4;
            return delay();

          case 4:
            expect(wrap.find('.v-overlay').exists()).toBe(false);
            expect(wrap.find('.v-modal').attributes().style).toContain('display: none;');
            expect(wrap.html()).toMatchSnapshot();

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
//# sourceMappingURL=VModal.spec.js.map