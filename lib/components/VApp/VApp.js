import { defineComponent, provide, reactive, h, withDirectives, onMounted, } from 'vue';
import { resize } from '../../directives';
import { breakpoints } from '../../services/breakpoints';
import { throttle } from '../../utils/throttle';
export default defineComponent({
    name: 'v-app',
    directives: {
        resize,
    },
    props: {
        global: {
            type: Object,
            default: null,
        },
    },
    setup(props, { slots }) {
        const THROTTLING_TIMEOUT = 60;
        const state = reactive({
            current: null,
            xlAndLess: false,
            lgAndLess: false,
            mdAndLess: false,
            smAndLess: false,
        });
        provide('breakpoints', state);
        const setCurrentBreakpointName = (screen) => {
            if (screen >= breakpoints.xl) {
                return (state.current = 'xl');
            }
            if (screen >= breakpoints.lg && screen < breakpoints.xl) {
                return (state.current = 'lg');
            }
            if (screen >= breakpoints.md && screen < breakpoints.lg) {
                return (state.current = 'md');
            }
            if (screen >= breakpoints.sm && screen < breakpoints.md) {
                return (state.current = 'sm');
            }
            return null;
        };
        const setIntervals = (screen) => {
            const { xl, lg, md, sm } = breakpoints;
            state.xlAndLess = screen <= xl && screen > lg;
            state.lgAndLess = screen <= lg && screen > md;
            state.mdAndLess = screen <= md && screen > sm;
            state.smAndLess = screen <= sm;
        };
        const setSizes = () => {
            const screen = props.global?.innerWidth || window.innerWidth;
            setCurrentBreakpointName(screen);
            setIntervals(screen);
        };
        const throttledResizeListener = throttle(setSizes, THROTTLING_TIMEOUT);
        const genAppWrapper = () => {
            return h('div', { class: 'v-app--wrapper' }, {
                default: () => slots.default && slots.default(),
            });
        };
        onMounted(() => {
            setSizes();
        });
        return () => withDirectives(h('div', { class: 'v-app' }, genAppWrapper()), [[resize, throttledResizeListener]]);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZBcHAvVkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsZUFBZSxFQUNmLE9BQU8sRUFDUCxRQUFRLEVBQ1IsQ0FBQyxFQUNELGNBQWMsRUFDZCxTQUFTLEdBQ1YsTUFBTSxLQUFLLENBQUE7QUFHWixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFHekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBR3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQWEvQyxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUsT0FBTztJQUNiLFVBQVUsRUFBRTtRQUNWLE1BQU07S0FDUDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0lBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRTtRQUNwQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUU3QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQVc7WUFDL0IsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRTdCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxQyxJQUFJLE1BQU0sSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO2dCQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQTthQUM5QjtZQUNELElBQUksTUFBTSxJQUFJLFdBQVcsQ0FBQyxFQUFFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBO2FBQzlCO1lBQ0QsSUFBSSxNQUFNLElBQUksV0FBVyxDQUFDLEVBQUUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUE7YUFDOUI7WUFDRCxJQUFJLE1BQU0sSUFBSSxXQUFXLENBQUMsRUFBRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQTthQUM5QjtZQUVELE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQyxDQUFBO1FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsV0FBVyxDQUFBO1lBRXRDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQzdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQzdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQzdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQTtRQUNoQyxDQUFDLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFHcEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQTtZQUU1RCx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNoQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFBO1FBRUQsTUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQ3RDLFFBQVEsRUFDUixrQkFBa0IsQ0FDTCxDQUFBO1FBRWYsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUFFO2dCQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2FBQ2hELENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQTtRQUVELFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDYixRQUFRLEVBQUUsQ0FBQTtRQUNaLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxHQUFHLEVBQUUsQ0FDVixjQUFjLENBQ1osQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUM3QyxDQUFDLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FDcEMsQ0FBQTtJQUNMLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBkZWZpbmVDb21wb25lbnQsXG4gIHByb3ZpZGUsXG4gIHJlYWN0aXZlLFxuICBoLFxuICB3aXRoRGlyZWN0aXZlcyxcbiAgb25Nb3VudGVkLFxufSBmcm9tICd2dWUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCB7IHJlc2l6ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMnXG5cbi8vIFNlcnZpY2VzXG5pbXBvcnQgeyBicmVha3BvaW50cyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JyZWFrcG9pbnRzJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi8uLi91dGlscy90aHJvdHRsZSdcblxuLy8gVHlwZXNcbmltcG9ydCB7IE1heWJlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvYmFzZS5kJ1xuXG5pbnRlcmZhY2UgQXBwU3RhdGUge1xuICBjdXJyZW50OiBNYXliZTwneGwnIHwgJ2xnJyB8ICdtZCcgfCAnc20nPlxuICB4bEFuZExlc3M6IGJvb2xlYW5cbiAgbGdBbmRMZXNzOiBib29sZWFuXG4gIG1kQW5kTGVzczogYm9vbGVhblxuICBzbUFuZExlc3M6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtYXBwJyxcbiAgZGlyZWN0aXZlczoge1xuICAgIHJlc2l6ZSxcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBnbG9iYWw6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IFRIUk9UVExJTkdfVElNRU9VVCA9IDYwXG5cbiAgICBjb25zdCBzdGF0ZSA9IHJlYWN0aXZlPEFwcFN0YXRlPih7XG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgeGxBbmRMZXNzOiBmYWxzZSxcbiAgICAgIGxnQW5kTGVzczogZmFsc2UsXG4gICAgICBtZEFuZExlc3M6IGZhbHNlLFxuICAgICAgc21BbmRMZXNzOiBmYWxzZSxcbiAgICB9KVxuXG4gICAgcHJvdmlkZSgnYnJlYWtwb2ludHMnLCBzdGF0ZSlcblxuICAgIGNvbnN0IHNldEN1cnJlbnRCcmVha3BvaW50TmFtZSA9IChzY3JlZW4pID0+IHtcbiAgICAgIGlmIChzY3JlZW4gPj0gYnJlYWtwb2ludHMueGwpIHtcbiAgICAgICAgcmV0dXJuIChzdGF0ZS5jdXJyZW50ID0gJ3hsJylcbiAgICAgIH1cbiAgICAgIGlmIChzY3JlZW4gPj0gYnJlYWtwb2ludHMubGcgJiYgc2NyZWVuIDwgYnJlYWtwb2ludHMueGwpIHtcbiAgICAgICAgcmV0dXJuIChzdGF0ZS5jdXJyZW50ID0gJ2xnJylcbiAgICAgIH1cbiAgICAgIGlmIChzY3JlZW4gPj0gYnJlYWtwb2ludHMubWQgJiYgc2NyZWVuIDwgYnJlYWtwb2ludHMubGcpIHtcbiAgICAgICAgcmV0dXJuIChzdGF0ZS5jdXJyZW50ID0gJ21kJylcbiAgICAgIH1cbiAgICAgIGlmIChzY3JlZW4gPj0gYnJlYWtwb2ludHMuc20gJiYgc2NyZWVuIDwgYnJlYWtwb2ludHMubWQpIHtcbiAgICAgICAgcmV0dXJuIChzdGF0ZS5jdXJyZW50ID0gJ3NtJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBzZXRJbnRlcnZhbHMgPSAoc2NyZWVuKSA9PiB7XG4gICAgICBjb25zdCB7IHhsLCBsZywgbWQsIHNtIH0gPSBicmVha3BvaW50c1xuXG4gICAgICBzdGF0ZS54bEFuZExlc3MgPSBzY3JlZW4gPD0geGwgJiYgc2NyZWVuID4gbGdcbiAgICAgIHN0YXRlLmxnQW5kTGVzcyA9IHNjcmVlbiA8PSBsZyAmJiBzY3JlZW4gPiBtZFxuICAgICAgc3RhdGUubWRBbmRMZXNzID0gc2NyZWVuIDw9IG1kICYmIHNjcmVlbiA+IHNtXG4gICAgICBzdGF0ZS5zbUFuZExlc3MgPSBzY3JlZW4gPD0gc21cbiAgICB9XG5cbiAgICBjb25zdCBzZXRTaXplcyA9ICgpID0+IHtcbiAgICAgIC8vIHRoZSBcImdsb2JhbFwiIHByb3AgYWxsb3dzIHRvIHRlc3QgdGhlXG4gICAgICAvLyBjb21wb25lbnQgd2l0aG91dCB1c2luZyBtb2NrdXBzXG4gICAgICBjb25zdCBzY3JlZW4gPSBwcm9wcy5nbG9iYWw/LmlubmVyV2lkdGggfHwgd2luZG93LmlubmVyV2lkdGhcblxuICAgICAgc2V0Q3VycmVudEJyZWFrcG9pbnROYW1lKHNjcmVlbilcbiAgICAgIHNldEludGVydmFscyhzY3JlZW4pXG4gICAgfVxuXG4gICAgY29uc3QgdGhyb3R0bGVkUmVzaXplTGlzdGVuZXIgPSB0aHJvdHRsZShcbiAgICAgIHNldFNpemVzLFxuICAgICAgVEhST1RUTElOR19USU1FT1VULFxuICAgICkgYXMgKCkgPT4gdm9pZFxuXG4gICAgY29uc3QgZ2VuQXBwV3JhcHBlciA9ICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAndi1hcHAtLXdyYXBwZXInIH0sIHtcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KCksXG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBzZXRTaXplcygpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PlxuICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICd2LWFwcCcgfSwgZ2VuQXBwV3JhcHBlcigpKSxcbiAgICAgICAgW1tyZXNpemUsIHRocm90dGxlZFJlc2l6ZUxpc3RlbmVyXV0sXG4gICAgICApXG4gIH0sXG59KVxuIl19