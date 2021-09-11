"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonth = getMonth;
exports.getFullYear = getFullYear;
exports.getDate = getDate;
exports.getDay = getDay;
exports.getHours = getHours;
exports.getMinutes = getMinutes;
exports.setFullYear = setFullYear;
exports.setMonth = setMonth;
exports.setDate = setDate;
exports.isValidDate = isValidDate;
exports.formatDate = formatDate;
exports.validateDateInput = validateDateInput;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getMonth(date) {
  return date.getMonth();
}

function getFullYear(date) {
  return date.getFullYear();
}

function getDate(date) {
  return date.getDate();
}

function getDay(date) {
  return date.getDay();
}

function getHours(date) {
  return date.getHours();
}

function getMinutes(date) {
  return date.getMinutes();
}

function setFullYear(date, value) {
  return date.setFullYear(value);
}

function setMonth(date, value) {
  return date.setMonth(value);
}

function setDate(date, value) {
  return date.setDate(value);
}

function isValidDate(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return false;
  }

  return !isNaN(date.getTime());
}

function getDayNameAbbr(date, days) {
  if (_typeof(date) !== 'object') {
    throw TypeError('Invalid Type');
  }

  return days[getDay(date)];
}

function getMonthName(month, months) {
  if (!months) {
    throw Error('missing second parameter Months array');
  }

  return months[month];
}

function getMonthNameAbbr(month, monthsAbbr) {
  if (!monthsAbbr) {
    throw Error('missing 2nd paramter Months array');
  }

  if (_typeof(month) === 'object') {
    return monthsAbbr[getMonth(month)];
  }

  if (typeof month === 'number') {
    return monthsAbbr[month];
  }

  throw TypeError('Invalid type');
}

function formatDate(date, format, translation) {
  var year = getFullYear(date);
  var month = getMonth(date) + 1;
  var day = getDate(date);
  return format.replace(/dd/, ('0' + day).slice(-2)).replace(/d/, "".concat(day)).replace(/yyyy/, "".concat(year)).replace(/yy/, String(year).slice(2)).replace(/MMMM/, getMonthName(getMonth(date), translation.months)).replace(/MMM/, getMonthNameAbbr(getMonth(date), translation.monthsAbbr)).replace(/MM/, ('0' + month).slice(-2)).replace(/M(?!a|ä|e)/, "".concat(month)).replace(/D(?!e|é|i)/, getDayNameAbbr(date, translation.week));
}

function validateDateInput(val) {
  return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
}
//# sourceMappingURL=utils.js.map