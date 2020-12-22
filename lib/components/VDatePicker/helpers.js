import { h } from 'vue';
export function genTableRows(vNodesArray, rowClassName, cellsInRow) {
  const tableRows = [];
  let vNodesInRow = [];

  const genTableRow = cellVNodes => {
    return h('div', {
      class: rowClassName
    }, cellVNodes);
  };

  for (let i = 0; i <= vNodesArray.length; i += 1) {
    if (i && !(i % cellsInRow)) {
      tableRows.push(genTableRow(vNodesInRow));
      vNodesInRow = [];
    }

    vNodesInRow.push(vNodesArray[i]);
  }

  if (vNodesInRow.length) {
    tableRows.push(genTableRow(vNodesInRow));
  }

  return tableRows;
}
export function parseDate(selectedDate) {
  const date = new Date(selectedDate);
  const day = date.getDay();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    isHoliday: day === 0 || day === 6,
    day
  };
}
//# sourceMappingURL=helpers.js.map