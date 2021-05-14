export const toComparableStringFormat = val => String(Number(val) || val.toLowerCase());
export const addScopedSlot = (slotName, slots) => {
  return scoped => {
    const arg = { ...scoped
    };
    return slots[slotName] && slots[slotName](arg);
  };
};
//# sourceMappingURL=helpers.js.map