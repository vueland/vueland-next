import { inject } from 'vue';
import { FaIcons, MaterialIcons, } from '../services/icons';
export function useIcons() {
    const options = inject('$options', () => null);
    let icons = FaIcons;
    if (options?.icons) {
        if (options.icons.includes('material-icons')) {
            icons = MaterialIcons;
        }
    }
    return { icons };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3VzZS1pY29ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBQzVCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsYUFBYSxHQUNkLE1BQU0sbUJBQW1CLENBQUE7QUFJMUIsTUFBTSxVQUFVLFFBQVE7SUFDdEIsTUFBTSxPQUFPLEdBQXVCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFnQixDQUFBO0lBRWpGLElBQUksS0FBSyxHQUFRLE9BQU8sQ0FBQTtJQUV4QixJQUFJLE9BQU8sRUFBRSxLQUFLLEVBQUU7UUFDbEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzVDLEtBQUssR0FBRyxhQUFhLENBQUE7U0FDdEI7S0FDRjtJQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQTtBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IHtcbiAgRmFJY29ucyxcbiAgTWF0ZXJpYWxJY29ucyxcbn0gZnJvbSAnLi4vc2VydmljZXMvaWNvbnMnXG5pbXBvcnQgeyBNYXliZSB9IGZyb20gJy4uLy4uL3R5cGVzL2Jhc2UnXG5pbXBvcnQgeyBVc2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3R5cGVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSWNvbnMoKSB7XG4gIGNvbnN0IG9wdGlvbnM6IE1heWJlPFVzZXJPcHRpb25zPiA9IGluamVjdCgnJG9wdGlvbnMnLCAoKSA9PiBudWxsKSBhcyBVc2VyT3B0aW9uc1xuXG4gIGxldCBpY29uczogYW55ID0gRmFJY29uc1xuXG4gIGlmIChvcHRpb25zPy5pY29ucykge1xuICAgIGlmIChvcHRpb25zLmljb25zLmluY2x1ZGVzKCdtYXRlcmlhbC1pY29ucycpKSB7XG4gICAgICBpY29ucyA9IE1hdGVyaWFsSWNvbnNcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpY29ucyB9XG59XG4iXX0=