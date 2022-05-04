import { render } from 'vue';
import { VOverlay } from '../components';
import { addOnceListener } from '@/helpers';
const TIMEOUT = 40;
export function overlayProps() {
    return {
        overlay: Boolean,
        overlayColor: {
            type: String,
            default: '#000000',
        },
    };
}
export function useOverlay(props, overlayOn) {
    const container = document.createElement('div');
    const overlayPropsObject = {
        active: false,
        hide: true,
        color: props.overlayColor,
    };
    let overlayElement = null;
    const overlayVNode = () => {
        return VOverlay.setup(overlayPropsObject, {});
    };
    const renderOverlay = () => {
        render(overlayVNode(), container);
    };
    const createOverlay = () => {
        overlayOn?.parentNode?.insertBefore(overlayElement, overlayOn);
        setTimeout(() => {
            overlayPropsObject.active = true;
            overlayPropsObject.hide = !props.overlay;
            renderOverlay();
        }, TIMEOUT);
    };
    const removeOverlay = () => {
        overlayPropsObject.active = false;
        renderOverlay();
        const remove = () => {
            overlayOn?.parentNode?.removeChild(overlayElement);
        };
        addOnceListener(overlayElement, 'transitionend', remove);
    };
    renderOverlay();
    overlayElement = container.firstChild;
    return {
        createOverlay,
        removeOverlay,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLW92ZXJsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9zYWJsZS91c2Utb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBRzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFNeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQU8zQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7QUFFbEIsTUFBTSxVQUFVLFlBQVk7SUFDMUIsT0FBTztRQUNMLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBVSxFQUFFLFNBQW1CO0lBQ3hELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFL0MsTUFBTSxrQkFBa0IsR0FBRztRQUN6QixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUssQ0FBQyxZQUFZO0tBQzFCLENBQUE7SUFFRCxJQUFJLGNBQWMsR0FBcUIsSUFBSSxDQUFBO0lBRTNDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtRQUN4QixPQUFPLFFBQVEsQ0FBQyxLQUFNLENBQ3BCLGtCQUEyQyxFQUMzQyxFQUFrQixDQUNuQixDQUFBO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxZQUFZLEVBQVcsRUFBRSxTQUFVLENBQUMsQ0FBQTtJQUM3QyxDQUFDLENBQUE7SUFFRCxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7UUFDekIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsY0FBZSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBRS9ELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBQ2hDLGtCQUFrQixDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7WUFDeEMsYUFBYSxFQUFFLENBQUE7UUFDakIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ2IsQ0FBQyxDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFFakMsYUFBYSxFQUFFLENBQUE7UUFFZixNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbEIsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsY0FBZSxDQUFDLENBQUE7UUFDckQsQ0FBQyxDQUFBO1FBRUQsZUFBZSxDQUFDLGNBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFBO0lBRUQsYUFBYSxFQUFFLENBQUE7SUFDZixjQUFjLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQTtJQUVyQyxPQUFPO1FBQ0wsYUFBYTtRQUNiLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3Z1ZSdcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IHsgVk92ZXJsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgU2V0dXBDb250ZXh0LCBWTm9kZSB9IGZyb20gJ3Z1ZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgYWRkT25jZUxpc3RlbmVyIH0gZnJvbSAnQC9oZWxwZXJzJ1xuXG5pbnRlcmZhY2UgT3ZlcmxheWFibGUge1xuICBjcmVhdGVPdmVybGF5OiAoKSA9PiB2b2lkXG4gIHJlbW92ZU92ZXJsYXk6ICgpID0+IHZvaWRcbn1cblxuY29uc3QgVElNRU9VVCA9IDQwXG5cbmV4cG9ydCBmdW5jdGlvbiBvdmVybGF5UHJvcHMoKSB7XG4gIHJldHVybiB7XG4gICAgb3ZlcmxheTogQm9vbGVhbixcbiAgICBvdmVybGF5Q29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcjMDAwMDAwJyxcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VPdmVybGF5KHByb3BzOiBhbnksIG92ZXJsYXlPbj86IEVsZW1lbnQpOiBPdmVybGF5YWJsZSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY29uc3Qgb3ZlcmxheVByb3BzT2JqZWN0ID0ge1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgaGlkZTogdHJ1ZSxcbiAgICBjb2xvcjogcHJvcHMub3ZlcmxheUNvbG9yLFxuICB9XG5cbiAgbGV0IG92ZXJsYXlFbGVtZW50OiBDaGlsZE5vZGUgfCBudWxsID0gbnVsbFxuXG4gIGNvbnN0IG92ZXJsYXlWTm9kZSA9ICgpID0+IHtcbiAgICByZXR1cm4gVk92ZXJsYXkuc2V0dXAhKFxuICAgICAgb3ZlcmxheVByb3BzT2JqZWN0IGFzIHR5cGVvZiBWT3ZlcmxheS5wcm9wcyxcbiAgICAgIHt9IGFzIFNldHVwQ29udGV4dFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IHJlbmRlck92ZXJsYXkgPSAoKSA9PiB7XG4gICAgcmVuZGVyKG92ZXJsYXlWTm9kZSgpIGFzIFZOb2RlLCBjb250YWluZXIhKVxuICB9XG5cbiAgY29uc3QgY3JlYXRlT3ZlcmxheSA9ICgpID0+IHtcbiAgICBvdmVybGF5T24/LnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShvdmVybGF5RWxlbWVudCEsIG92ZXJsYXlPbilcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgb3ZlcmxheVByb3BzT2JqZWN0LmFjdGl2ZSA9IHRydWVcbiAgICAgIG92ZXJsYXlQcm9wc09iamVjdC5oaWRlID0gIXByb3BzLm92ZXJsYXlcbiAgICAgIHJlbmRlck92ZXJsYXkoKVxuICAgIH0sIFRJTUVPVVQpXG4gIH1cblxuICBjb25zdCByZW1vdmVPdmVybGF5ID0gKCkgPT4ge1xuICAgIG92ZXJsYXlQcm9wc09iamVjdC5hY3RpdmUgPSBmYWxzZVxuXG4gICAgcmVuZGVyT3ZlcmxheSgpXG5cbiAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICBvdmVybGF5T24/LnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKG92ZXJsYXlFbGVtZW50ISlcbiAgICB9XG5cbiAgICBhZGRPbmNlTGlzdGVuZXIob3ZlcmxheUVsZW1lbnQhLCAndHJhbnNpdGlvbmVuZCcsIHJlbW92ZSlcbiAgfVxuXG4gIHJlbmRlck92ZXJsYXkoKVxuICBvdmVybGF5RWxlbWVudCA9IGNvbnRhaW5lci5maXJzdENoaWxkXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVPdmVybGF5LFxuICAgIHJlbW92ZU92ZXJsYXksXG4gIH1cbn1cbiJdfQ==