"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlayProps = overlayProps;
exports.useOverlay = useOverlay;

var _vue = require("vue");

var _components = require("../components");

var _helpers = require("@/helpers");

function overlayProps() {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      "default": function _default() {
        return 'white';
      }
    }
  };
}

function useOverlay(props, overlayOn) {
  var doc = document;
  var overlayable;
  requestAnimationFrame(function () {
    overlayable = !!overlayOn && doc.querySelector(".".concat(overlayOn));
  });
  var overlayPropsObject = {
    active: false,
    hide: true,
    color: props.overlayColor
  };
  var container = doc.createElement('div');

  var overlayVNode = function overlayVNode() {
    return _components.VOverlay.setup(overlayPropsObject, {});
  };

  var renderOverlay = function renderOverlay(vNode) {
    return (0, _vue.render)(vNode, container);
  };

  renderOverlay(overlayVNode());
  var overlayElement = container.firstChild;

  function createOverlay() {
    overlayable.parentNode.insertBefore(overlayElement, overlayable);
    setTimeout(function () {
      overlayPropsObject.active = true;
      overlayPropsObject.hide = !props.overlay;
      renderOverlay(overlayVNode());
    }, 40);
  }

  function removeOverlay() {
    overlayPropsObject.active = false;
    renderOverlay(overlayVNode());

    function remove() {
      overlayable.parentNode.removeChild(overlayElement);
    }

    (0, _helpers.addOnceListener)(overlayElement, 'transitionend', remove);
  }

  return {
    createOverlay: createOverlay,
    removeOverlay: removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map