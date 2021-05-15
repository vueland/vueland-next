"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genTableRows = genTableRows;
exports.toDateString = toDateString;
exports.parseDate = parseDate;

var _vue = require("vue");

var _utils = require("./utils");

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

function toDateString(date) {
  return new Date(date.year, date.month, date.date);
}

function parseDate(selectedDate) {
  var date = new Date(selectedDate);
  var day = (0, _utils.getDay)(date);
  return {
    year: (0, _utils.getFullYear)(date),
    month: (0, _utils.getMonth)(date),
    date: (0, _utils.getDate)(date),
    mls: date.getTime(),
    day: day
  };
}
//# sourceMappingURL=helpers.js.map