"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoPosition = useAutoPosition;

var _vue = require("vue");

function useAutoPosition(props) {
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
  var offset = +props.offsetY || 10;
  var activator;
  var content;
  var activatorRect;
  var diff;
  var minDiff;

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
    return innerHeight || document.documentElement.clientHeight;
  }

  function getOffsetTop() {
    if (!window) return 0;
    return pageYOffset || document.documentElement.scrollTop;
  }

  function calcDiffs() {
    var scrollHeight = getOffsetTop() + getInnerHeight();
    var contentFull = dimensions.content.height + dimensions.activator.top;
    diff = scrollHeight - contentFull;
    minDiff = dimensions.content.height / 100 * 10;
  }

  function calcTopPosition() {
    calcDiffs();

    if (props.bottom) {
      if (diff <= minDiff) return dimensions.activator.top - dimensions.content.height;
      return dimensions.activator.top + dimensions.activator.height;
    }

    if (diff <= minDiff) return dimensions.activator.top + diff;
    return dimensions.activator.top;
  }

  function snapShot(cb) {
    requestAnimationFrame(function () {
      if (!content || content.style.display !== 'none') return cb();
      content.style.display = 'inline-block';
      cb();
      content.style.display = 'none';
    });
  }

  function updateDimensions() {
    return new Promise(function (resolve) {
      snapShot(function () {
        dimensions.activator.height = activator.offsetHeight;
        dimensions.content.height = content.offsetHeight;
        activatorRect = getBoundedClientRect(activator);
        setActivatorDimensions();
        setContentDimensions();
        resolve();
      });
    });
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRect.width;
    dimensions.activator.top = activatorRect.top + pageYOffset;
    dimensions.activator.left = activatorRect.left;
  }

  function setContentDimensions() {
    dimensions.content.top = calcTopPosition() - (!props.bottom && offset || 0);
    dimensions.content.left = dimensions.activator.left;
    dimensions.content.width = dimensions.activator.width;
  }

  function setDimensions(activatorEl) {
    if (!activator) {
      activator = activatorEl;
      content = contentRef.value;
    }

    return updateDimensions();
  }

  return {
    dimensions: dimensions,
    contentRef: contentRef,
    setDimensions: setDimensions,
    updateDimensions: updateDimensions
  };
}
//# sourceMappingURL=use-auto-position.js.map