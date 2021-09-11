export function useSelect() {
  const select = (items, item) => {
    items.value.forEach(it => {
      if (!it.active) it.active = item.ref.value === it.ref;else it.active = false;
    });
  };

  return {
    select
  };
}
//# sourceMappingURL=use-select-multiple.js.map