"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlayProps = overlayProps;
exports.useOverlay = useOverlay;

var _vue = require("vue");

var _components = require("../components");

// Vue API
// Components
function overlayProps() {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      "default": function _default() {
        return 'white--base';
      }
    }
  };
}

function useOverlay(props) {
  var overlayComponent = (0, _vue.ref)(null);
  var hideOverlay = (0, _vue.ref)(true);

  var createOverlay = function createOverlay() {
    overlayComponent.value = _components.VOverlay;
    console.log(overlayComponent.value, props);
  };

  var removeOverlay = function removeOverlay() {
    if (overlayComponent) {
      hideOverlay.value = false;
    }
  };

  return {
    createOverlay: createOverlay,
    removeOverlay: removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map