"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoPositionProps = autoPositionProps;
exports.useAutoPosition = useAutoPosition;

var _vue = require("vue");

function autoPositionProps() {
  return {
    positionX: {
      type: Number,
      "default": 0
    },
    positionY: {
      type: Number,
      "default": 0
    }
  };
}

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

  var isAbsolutePositioned = (0, _vue.computed)(function () {
    return props.positionY || props.positionX;
  });

  function getInnerHeight() {
    if (!window) return 0;
    return innerHeight || document.documentElement.clientHeight;
  }

  function getOffsetTop() {
    if (!window) return 0;
    return pageYOffset || document.documentElement.scrollTop;
  }

  function getOffsetLeft() {
    if (!window) return 0;
    return pageXOffset || document.documentElement.scrollLeft;
  }

  function getContentAbsoluteBottom() {
    return dimensions.content.height + props.positionY + getOffsetTop();
  }

  function getContentBottom() {
    return dimensions.content.height + dimensions.activator.top;
  }

  function calcDiffs() {
    var pageHeight = getOffsetTop() + getInnerHeight() - offset;
    var contentBottom = isAbsolutePositioned.value ? getContentAbsoluteBottom() : getContentBottom();
    minDiff = dimensions.content.height / 100 * 10;
    return pageHeight - contentBottom;
  }

  function calcLeftPosition() {
    if (props.positionX) return props.positionX + getOffsetLeft();
    return dimensions.activator.left;
  }

  function calcTopPosition() {
    diff = calcDiffs();

    if (props.positionY) {
      if (diff <= minDiff) return props.positionY + getOffsetTop() + diff;
      return props.positionY + getOffsetTop();
    }

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
        activator && setActivatorDimensions();
        content && setContentDimensions();
        resolve();
      });
    });
  }

  function setActivatorDimensions() {
    dimensions.activator = getBoundedClientRect(activator);
    dimensions.activator.height = activator.offsetHeight;
    dimensions.activator.top = dimensions.activator.top + getOffsetTop();
    dimensions.activator.left = dimensions.activator.left + getOffsetLeft();
  }

  function setContentDimensions() {
    var rect = activator ? dimensions.activator : getBoundedClientRect(content);
    dimensions.content.height = content.offsetHeight;
    dimensions.content.top = calcTopPosition();
    dimensions.content.left = calcLeftPosition();
    dimensions.content.width = rect.width;
  }

  function setDimensions(activatorEl) {
    if (!activator && !content) {
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