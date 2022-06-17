import { h } from 'vue';
import { getFullYear, getMonth, getDate, getDay } from './utils';
export function genTableRows(vNodesArray, rowClassName, cellsInRow) {
    const tableRows = [];
    let vNodesInRow = [];
    const genTableRow = (cellVNodes) => {
        return h('div', { class: rowClassName }, cellVNodes);
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
export function toDateString(date) {
    return new Date(date.year, date.month, date.date);
}
export function parseDate(selectedDate) {
    const date = new Date(selectedDate);
    const day = getDay(date);
    return {
        year: getFullYear(date),
        month: getMonth(date),
        date: getDate(date),
        mls: date.getTime(),
        day,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRlUGlja2VyL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBUyxNQUFNLEtBQUssQ0FBQTtBQUM5QixPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBR2hFLE1BQU0sVUFBVSxZQUFZLENBQzFCLFdBQW9CLEVBQ3BCLFlBQW9CLEVBQ3BCLFVBQWtCO0lBRWxCLE1BQU0sU0FBUyxHQUFZLEVBQUUsQ0FBQTtJQUM3QixJQUFJLFdBQVcsR0FBWSxFQUFFLENBQUE7SUFFN0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNqQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFBO0lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7WUFDeEMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtTQUNqQjtRQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDakM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFRLENBQUMsQ0FBQTtLQUNoRDtJQUVELE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQUk7SUFDL0IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ25ELENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLFlBQTJCO0lBQ25ELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV4QixPQUFPO1FBQ0wsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDdkIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDbkIsR0FBRztLQUNKLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgVk5vZGUgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBnZXRGdWxsWWVhciwgZ2V0TW9udGgsIGdldERhdGUsIGdldERheSB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBEYXRlUGlja2VyRGF0ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVGFibGVSb3dzKFxuICB2Tm9kZXNBcnJheTogVk5vZGVbXSxcbiAgcm93Q2xhc3NOYW1lOiBzdHJpbmcsXG4gIGNlbGxzSW5Sb3c6IG51bWJlclxuKSB7XG4gIGNvbnN0IHRhYmxlUm93czogVk5vZGVbXSA9IFtdXG4gIGxldCB2Tm9kZXNJblJvdzogVk5vZGVbXSA9IFtdXG5cbiAgY29uc3QgZ2VuVGFibGVSb3cgPSAoY2VsbFZOb2RlcykgPT4ge1xuICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiByb3dDbGFzc05hbWUgfSwgY2VsbFZOb2RlcylcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IHZOb2Rlc0FycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGkgJiYgIShpICUgY2VsbHNJblJvdykpIHtcbiAgICAgIHRhYmxlUm93cy5wdXNoKGdlblRhYmxlUm93KHZOb2Rlc0luUm93KSlcbiAgICAgIHZOb2Rlc0luUm93ID0gW11cbiAgICB9XG5cbiAgICB2Tm9kZXNJblJvdy5wdXNoKHZOb2Rlc0FycmF5W2ldKVxuICB9XG5cbiAgaWYgKHZOb2Rlc0luUm93Lmxlbmd0aCkge1xuICAgIHRhYmxlUm93cy5wdXNoKGdlblRhYmxlUm93KHZOb2Rlc0luUm93KSBhcyBhbnkpXG4gIH1cblxuICByZXR1cm4gdGFibGVSb3dzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVTdHJpbmcoZGF0ZSkge1xuICByZXR1cm4gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRhdGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUoc2VsZWN0ZWREYXRlOiBEYXRlIHwgc3RyaW5nKTogRGF0ZVBpY2tlckRhdGUge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlKVxuICBjb25zdCBkYXkgPSBnZXREYXkoZGF0ZSlcblxuICByZXR1cm4ge1xuICAgIHllYXI6IGdldEZ1bGxZZWFyKGRhdGUpLFxuICAgIG1vbnRoOiBnZXRNb250aChkYXRlKSxcbiAgICBkYXRlOiBnZXREYXRlKGRhdGUpLFxuICAgIG1sczogZGF0ZS5nZXRUaW1lKCksXG4gICAgZGF5LFxuICB9XG59XG4iXX0=