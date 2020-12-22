"use strict";

var _testUtils = require("@vue/test-utils");

var _VCheckbox = require("../VCheckbox");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('VCheckbox', function () {
  var mountFunction;
  beforeEach(function () {
    mountFunction = function mountFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VCheckbox.VCheckbox, options);
    };
  });
  it('should mount component and match snapshot', function () {
    var cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set disabled and match snapshot', function () {
    var disabled = true;
    var cmp = mountFunction({
      propsData: {
        disabled: disabled
      }
    });
    expect(cmp.attributes()["class"]).toContain('v-checkbox--disabled');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set label and match snapshot', function () {
    var label = 'checkbox label';
    var cmp = mountFunction({
      propsData: {
        label: label
      }
    });
    expect(cmp.find('.v-label').text()).toContain(label);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set validate and match snapshot', function () {
    var validate = true;
    var cmp = mountFunction({
      propsData: {
        validate: validate
      }
    });
    expect(cmp.attributes()["class"]).toContain('v-validatable');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should emit events when clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var modelValue, props, cmp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modelValue = false;
            props = {
              modelValue: modelValue
            };
            cmp = mountFunction({
              props: props
            });
            _context.next = 5;
            return cmp.trigger('click');

          case 5:
            expect(cmp.emitted().checked[0][0]).toBe(true);
            expect(cmp.emitted()['update:modelValue'][0][0]).toBe(true);
            expect(cmp.attributes()["class"]).toContain('v-checkbox--checked');
            expect(cmp.html()).toMatchSnapshot();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should return true when clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var stub, modelValue, props, cmp;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stub = jest.fn();
            modelValue = false;
            props = {
              modelValue: modelValue,
              onChecked: stub
            };
            cmp = mountFunction({
              props: props
            });
            _context2.next = 6;
            return cmp.trigger('click');

          case 6:
            expect(stub).toBeCalledTimes(1);
            expect(stub).toBeCalledWith(true);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should add value to array when clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var modelValue, value, props, cmp;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            modelValue = [];
            value = {
              name: 'John'
            };
            props = {
              modelValue: modelValue,
              value: value
            };
            cmp = mountFunction({
              props: props
            });
            _context3.next = 6;
            return cmp.trigger('click');

          case 6:
            expect(modelValue).toContain(value);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should remove value from array when toggled off', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var stub, value, modelValue, props, cmp;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            stub = jest.fn();
            value = {
              name: 'John'
            };
            modelValue = [value];
            props = {
              modelValue: modelValue,
              value: value,
              onChecked: stub
            };
            cmp = mountFunction({
              props: props
            });
            _context4.next = 7;
            return cmp.trigger('click');

          case 7:
            expect(stub).toHaveBeenCalledWith([]);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('should set "on" and "off" icon and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var onIcon, offIcon, props, cmp;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            onIcon = 'foo';
            offIcon = 'bar';
            props = {
              onIcon: onIcon,
              offIcon: offIcon
            };
            cmp = mountFunction({
              props: props
            });
            _context5.next = 6;
            return cmp.trigger('click');

          case 6:
            expect(cmp.find('.foo').exists()).toBe(true);
            _context5.next = 9;
            return cmp.trigger('click');

          case 9:
            expect(cmp.find('.bar').exists()).toBe(true);
            expect(cmp.html()).toMatchSnapshot();

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should set validate and match snapshot', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var validate, props, cmp;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            validate = true;
            props = {
              validate: validate,
              modelValue: false
            };
            cmp = mountFunction({
              props: props
            });
            _context6.next = 5;
            return cmp.trigger('click');

          case 5:
            _context6.next = 7;
            return cmp.trigger('click');

          case 7:
            expect(cmp.find('.v-icon').attributes()["class"]).toContain('danger--text');
            expect(cmp.html()).toMatchSnapshot();

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});
//# sourceMappingURL=VCheckbox.spec.js.map