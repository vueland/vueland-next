import { h, defineComponent } from 'vue';
import { useColors } from '../../composables/use-colors';
export default defineComponent({
    name: 'v-progress-linear',
    props: {
        value: {
            type: [String, Number],
            default: null,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        bufferValue: {
            type: [String, Number],
            default: null,
        },
        height: {
            type: [Number, String],
            default: 4,
        },
        color: {
            type: String,
            default: 'primary',
        },
        backgroundColor: {
            type: String,
            default: 'primary',
        },
        backgroundOpacity: {
            type: String,
            default: '0.3',
        },
        indeterminate: Boolean,
        reverse: Boolean,
        rounded: Boolean,
        stream: Boolean,
        striped: Boolean,
    },
    setup(props) {
        const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors();
        const genProgressBar = (type = '') => {
            const barWidth = props.value || props.modelValue;
            return h('div', {
                class: {
                    'v-progress-linear__bar': true,
                    [type]: !!type,
                    ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
                },
                style: {
                    width: !props.indeterminate ? barWidth + '%' : '',
                    ...(props.color ? setBackgroundCssColor(props.color) : {}),
                },
            });
        };
        const genProgressBuffer = () => {
            const bufferWidth = props.value || props.modelValue;
            const propsData = {
                class: {
                    'v-progress-linear__buffer': true,
                },
                style: {
                    width: bufferWidth ? bufferWidth + '%' : '',
                },
            };
            return h('div', propsData);
        };
        function genProgressBackground() {
            const propsData = {
                class: {
                    'v-progress-linear__background': true,
                    ...(props.backgroundColor
                        ? setBackgroundClassNameColor(props.backgroundColor)
                        : {}),
                },
                style: {
                    opacity: props.backgroundOpacity,
                    ...(props.backgroundColor
                        ? setBackgroundCssColor(props.backgroundColor)
                        : {}),
                },
            };
            return h('div', propsData);
        }
        function genProgressIndeterminate() {
            return h('div', {
                class: { 'v-progress-linear__indeterminate': true },
            }, [genProgressBar('long'), genProgressBar('short')]);
        }
        function genProgressLinear() {
            return h('div', {
                class: 'v-progress-linear',
                style: {
                    height: `${props.height}px`,
                },
            }, [
                genProgressBackground(),
                genProgressBuffer(),
                props.indeterminate ? genProgressIndeterminate() : genProgressBar(),
            ]);
        }
        return () => genProgressLinear();
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlByb2dyZXNzTGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlByb2dyZXNzTGluZWFyL1ZQcm9ncmVzc0xpbmVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxNQUFNLEtBQUssQ0FBQTtBQUd4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sOEJBQThCLENBQUE7QUFFeEQsZUFBZSxlQUFlLENBQUM7SUFDN0IsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELGFBQWEsRUFBRSxPQUFPO1FBQ3RCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE1BQU0sRUFBRSxPQUFP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QUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTthQUNwRSxDQUNGLENBQUE7UUFDSCxDQUFDO1FBRUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ2xDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWdWUgQVBJXG5pbXBvcnQgeyBoLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnXG5cbi8vIEVmZmVjdHNcbmltcG9ydCB7IHVzZUNvbG9ycyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1jb2xvcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICd2LXByb2dyZXNzLWxpbmVhcicsXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgIH0sXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBidWZmZXJWYWx1ZToge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiA0LFxuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5JyxcbiAgICB9LFxuICAgIGJhY2tncm91bmRDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknLFxuICAgIH0sXG4gICAgYmFja2dyb3VuZE9wYWNpdHk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcwLjMnLFxuICAgIH0sXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcbiAgICByZXZlcnNlOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG4gICAgc3RyZWFtOiBCb29sZWFuLFxuICAgIHN0cmlwZWQ6IEJvb2xlYW4sXG4gIH0sXG4gIHNldHVwKHByb3BzKSB7XG4gICAgY29uc3QgeyBzZXRCYWNrZ3JvdW5kQ2xhc3NOYW1lQ29sb3IsIHNldEJhY2tncm91bmRDc3NDb2xvciB9ID0gdXNlQ29sb3JzKClcblxuICAgIGNvbnN0IGdlblByb2dyZXNzQmFyID0gKHR5cGUgPSAnJykgPT4ge1xuICAgICAgY29uc3QgYmFyV2lkdGggPSBwcm9wcy52YWx1ZSB8fCBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYXInOiB0cnVlLFxuICAgICAgICAgIFt0eXBlXTogISF0eXBlLFxuICAgICAgICAgIC4uLihwcm9wcy5jb2xvciA/IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgd2lkdGg6ICFwcm9wcy5pbmRldGVybWluYXRlID8gYmFyV2lkdGggKyAnJScgOiAnJyxcbiAgICAgICAgICAuLi4ocHJvcHMuY29sb3IgPyBzZXRCYWNrZ3JvdW5kQ3NzQ29sb3IocHJvcHMuY29sb3IpIDoge30pLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBnZW5Qcm9ncmVzc0J1ZmZlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZmZlcldpZHRoID0gcHJvcHMudmFsdWUgfHwgcHJvcHMubW9kZWxWYWx1ZVxuXG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtcHJvZ3Jlc3MtbGluZWFyX19idWZmZXInOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiBidWZmZXJXaWR0aCA/IGJ1ZmZlcldpZHRoICsgJyUnIDogJycsXG4gICAgICAgIH0sXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBwcm9wc0RhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuUHJvZ3Jlc3NCYWNrZ3JvdW5kKCkge1xuICAgICAgY29uc3QgcHJvcHNEYXRhID0ge1xuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICd2LXByb2dyZXNzLWxpbmVhcl9fYmFja2dyb3VuZCc6IHRydWUsXG4gICAgICAgICAgLi4uKHByb3BzLmJhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgPyBzZXRCYWNrZ3JvdW5kQ2xhc3NOYW1lQ29sb3IocHJvcHMuYmFja2dyb3VuZENvbG9yKVxuICAgICAgICAgICAgOiB7fSksXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgb3BhY2l0eTogcHJvcHMuYmFja2dyb3VuZE9wYWNpdHksXG4gICAgICAgICAgLi4uKHByb3BzLmJhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgPyBzZXRCYWNrZ3JvdW5kQ3NzQ29sb3IocHJvcHMuYmFja2dyb3VuZENvbG9yKVxuICAgICAgICAgICAgOiB7fSksXG4gICAgICAgIH0sXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBwcm9wc0RhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuUHJvZ3Jlc3NJbmRldGVybWluYXRlKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6IHsgJ3YtcHJvZ3Jlc3MtbGluZWFyX19pbmRldGVybWluYXRlJzogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgICBbZ2VuUHJvZ3Jlc3NCYXIoJ2xvbmcnKSwgZ2VuUHJvZ3Jlc3NCYXIoJ3Nob3J0JyldXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuUHJvZ3Jlc3NMaW5lYXIoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogJ3YtcHJvZ3Jlc3MtbGluZWFyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiBgJHtwcm9wcy5oZWlnaHR9cHhgLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBnZW5Qcm9ncmVzc0JhY2tncm91bmQoKSxcbiAgICAgICAgICBnZW5Qcm9ncmVzc0J1ZmZlcigpLFxuICAgICAgICAgIHByb3BzLmluZGV0ZXJtaW5hdGUgPyBnZW5Qcm9ncmVzc0luZGV0ZXJtaW5hdGUoKSA6IGdlblByb2dyZXNzQmFyKCksXG4gICAgICAgIF1cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gZ2VuUHJvZ3Jlc3NMaW5lYXIoKVxuICB9LFxufSlcbiJdfQ==