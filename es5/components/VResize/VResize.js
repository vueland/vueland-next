"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VResize = void 0;

require("../../../src/components/VResize/VResize.scss");

var _vue = require("vue");

var _usePosition = require("../../effects/use-position");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VResize = (0, _vue.defineComponent)({
  name: 'v-resize',
  props: _objectSpread({
    emit: {
      type: Boolean,
      "default": false
    },
    customClass: {
      type: String
    },
    minSize: {
      type: [String, Number],
      "default": 50
    }
  }, (0, _usePosition.positionProps)()),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var data = (0, _vue.reactive)({
      parentNode: null,
      startOffset: null,
      offsetTop: 0,
      offsetLeft: 0,
      parentHeight: 0,
      parentWidth: 0,
      marginLeft: 0,
      marginTop: 0,
      left: 0,
      top: 0,
      isActive: false
    });
    var resRef = (0, _vue.ref)(null);
    var classes = (0, _vue.computed)(function () {
      return _defineProperty({
        'v-resize': true,
        'v-resize--active': data.isActive,
        'v-resize--top': props.top,
        'v-resize--bottom': props.bottom,
        'v-resize--right': props.right,
        'v-resize--left': props.left
      }, props.customClass, !!props.customClass);
    });
    var isDirectY = (0, _vue.computed)(function () {
      return props.top || props.bottom;
    });
    var isNeedReverse = (0, _vue.computed)(function () {
      return props.top || props.left;
    });
    var currentSize = (0, _vue.computed)(function () {
      return isDirectY.value ? data.parentHeight : data.parentWidth;
    });
    var sizeProp = (0, _vue.computed)(function () {
      return isDirectY.value ? 'height' : 'width';
    });
    var reverseDirection = (0, _vue.computed)(function () {
      return props.top ? 'top' : 'left';
    });
    var reverseOffsetKey = (0, _vue.computed)(function () {
      var side = reverseDirection.value;
      return 'offset' + side[0].toUpperCase() + side.slice(1);
    });
    var offset = (0, _vue.computed)(function () {
      return isDirectY.value ? data.offsetTop : data.offsetLeft;
    });
    var direction = (0, _vue.computed)(function () {
      return isDirectY.value ? 'clientY' : 'clientX';
    });

    function moveReverse(size) {
      var parentNode = data.parentNode,
          left = data.left,
          top = data.top;
      var reverseTo = reverseDirection.value;
      var value = !isDirectY.value ? currentSize.value - size + left : currentSize.value - size + top;
      parentNode.style[reverseTo] = "".concat(value, "px");
    }

    function setOrEmitSize(size) {
      if (props.emit) return emit('resize', size);
      data.parentNode.style[sizeProp.value] = "".concat(size, "px");
      isNeedReverse.value && moveReverse(size);
    }

    function resize(e) {
      var size;

      if (isNeedReverse.value) {
        size = currentSize.value - (e[direction.value] - offset.value) + data.startOffset;
      } else {
        size = currentSize.value + (e[direction.value] - currentSize.value - offset.value - data.startOffset);
      }

      size > props.minSize && setOrEmitSize(size);
    }

    function resetMinMaxStyles() {
      if (isDirectY.value) {
        data.parentNode.style.maxHeight = '';
        data.parentNode.style.minHeight = '';
      } else {
        data.parentNode.style.maxWidth = '';
        data.parentNode.style.minWidth = '';
      }
    }

    function setParent() {
      var parent = resRef.value.parentNode;
      data.parentNode = parent;
    }

    function computeSizes() {
      var _getComputedStyle = getComputedStyle(data.parentNode),
          top = _getComputedStyle.top,
          left = _getComputedStyle.left,
          height = _getComputedStyle.height,
          width = _getComputedStyle.width,
          marginLeft = _getComputedStyle.marginLeft,
          marginTop = _getComputedStyle.marginTop;

      data.offsetTop = data.parentNode.offsetTop;
      data.offsetLeft = data.parentNode.offsetLeft;
      data.marginLeft = parseFloat(marginLeft);
      data.marginTop = parseFloat(marginTop);
      data.parentHeight = parseFloat(height);
      data.parentWidth = parseFloat(width);
      data.top = parseFloat(top);
      data.left = parseFloat(left);
    }

    function setStartPositions() {
      var side = reverseDirection.value;
      var offset = reverseOffsetKey.value;

      if (data[side] === data[offset]) {
        data.parentNode.style[side] = "".concat(data[offset], "px");
      }
    }

    function disableSelection(e) {
      e.preventDefault();
    }

    function initResize(e) {
      if (!data.isActive) {
        data.isActive = true;
        computeSizes();
        resetMinMaxStyles();
        setStartPositions();
        setStartOffset(e);
      }

      requestAnimationFrame(function () {
        return resize(e);
      });
    }

    function setStartOffset(e) {
      if (isNeedReverse.value) data.startOffset = e[direction.value];else data.startOffset = e[direction.value] - currentSize.value;
      data.startOffset -= offset.value;
    }

    function reset() {
      data.isActive = false;
      resetMinMaxStyles();
    }

    function onMouseup() {
      reset();
      removeHandlers();
    }

    function onMousedown() {
      document.addEventListener('mousemove', initResize);
      document.addEventListener('mouseup', onMouseup);
      document.addEventListener('selectstart', disableSelection);
    }

    function removeHandlers() {
      document.removeEventListener('mousemove', initResize);
      document.removeEventListener('mouseup', onMouseup);
      document.removeEventListener('selectstart', disableSelection);
    }

    (0, _vue.onMounted)(function () {
      setParent();
    });
    (0, _vue.onBeforeUnmount)(function () {
      document.removeEventListener('mousedown', onMousedown);
    });
    return function () {
      return (0, _vue.h)('div', {
        "class": _objectSpread({}, classes.value),
        key: 'resize',
        ref: resRef,
        onMousedown: onMousedown
      });
    };
  }
});
exports.VResize = VResize;
//# sourceMappingURL=VResize.js.map