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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlByb2dyZXNzTGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdnVlbGFuZC9zcmMvY29tcG9uZW50cy9WUHJvZ3Jlc3NMaW5lYXIvVlByb2dyZXNzTGluZWFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBR3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUV4RCxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxlQUFlLEVBQUU7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsYUFBYSxFQUFFLE9BQU87UUFDdEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE9B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QixpQkFBaUIsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFO2FBQ3BFLENBQ0YsQ0FBQTtRQUNILENBQUM7UUFFRCxPQUFPLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUE7SUFDbEMsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFZ1ZSBBUElcbmltcG9ydCB7IGgsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSdcblxuLy8gRWZmZWN0c1xuaW1wb3J0IHsgdXNlQ29sb3JzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWNvbG9ycydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtcHJvZ3Jlc3MtbGluZWFyJyxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIGJ1ZmZlclZhbHVlOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDQsXG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknLFxuICAgIH0sXG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeScsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kT3BhY2l0eToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzAuMycsXG4gICAgfSxcbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuLFxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcbiAgICBzdHJlYW06IEJvb2xlYW4sXG4gICAgc3RyaXBlZDogQm9vbGVhbixcbiAgfSxcbiAgc2V0dXAocHJvcHMpIHtcbiAgICBjb25zdCB7IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvciwgc2V0QmFja2dyb3VuZENzc0NvbG9yIH0gPSB1c2VDb2xvcnMoKVxuXG4gICAgY29uc3QgZ2VuUHJvZ3Jlc3NCYXIgPSAodHlwZSA9ICcnKSA9PiB7XG4gICAgICBjb25zdCBiYXJXaWR0aCA9IHByb3BzLnZhbHVlIHx8IHByb3BzLm1vZGVsVmFsdWVcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1wcm9ncmVzcy1saW5lYXJfX2Jhcic6IHRydWUsXG4gICAgICAgICAgW3R5cGVdOiAhIXR5cGUsXG4gICAgICAgICAgLi4uKHByb3BzLmNvbG9yID8gc2V0QmFja2dyb3VuZENsYXNzTmFtZUNvbG9yKHByb3BzLmNvbG9yKSA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB3aWR0aDogIXByb3BzLmluZGV0ZXJtaW5hdGUgPyBiYXJXaWR0aCArICclJyA6ICcnLFxuICAgICAgICAgIC4uLihwcm9wcy5jb2xvciA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGdlblByb2dyZXNzQnVmZmVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgYnVmZmVyV2lkdGggPSBwcm9wcy52YWx1ZSB8fCBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICAgIGNvbnN0IHByb3BzRGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1wcm9ncmVzcy1saW5lYXJfX2J1ZmZlcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgd2lkdGg6IGJ1ZmZlcldpZHRoID8gYnVmZmVyV2lkdGggKyAnJScgOiAnJyxcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHByb3BzRGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0JhY2tncm91bmQoKSB7XG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYWNrZ3JvdW5kJzogdHJ1ZSxcbiAgICAgICAgICAuLi4ocHJvcHMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICA/IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvcihwcm9wcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBvcGFjaXR5OiBwcm9wcy5iYWNrZ3JvdW5kT3BhY2l0eSxcbiAgICAgICAgICAuLi4ocHJvcHMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHByb3BzRGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0luZGV0ZXJtaW5hdGUoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogeyAndi1wcm9ncmVzcy1saW5lYXJfX2luZGV0ZXJtaW5hdGUnOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtnZW5Qcm9ncmVzc0JhcignbG9uZycpLCBnZW5Qcm9ncmVzc0Jhcignc2hvcnQnKV1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5Qcm9ncmVzc0xpbmVhcigpIHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAndi1wcm9ncmVzcy1saW5lYXInLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IGAke3Byb3BzLmhlaWdodH1weGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIGdlblByb2dyZXNzQmFja2dyb3VuZCgpLFxuICAgICAgICAgIGdlblByb2dyZXNzQnVmZmVyKCksXG4gICAgICAgICAgcHJvcHMuaW5kZXRlcm1pbmF0ZSA/IGdlblByb2dyZXNzSW5kZXRlcm1pbmF0ZSgpIDogZ2VuUHJvZ3Jlc3NCYXIoKSxcbiAgICAgICAgXVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBnZW5Qcm9ncmVzc0xpbmVhcigpXG4gIH0sXG59KVxuIl19