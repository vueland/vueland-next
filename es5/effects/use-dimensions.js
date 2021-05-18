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

  function getOffsetTop() {
    if (!window) return 0;
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function setDimensions(activatorRef) {
    activator = activatorRef.value;
    activatorRects = getBoundedClientRect(activator);
    setActivatorDimensions();
    setContentDimensions();
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
    setDimensions: setDimensions
  };
}
//# sourceMappingURL=use-dimensions.js.map