"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlayProps = overlayProps;
exports.useOverlay = useOverlay;

var _components = require("../components");

// Components
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

function useOverlay(props) {
  var createOverlay = function createOverlay() {
    var propsObject = {
      active: props.overlay,
      hide: !props.overlay,
      opacity: props.overlayOpacity,
      color: props.overlayColor
    };
    return _components.VOverlay.setup(propsObject, {});
  };

  var removeOverlay = function removeOverlay() {// if (props.overlay) {
    // }
  };

  return {
    createOverlay: createOverlay,
    removeOverlay: removeOverlay
  };
}
//# sourceMappingURL=use-overlay.js.map