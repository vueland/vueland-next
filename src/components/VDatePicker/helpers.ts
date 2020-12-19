import { h, VNode } from 'vue'

export function genTableRows(
  vNodesArray: VNode[],
  rowClassName: string,
  cellsInRow: number,
) {
  const tableRows: VNode[] = []
  let vNodesInRow: VNode[] = []

  const genTableRow = cellVNodes => {
    return h('div', {
      class: rowClassName,
    }, cellVNodes)
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

export function parseDate(selectedDate: Date | string) {
  const date = new Date(selectedDate)
  const day = date.getDay()

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    isHoliday: day === 0 || day === 6,
    day,
  }
}

