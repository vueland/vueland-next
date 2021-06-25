export function useSelect() {
  const select = (items, item) => {
    items.value.forEach(it => {
      it.active = item.ref.value === it.ref;
    });
  };

  return {
    select
  };
}
//# sourceMappingURL=use-select-multiple.js.map