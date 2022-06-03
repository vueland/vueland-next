import { defineComponent, h } from 'vue';
import { convertToUnit } from '../../helpers';
export default defineComponent({
    name: 'v-skeleton',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        width: {
            type: [Number, String],
            default: null,
        },
        height: {
            type: [Number, String],
            default: 20,
        },
        radius: {
            type: [Number, String],
            default: 5,
        },
        light: {
            type: Boolean,
            default: true,
        },
        dynamic: Boolean,
    },
    setup(props) {
        return () => h(props.tag, {
            class: {
                'v-skeleton': true,
                'v-skeleton--light': props.light,
                'v-skeleton--dynamic': props.dynamic,
            },
            style: {
                width: props.width && convertToUnit(props.width),
                flexBasis: props.width && convertToUnit(props.width) || '100%',
                height: convertToUnit(props.height),
                borderRadius: convertToUnit(props.radius)
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNrZWxldG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlNrZWxldG9uL1ZTa2VsZXRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQTtBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRTdDLGVBQWUsZUFBZSxDQUFDO0lBQzdCLElBQUksRUFBRSxZQUFZO0lBQ2xCLEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBQ0QsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ3hCLEtBQUssRUFBRTtnQkFDTCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2hDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3JDO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNoRCxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU07Z0JBQzlELE1BQU0sRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQzFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgaCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IGNvbnZlcnRUb1VuaXQgfSBmcm9tICcuLi8uLi9oZWxwZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAndi1za2VsZXRvbicsXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2JyxcbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDIwLFxuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogNSxcbiAgICB9LFxuICAgIGxpZ2h0OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICAgIGR5bmFtaWM6IEJvb2xlYW4sXG4gIH0sXG4gIHNldHVwKHByb3BzKSB7XG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7XG4gICAgICBjbGFzczoge1xuICAgICAgICAndi1za2VsZXRvbic6IHRydWUsXG4gICAgICAgICd2LXNrZWxldG9uLS1saWdodCc6IHByb3BzLmxpZ2h0LFxuICAgICAgICAndi1za2VsZXRvbi0tZHluYW1pYyc6IHByb3BzLmR5bmFtaWMsXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoICYmIGNvbnZlcnRUb1VuaXQocHJvcHMud2lkdGgpLFxuICAgICAgICBmbGV4QmFzaXM6IHByb3BzLndpZHRoICYmIGNvbnZlcnRUb1VuaXQocHJvcHMud2lkdGgpIHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiBjb252ZXJ0VG9Vbml0KHByb3BzLmhlaWdodCksXG4gICAgICAgIGJvcmRlclJhZGl1czogY29udmVydFRvVW5pdChwcm9wcy5yYWRpdXMpXG4gICAgICB9LFxuICAgIH0pXG4gIH0sXG59KVxuIl19