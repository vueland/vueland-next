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

  return tableRows
}

export function parseDate(selectedDate: string) {
  const date = new Date(selectedDate)

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  }
}

