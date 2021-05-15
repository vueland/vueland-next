import { h, VNode } from 'vue'
import { getFullYear, getMonth, getDate, getDay } from './utils'

export function genTableRows(
  vNodesArray: VNode[],
  rowClassName: string,
  cellsInRow: number
) {
  const tableRows: VNode[] = []
  let vNodesInRow: VNode[] = []

  const genTableRow = (cellVNodes) => {
    return h('div', { class: rowClassName }, cellVNodes)
  }

  for (let i = 0; i <= vNodesArray.length; i += 1) {
    if (i && !(i % cellsInRow)) {
      tableRows.push(genTableRow(vNodesInRow))
      vNodesInRow = []
    }

    vNodesInRow.push(vNodesArray[i])
  }

  if (vNodesInRow.length) {
    tableRows.push(genTableRow(vNodesInRow) as any)
  }

  return tableRows
}

export function toDateString(date) {
  return new Date(date.year, date.month, date.date)
}

export function parseDate(selectedDate: Date | string) {
  const date = new Date(selectedDate)
  const day = getDay(date)

  return {
    year: getFullYear(date),
    month: getMonth(date),
    date: getDate(date),
    mls: date.getTime(),
    day,
  }
}
