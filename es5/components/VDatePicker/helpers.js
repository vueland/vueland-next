"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genTableRows = genTableRows;
exports.parseDate = parseDate;

var _vue = require("vue");

function genTableRows(vNodesArray, rowClassName, cellsInRow) {
  var tableRows = [];
  var vNodesInRow = [];

  var genTableRow = function genTableRow(cellVNodes) {
    return (0, _vue.h)('div', {
      "class": rowClassName
    }, cellVNodes);
  };

  for (var i = 0; i <= vNodesArray.length; i += 1) {
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

function parseDate(selectedDate) {
  var date = new Date(selectedDate);
  var day = date.getDay();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    isHoliday: day === 0 || day === 6,
    day: day
  };
}
//# sourceMappingURL=helpers.js.map