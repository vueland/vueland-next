export function useSelect() {
  const select = (items, item) => {
    items.value.forEach(it => {
      if (item.ref.value === it.ref && it.active) {
        it.active = false;
        return;
      }

      it.active = item.ref.value === it.ref;
    });
  };

  return {
    select
  };
}
//# sourceMappingURL=use-select-multiple.js.map