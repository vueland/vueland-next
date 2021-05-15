export function getMonth(date) {
  return date.getMonth();
}
export function getFullYear(date) {
  return date.getFullYear();
}
export function getDate(date) {
  return date.getDate();
}
export function getDay(date) {
  return date.getDay();
}
export function getHours(date) {
  return date.getHours();
}
export function getMinutes(date) {
  return date.getMinutes();
}
export function setFullYear(date, value) {
  return date.setFullYear(value);
}
export function setMonth(date, value) {
  return date.setMonth(value);
}
export function setDate(date, value) {
  return date.setDate(value);
}
export function isValidDate(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return false;
  }

  return !isNaN(date.getTime());
}

function getDayNameAbbr(date, days) {
  if (typeof date !== 'object') {
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

  if (typeof month === 'object') {
    return monthsAbbr[getMonth(month)];
  }

  if (typeof month === 'number') {
    return monthsAbbr[month];
  }

  throw TypeError('Invalid type');
}

export function formatDate(date, format, translation) {
  const year = getFullYear(date);
  const month = getMonth(date) + 1;
  const day = getDate(date);
  return format.replace(/dd/, ('0' + day).slice(-2)).replace(/d/, `${day}`).replace(/yyyy/, `${year}`).replace(/yy/, String(year).slice(2)).replace(/MMMM/, getMonthName(getMonth(date), translation.months)).replace(/MMM/, getMonthNameAbbr(getMonth(date), translation.monthsAbbr)).replace(/MM/, ('0' + month).slice(-2)).replace(/M(?!a|ä|e)/, `${month}`).replace(/D(?!e|é|i)/, getDayNameAbbr(date, translation.week));
}
export function validateDateInput(val) {
  return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
}
//# sourceMappingURL=utils.js.map