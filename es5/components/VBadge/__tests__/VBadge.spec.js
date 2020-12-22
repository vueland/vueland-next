"use strict";

var _vue = require("vue");

var _testUtils = require("@vue/test-utils");

var _VBadge = require("../VBadge");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('VBadge', function () {
  var mountFunction;
  beforeEach(function () {
    mountFunction = function mountFunction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _testUtils.mount)(_VBadge.VBadge, _objectSpread({}, options));
    };
  });
  it('should mount component and match snapshot', function () {
    var cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set badge slot and match snapshot', function () {
    var slots = {
      badge: function badge() {
        return 'content';
      }
    };
    var cmp = mountFunction({
      slots: slots
    });
    expect(cmp.find('.v-badge__badge-slot').text()).toEqual(slots.badge());
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set content and match snapshot', function () {
    var props = {
      content: '10'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').text()).toEqual(props.content);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set color and match snapshot', function () {
    var props = {
      color: 'red darken-3'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes()["class"]).toContain(props.color);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set border and match snapshot', function () {
    var props = {
      border: true
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge').attributes()["class"]).toContain('v-badge--border');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set dot style and match snapshot', function () {
    var props = {
      dot: true
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge').attributes()["class"]).toContain('v-badge--dot');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set avatar style and match snapshot', function () {
    var props = {
      avatar: true
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge').attributes()["class"]).toContain('v-badge--avatar');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should render default slot and match snapshot', function () {
    var slots = {
      "default": function _default() {
        return (0, _vue.h)('div', 'slot content');
      }
    };
    var cmp = mountFunction({
      slots: slots
    });
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set left to true and match snapshot', function () {
    var slots = {
      "default": function _default() {
        return (0, _vue.h)('div', 'slot content');
      }
    };
    var props = {
      left: true,
      content: '10'
    };
    var cmp = mountFunction({
      props: props,
      slots: slots
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('left: -12px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set right to true and match snapshot', function () {
    var props = {
      right: true,
      content: '10'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('right: -12px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set top to true and match snapshot', function () {
    var props = {
      top: true,
      content: '10'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('top: -12px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set bottom to true and match snapshot', function () {
    var props = {
      bottom: true,
      content: '10'
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('bottom: -12px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set offset-x and match snapshot', function () {
    var props = {
      right: true,
      content: '10',
      offsetX: 12
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('right: -24px;');
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set offset-y and match snapshot', function () {
    var props = {
      top: true,
      content: '10',
      offsetY: -12
    };
    var cmp = mountFunction({
      props: props
    });
    expect(cmp.find('.v-badge__badge').attributes().style).toContain('top: 0px;');
    expect(cmp.html()).toMatchSnapshot();
  });
});
//# sourceMappingURL=VBadge.spec.js.map