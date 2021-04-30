"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandHooks = void 0;
var init = {
  transition: null,
  propSize: "",
  height: 0,
  width: 0
};

var resetStyles = function resetStyles(el) {
  el.style[init.propSize] = "";
  el.style.transition = "";
};

var getChildrenSizes = function getChildrenSizes(el) {
  return Array.prototype.reduce.call(el.children, function (acc, it) {
    var height = getComputedStyle(it)[init.propSize];
    return acc += parseFloat(height);
  }, 0);
};

var setInitStyles = function setInitStyles(el) {
  init.transition = getComputedStyle(el).transition;
  init[init.propSize] = getChildrenSizes(el);
};

var expandHooks = function expandHooks(expandedParentClass) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    onBeforeEnter: function onBeforeEnter(el) {
      init.propSize = x ? "width" : "height";
      el.style.transition = "";
    },
    onEnter: function onEnter(el) {
      setInitStyles(el);
      el.style[init.propSize] = "0";
      el.style.transition = init.transition;
      requestAnimationFrame(function () {
        el.style[init.propSize] = "".concat(init[init.propSize], "px");
      });

      if (expandedParentClass) {
        el.parentNode.classList.add(expandedParentClass);
      }
    },
    onAfterEnter: function onAfterEnter(el) {
      el.parentNode.classList.remove(expandedParentClass);
      resetStyles(el);
    },
    onBeforeLeave: function onBeforeLeave(el) {
      setInitStyles(el);
    },
    onLeave: function onLeave(el) {
      el.style.transition = init.transition;
      el.style[init.propSize] = "".concat(init[init.propSize], "px");
      requestAnimationFrame(function () {
        return el.style[init.propSize] = "0";
      });
    },
    onAfterLeave: function onAfterLeave(el) {
      requestAnimationFrame(function () {
        return resetStyles(el);
      });
    }
  };
};

exports.expandHooks = expandHooks;
//# sourceMappingURL=expand-transition.js.map