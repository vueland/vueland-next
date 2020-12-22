"use strict";

var _testUtils = require("@vue/test-utils");

var _VTooltip = require("../VTooltip");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var activatorSlot = "\n        <template v-slot:activator=\"{ on }\">\n          <div class=\"activator\" v-on=\"on\">\n          </div>\n        </template>";
var defaultSlot = '<span>some text</span>';
describe('VTooltip', function () {
  var mountFunction;
  beforeEach(function () {
    mountFunction = function mountFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VTooltip.VTooltip, options);
    };
  });
  it('should mount component and match snapshot', function () {
    var cmp = mountFunction();
    expect(cmp.find('.v-tooltip__content').attributes().style).toBe('display: none;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set activator and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var cmp = mountFunction({
      slots: slots
    });
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should trigger mouseenter event, show tooltip and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var slots, cmp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            slots = {
              activator: activatorSlot,
              "default": defaultSlot
            };
            cmp = mountFunction({
              slots: slots
            });
            _context.next = 4;
            return cmp.find('.activator').trigger('mouseenter');

          case 4:
            expect(cmp.find('.v-tooltip__content').attributes().style).toBe(undefined);
            expect(cmp.html()).toMatchSnapshot();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should trigger mouseleave event, hide tooltip and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var slots, cmp;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            slots = {
              activator: activatorSlot,
              "default": defaultSlot
            };
            cmp = mountFunction({
              slots: slots
            });
            _context2.next = 4;
            return cmp.find('.activator').trigger('mouseenter');

          case 4:
            _context2.next = 6;
            return cmp.find('.activator').trigger('mouseleave');

          case 6:
            expect(cmp.find('.v-tooltip__content').attributes().style).toContain('display: none;');
            expect(cmp.html()).toMatchSnapshot();

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should render component with top and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      top: true
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().top).toBe(true);
    expect(cmp.find('.v-tooltip--top').exists()).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should render component with right and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      right: true
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().right).toBe(true);
    expect(cmp.find('.v-tooltip--right').exists()).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should render component with bottom and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      bottom: true
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().bottom).toBe(true);
    expect(cmp.find('.v-tooltip--bottom').exists()).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should render component with left and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      left: true
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().left).toBe(true);
    expect(cmp.find('.v-tooltip--left').exists()).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set z-index and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      zIndex: 100
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().zIndex).toEqual(100);
    expect(cmp.find('.v-tooltip__content').attributes().style).toContain('z-index: 100;');
  });
  it('should set offsetX and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      offsetX: 100
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().offsetX).toEqual(100);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set offsetY and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      offsetY: 150
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().offsetY).toEqual(150);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set min width and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      minWidth: 150
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().minWidth).toEqual(150);
    expect(cmp.find('.v-tooltip__content').attributes().style).toContain('min-width: 150px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set max width and match snapshot', function () {
    var slots = {
      activator: activatorSlot,
      "default": defaultSlot
    };
    var props = {
      maxWidth: 270
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.props().maxWidth).toEqual(270);
    expect(cmp.find('.v-tooltip__content').attributes().style).toContain('max-width: 270px;');
    expect(cmp.html()).toMatchSnapshot();
  });
});
//# sourceMappingURL=VTooltip.spec.js.map