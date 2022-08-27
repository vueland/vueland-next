import { Vueland } from './library';
import * as directives from './directives';
import components from './async';
export const createLibrary = () => {
    const library = new Vueland();
    const { install } = library;
    Vueland.prototype.install = (app, args) => {
        install.call(library, app, {
            components,
            directives,
            ...args
        });
    };
    return library;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUNuQyxPQUFPLEtBQUssVUFBVSxNQUFNLGNBQWMsQ0FBQTtBQUMxQyxPQUFPLFVBQVUsTUFBTSxTQUFTLENBQUE7QUFFaEMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtJQUNoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO0lBQzdCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7UUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLFVBQVU7WUFDVixVQUFVO1lBQ1YsR0FBRyxJQUFJO1NBQ1IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgVnVlbGFuZCB9IGZyb20gJy4vbGlicmFyeSdcbmltcG9ydCAqIGFzIGRpcmVjdGl2ZXMgZnJvbSAnLi9kaXJlY3RpdmVzJ1xuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSAnLi9hc3luYydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxpYnJhcnkgPSAoKSA9PiB7XG4gIGNvbnN0IGxpYnJhcnkgPSBuZXcgVnVlbGFuZCgpXG4gIGNvbnN0IHsgaW5zdGFsbCB9ID0gbGlicmFyeVxuXG4gIFZ1ZWxhbmQucHJvdG90eXBlLmluc3RhbGwgPSAoYXBwOiBBcHAsIGFyZ3M6IGFueSkgPT4ge1xuICAgIGluc3RhbGwuY2FsbChsaWJyYXJ5LCBhcHAsIHtcbiAgICAgIGNvbXBvbmVudHMsXG4gICAgICBkaXJlY3RpdmVzLFxuICAgICAgLi4uYXJnc1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4gbGlicmFyeVxufVxuXG4iXX0=