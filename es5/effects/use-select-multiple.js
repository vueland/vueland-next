"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelect = useSelect;

function useSelect() {
  var select = function select(items, item) {
    items.value.forEach(function (it) {
      if (item.ref.value === it.ref && it.active) {
        it.active = false;
        return;
      }

      it.active = item.ref.value === it.ref;
    });
  };

  return {
    select: select
  };
}
//# sourceMappingURL=use-select-multiple.js.map