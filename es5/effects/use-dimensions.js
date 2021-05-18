"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDimensions = useDimensions;

var _vue = require("vue");

function useDimensions() {
  var dimensions = (0, _vue.reactive)({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    content: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    pageYOffset: 0,
    pageWidth: 0
  });
  var contentRef = (0, _vue.ref)(null);
  var activator;
  var activatorRects;
  var offset = 10;
  dimensions.pageYOffset = getOffsetTop();

  function getBoundedClientRect(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  }

  function getInnerHeight() {
    if (!window) return 0;
    return window.innerHeight || document.documentElement.clientHeight;
  }

  function getOffsetTop() {
    if (!window) return 0;
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function snapShot(cb) {
    requestAnimationFrame(function () {
      var el = contentRef.value;

      if (!el || el.style.display !== 'none') {
        el._trans = getComputedStyle(el).transition;
        el.style.transition = '';
        cb();
        return;
      }

      el.style.display = 'inline-block';
      cb();
      el.style.display = 'none';
    });
  }

  function setDimensions(activatorRef) {
    activator = activatorRef.value;
    activatorRects = getBoundedClientRect(activator);
    setActivatorDimensions();
    setContentDimensions();
    updateDimensions();
  }

  function updateDimensions() {
    snapShot(function () {
      dimensions.content.height = contentRef.value.offsetHeight;
      dimensions.pageYOffset = getOffsetTop();
      var scrollHeight = dimensions.pageYOffset + getInnerHeight();
      var contentFull = dimensions.content.height + dimensions.content.top;
      var diff = scrollHeight - contentFull;
      if (diff < 0) dimensions.content.top += diff - offset;
    });
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRects.width;
    dimensions.activator.top = activatorRects.top + pageYOffset;
    dimensions.activator.left = activatorRects.left;
  }

  function setContentDimensions() {
    dimensions.content.top = activatorRects.top + pageYOffset;
    dimensions.content.left = activatorRects.left;
    dimensions.content.width = activatorRects.width;
  }

  return {
    dimensions: dimensions,
    contentRef: contentRef,
    setDimensions: setDimensions,
    updateDimensions: updateDimensions
  };
}
//# sourceMappingURL=use-dimensions.js.map