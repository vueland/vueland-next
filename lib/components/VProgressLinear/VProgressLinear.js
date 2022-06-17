import { h, defineComponent } from 'vue';
import { useColors } from '../../composable/use-colors';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlByb2dyZXNzTGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlByb2dyZXNzTGluZWFyL1ZQcm9ncmVzc0xpbmVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxNQUFNLEtBQUssQ0FBQTtBQUd4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFFdkQsZUFBZSxlQUFlLENBQUM7SUFDN0IsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELGFBQWEsRUFBRSxPQUFPO1FBQ3RCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE1BQU0sRUFBRSxPQUFP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QUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTthQUNwRSxDQUNGLENBQUE7UUFDSCxDQUFDO1FBRUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ2xDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWdWUgQVBJXG5pbXBvcnQgeyBoLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnXG5cbi8vIEVmZmVjdHNcbmltcG9ydCB7IHVzZUNvbG9ycyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGUvdXNlLWNvbG9ycydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtcHJvZ3Jlc3MtbGluZWFyJyxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIGJ1ZmZlclZhbHVlOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDQsXG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknLFxuICAgIH0sXG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeScsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kT3BhY2l0eToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzAuMycsXG4gICAgfSxcbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuLFxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcbiAgICBzdHJlYW06IEJvb2xlYW4sXG4gICAgc3RyaXBlZDogQm9vbGVhbixcbiAgfSxcbiAgc2V0dXAocHJvcHMpIHtcbiAgICBjb25zdCB7IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvciwgc2V0QmFja2dyb3VuZENzc0NvbG9yIH0gPSB1c2VDb2xvcnMoKVxuXG4gICAgY29uc3QgZ2VuUHJvZ3Jlc3NCYXIgPSAodHlwZSA9ICcnKSA9PiB7XG4gICAgICBjb25zdCBiYXJXaWR0aCA9IHByb3BzLnZhbHVlIHx8IHByb3BzLm1vZGVsVmFsdWVcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1wcm9ncmVzcy1saW5lYXJfX2Jhcic6IHRydWUsXG4gICAgICAgICAgW3R5cGVdOiAhIXR5cGUsXG4gICAgICAgICAgLi4uKHByb3BzLmNvbG9yID8gc2V0QmFja2dyb3VuZENsYXNzTmFtZUNvbG9yKHByb3BzLmNvbG9yKSA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB3aWR0aDogIXByb3BzLmluZGV0ZXJtaW5hdGUgPyBiYXJXaWR0aCArICclJyA6ICcnLFxuICAgICAgICAgIC4uLihwcm9wcy5jb2xvciA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGdlblByb2dyZXNzQnVmZmVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgYnVmZmVyV2lkdGggPSBwcm9wcy52YWx1ZSB8fCBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICAgIGNvbnN0IHByb3BzRGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1wcm9ncmVzcy1saW5lYXJfX2J1ZmZlcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgd2lkdGg6IGJ1ZmZlcldpZHRoID8gYnVmZmVyV2lkdGggKyAnJScgOiAnJyxcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHByb3BzRGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0JhY2tncm91bmQoKSB7XG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYWNrZ3JvdW5kJzogdHJ1ZSxcbiAgICAgICAgICAuLi4ocHJvcHMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICA/IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvcihwcm9wcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBvcGFjaXR5OiBwcm9wcy5iYWNrZ3JvdW5kT3BhY2l0eSxcbiAgICAgICAgICAuLi4ocHJvcHMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHByb3BzRGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0luZGV0ZXJtaW5hdGUoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogeyAndi1wcm9ncmVzcy1saW5lYXJfX2luZGV0ZXJtaW5hdGUnOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtnZW5Qcm9ncmVzc0JhcignbG9uZycpLCBnZW5Qcm9ncmVzc0Jhcignc2hvcnQnKV1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0xpbmVhcigpIHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAndi1wcm9ncmVzcy1saW5lYXInLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IGAke3Byb3BzLmhlaWdodH1weGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIGdlblByb2dyZXNzQmFja2dyb3VuZCgpLFxuICAgICAgICAgIGdlblByb2dyZXNzQnVmZmVyKCksXG4gICAgICAgICAgcHJvcHMuaW5kZXRlcm1pbmF0ZSA/IGdlblByb2dyZXNzSW5kZXRlcm1pbmF0ZSgpIDogZ2VuUHJvZ3Jlc3NCYXIoKSxcbiAgICAgICAgXVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBnZW5Qcm9ncmVzc0xpbmVhcigpXG4gIH0sXG59KVxuIl19