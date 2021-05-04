import { Column } from '@/types'

export const toComparableStringFormat = (val) =>
  String(Number(val) || val.toLowerCase());

export function addScopedSlot(col: Column, slotName: string, slots) {
  return (scoped) => {
    const arg: any = { ...scoped }
    if (col.format) arg.format = col.format

    return slots[slotName] && slots[slotName]!(arg)
  }
}
