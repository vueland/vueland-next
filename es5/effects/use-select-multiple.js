"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelect = useSelect;

function useSelect() {
  var select = function select(items, item) {
    items.value.forEach(function (it) {
      if (!it.active) it.active = item.ref.value === it.ref;else it.active = false;
    });
  };

  return {
    select: select
  };
}
//# sourceMappingURL=use-select-multiple.js.map