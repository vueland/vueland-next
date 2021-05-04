import { Slots } from 'vue'

export const toComparableStringFormat = (val) =>
  String(Number(val) || val.toLowerCase())

export const addScopedSlot = (slotName: string, slots: Slots) => {
  return (scoped) => {
    const arg: any = { ...scoped }

    return slots[slotName] && slots[slotName]!(arg)
  }
}
