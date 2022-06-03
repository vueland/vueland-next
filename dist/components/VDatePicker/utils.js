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
    return format
        .replace(/dd/, ('0' + day).slice(-2))
        .replace(/d/, `${day}`)
        .replace(/yyyy/, `${year}`)
        .replace(/yy/, String(year).slice(2))
        .replace(/MMMM/, getMonthName(getMonth(date), translation.months))
        .replace(/MMM/, getMonthNameAbbr(getMonth(date), translation.monthsAbbr))
        .replace(/MM/, ('0' + month).slice(-2))
        .replace(/M(?!a|ä|e)/, `${month}`)
        .replace(/D(?!e|é|i)/, getDayNameAbbr(date, translation.week));
}
export function validateDateInput(val) {
    return (val === null ||
        val instanceof Date ||
        typeof val === 'string' ||
        typeof val === 'number');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGF0ZVBpY2tlci91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXQSxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVU7SUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBVTtJQUNwQyxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUMzQixDQUFDO0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxJQUFVO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ3ZCLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLElBQVU7SUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsSUFBVTtJQUNqQyxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUN4QixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVO0lBQ25DLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQzFCLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSztJQUNsQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDN0IsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDakMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVCLENBQUM7QUFFRCxNQUFNLFVBQVUs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UUFDdkIsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUN4QixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIERhdGVMb2NhbGVzID0ge1xuICBtb250aHM6IHN0cmluZ1tdXG4gIG1vbnRoc0FiYnI6IHN0cmluZ1tdXG4gIHdlZWs6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCB0eXBlIERhdGVUcmFuc2xhdGlvbnMgPSB7XG4gIHJ1OiBEYXRlTG9jYWxlc1xuICBlbjogRGF0ZUxvY2FsZXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoKGRhdGU6IERhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbFllYXIoZGF0ZTogRGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRlKGRhdGU6IERhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXkoZGF0ZTogRGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXREYXkoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnMoZGF0ZTogRGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRIb3VycygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW51dGVzKGRhdGU6IERhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsWWVhcihkYXRlLCB2YWx1ZSkge1xuICByZXR1cm4gZGF0ZS5zZXRGdWxsWWVhcih2YWx1ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1vbnRoKGRhdGUsIHZhbHVlKSB7XG4gIHJldHVybiBkYXRlLnNldE1vbnRoKHZhbHVlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0ZShkYXRlLCB2YWx1ZSkge1xuICByZXR1cm4gZGF0ZS5zZXREYXRlKHZhbHVlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZERhdGUoZGF0ZSkge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGUpICE9PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gIWlzTmFOKGRhdGUuZ2V0VGltZSgpKVxufVxuXG5mdW5jdGlvbiBnZXREYXlOYW1lQWJicihkYXRlLCBkYXlzKSB7XG4gIGlmICh0eXBlb2YgZGF0ZSAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVHlwZScpXG4gIH1cbiAgcmV0dXJuIGRheXNbZ2V0RGF5KGRhdGUpXVxufVxuXG5mdW5jdGlvbiBnZXRNb250aE5hbWUobW9udGg6IG51bWJlciwgbW9udGhzOiBzdHJpbmdbXSkge1xuICBpZiAoIW1vbnRocykge1xuICAgIHRocm93IEVycm9yKCdtaXNzaW5nIHNlY29uZCBwYXJhbWV0ZXIgTW9udGhzIGFycmF5JylcbiAgfVxuXG4gIHJldHVybiBtb250aHNbbW9udGhdXG59XG5cbmZ1bmN0aW9uIGdldE1vbnRoTmFtZUFiYnIobW9udGgsIG1vbnRoc0FiYnIpIHtcbiAgaWYgKCFtb250aHNBYmJyKSB7XG4gICAgdGhyb3cgRXJyb3IoJ21pc3NpbmcgMm5kIHBhcmFtdGVyIE1vbnRocyBhcnJheScpXG4gIH1cbiAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbW9udGhzQWJicltnZXRNb250aChtb250aCldXG4gIH1cbiAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbW9udGhzQWJiclttb250aF1cbiAgfVxuICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgdHlwZScpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKFxuICBkYXRlOiBEYXRlLFxuICBmb3JtYXQ6IHN0cmluZyxcbiAgdHJhbnNsYXRpb246IERhdGVMb2NhbGVzXG4pIHtcbiAgY29uc3QgeWVhciA9IGdldEZ1bGxZZWFyKGRhdGUpXG4gIGNvbnN0IG1vbnRoID0gZ2V0TW9udGgoZGF0ZSkgKyAxXG4gIGNvbnN0IGRheSA9IGdldERhdGUoZGF0ZSlcblxuICByZXR1cm4gZm9ybWF0XG4gICAgLnJlcGxhY2UoL2RkLywgKCcwJyArIGRheSkuc2xpY2UoLTIpKVxuICAgIC5yZXBsYWNlKC9kLywgYCR7ZGF5fWApXG4gICAgLnJlcGxhY2UoL3l5eXkvLCBgJHt5ZWFyfWApXG4gICAgLnJlcGxhY2UoL3l5LywgU3RyaW5nKHllYXIpLnNsaWNlKDIpKVxuICAgIC5yZXBsYWNlKC9NTU1NLywgZ2V0TW9udGhOYW1lKGdldE1vbnRoKGRhdGUpLCB0cmFuc2xhdGlvbi5tb250aHMpKVxuICAgIC5yZXBsYWNlKC9NTU0vLCBnZXRNb250aE5hbWVBYmJyKGdldE1vbnRoKGRhdGUpLCB0cmFuc2xhdGlvbi5tb250aHNBYmJyKSlcbiAgICAucmVwbGFjZSgvTU0vLCAoJzAnICsgbW9udGgpLnNsaWNlKC0yKSlcbiAgICAucmVwbGFjZSgvTSg/IWF8w6R8ZSkvLCBgJHttb250aH1gKVxuICAgIC5yZXBsYWNlKC9EKD8hZXzDqXxpKS8sIGdldERheU5hbWVBYmJyKGRhdGUsIHRyYW5zbGF0aW9uLndlZWspKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVEYXRlSW5wdXQodmFsKSB7XG4gIHJldHVybiAoXG4gICAgdmFsID09PSBudWxsIHx8XG4gICAgdmFsIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIHx8XG4gICAgdHlwZW9mIHZhbCA9PT0gJ251bWJlcidcbiAgKVxufVxuIl19