"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlayProps = overlayProps;
exports.useOverlay = useOverlay;

var _vue = require("vue");

var _components = require("../components");

var _helpers = require("@/helpers");

var TIMEOUT = 40;

function overlayProps() {
  return {
    overlay: Boolean,
    overlayColor: {
      type: String,
      "default": '#000000'
    }
  };
}

function useOverlay(props, overlayOn) {
  var container = document.createElement('div');
  var overlayPropsObject = {
    active: false,
    hide: true,
    color: props.overlayColor
  };

  var overlayVNode = function overlayVNode() {
    return _components.VOverlay.setup(overlayPropsObject, {});
  };

  var renderOverlay = function renderOverlay() {
    (0, _vue.render)(overlayVNode(), container);
  };

  renderOverlay();
  var overlayElement = container.firstChild;

  var createOverlay = function createOverlay() {
    var _overlayOn$parentNode;

    overlayOn === null || overlayOn === void 0 ? void 0 : (_overlayOn$parentNode = overlayOn.parentNode) === null || _overlayOn$parentNode === void 0 ? void 0 : _overlayOn$parentNode.insertBefore(overlayElement, overlayOn);
    setTimeout(function () {
      overlayPropsObject.active = true;
      overlayPropsObject.hide = !props.overlay;
      renderOverlay();
    }, TIMEOUT);
  };

  var removeOverlay = function removeOverlay() {
    overlayPropsObject.active = false;
    renderOverlay();

    var remove = function remove() {
      var _overlayOn$parentNode2;

      overlayOn === null || overlayOn === void 0 ? void 0 : (_overlayOn$parentNode2 = overlayOn.parentNode) === null || _overlayOn$parentNode2 === void 0 ? void 0 : _overlayOn$parentNode2.removeChild(overlayElement);
    };

    (0, _helpers.addOnceListener)(overlayElement, 'transitionend', remove);
  };

  return {
    createOverlay: createOverlay,
    removeOverlay: removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map