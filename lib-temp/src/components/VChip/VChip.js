import { defineComponent, h, computed } from 'vue';
import { VIcon } from '../VIcon';
import { useColors, colorProps } from '../../composable/use-colors';
import { useIcons } from '../../composable/use-icons';
export const VChip = defineComponent({
    name: 'v-chip',
    props: {
        title: {
            type: String,
            default: '',
        },
        textColor: {
            type: String,
            default: '#ffffff',
        },
        disabled: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        ...colorProps('primary'),
    },
    emits: ['close'],
    setup(props, { slots, emit }) {
        const { setBackgroundClassNameColor, setBackgroundCssColor, setTextCssColor, setTextClassNameColor, } = useColors();
        const { icons } = useIcons();
        const classes = computed(() => ({
            'v-chip': true,
            'v-chip--disabled': props.disabled,
            ...(!props.disabled ? setBackgroundClassNameColor(props.color) : {}),
            ...setTextClassNameColor(props.textColor),
        }));
        const styles = computed(() => ({
            ...(!props.disabled ? setBackgroundCssColor(props.color) : {}),
            ...setTextCssColor(props.textColor),
        }));
        const genCloseIcon = () => {
            return h(VIcon, {
                icon: icons.$close,
                clickable: !props.disabled,
                onClick: () => emit('close'),
            });
        };
        const genChipContent = () => {
            return h('div', {
                class: 'v-chip__content',
            }, slots.default?.() || props.title);
        };
        return () => h('span', {
            class: classes.value,
            style: styles.value,
        }, [
            genChipContent(),
            props.closable ? genCloseIcon() : null,
        ]);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoaXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2hpcC9WQ2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFFbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUVyRCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDO0lBQ25DLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztLQUN6QjtJQUNELEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNoQixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUMxQixNQUFNLEVBQ0osMkJBQTJCLEVBQzNCLHFCQUFxQixFQUNyQixlQUFlLEVBQ2YscUJBQXFCLEdBQ3RCLEdBQUcsU0FBUyxFQUFFLENBQUE7UUFDZixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUE7UUFFNUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELFFBQVEsRUFBRSxJQUFJO1lBQ2Qsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDbEMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQzFDLENBQUMsQ0FBQyxDQUFBO1FBRUgsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUF5QixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlELEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDcEMsQ0FBQyxDQUFDLENBQUE7UUFFSCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDbEIsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzFCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzdCLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQTtRQUVELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtZQUMxQixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLGlCQUFpQjthQUN6QixFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QyxDQUFDLENBQUE7UUFFRCxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDckIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztTQUNwQixFQUFFO1lBQ0QsY0FBYyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3ZDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBWSWNvbiB9IGZyb20gJy4uL1ZJY29uJ1xuXG5pbXBvcnQgeyB1c2VDb2xvcnMsIGNvbG9yUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlL3VzZS1jb2xvcnMnXG5pbXBvcnQgeyB1c2VJY29ucyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGUvdXNlLWljb25zJ1xuXG5leHBvcnQgY29uc3QgVkNoaXAgPSBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAndi1jaGlwJyxcbiAgcHJvcHM6IHtcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgfSxcbiAgICB0ZXh0Q29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcjZmZmZmZmJyxcbiAgICB9LFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNsb3NhYmxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgLi4uY29sb3JQcm9wcygncHJpbWFyeScpLFxuICB9LFxuICBlbWl0czogWydjbG9zZSddLFxuICBzZXR1cChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qge1xuICAgICAgc2V0QmFja2dyb3VuZENsYXNzTmFtZUNvbG9yLFxuICAgICAgc2V0QmFja2dyb3VuZENzc0NvbG9yLFxuICAgICAgc2V0VGV4dENzc0NvbG9yLFxuICAgICAgc2V0VGV4dENsYXNzTmFtZUNvbG9yLFxuICAgIH0gPSB1c2VDb2xvcnMoKVxuICAgIGNvbnN0IHsgaWNvbnMgfSA9IHVzZUljb25zKClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oKCkgPT4gKHtcbiAgICAgICd2LWNoaXAnOiB0cnVlLFxuICAgICAgJ3YtY2hpcC0tZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgIC4uLighcHJvcHMuZGlzYWJsZWQgPyBzZXRCYWNrZ3JvdW5kQ2xhc3NOYW1lQ29sb3IocHJvcHMuY29sb3IpIDoge30pLFxuICAgICAgLi4uc2V0VGV4dENsYXNzTmFtZUNvbG9yKHByb3BzLnRleHRDb2xvciksXG4gICAgfSkpXG5cbiAgICBjb25zdCBzdHlsZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoKSA9PiAoe1xuICAgICAgLi4uKCFwcm9wcy5kaXNhYmxlZCA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgICAuLi5zZXRUZXh0Q3NzQ29sb3IocHJvcHMudGV4dENvbG9yKSxcbiAgICB9KSlcblxuICAgIGNvbnN0IGdlbkNsb3NlSWNvbiA9ICgpID0+IHtcbiAgICAgIHJldHVybiBoKFZJY29uLCB7XG4gICAgICAgIGljb246IGljb25zLiRjbG9zZSxcbiAgICAgICAgY2xpY2thYmxlOiAhcHJvcHMuZGlzYWJsZWQsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IGVtaXQoJ2Nsb3NlJyksXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGdlbkNoaXBDb250ZW50ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICd2LWNoaXBfX2NvbnRlbnQnLFxuICAgICAgfSwgc2xvdHMuZGVmYXVsdD8uKCkgfHwgcHJvcHMudGl0bGUpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZXMudmFsdWUsXG4gICAgfSwgW1xuICAgICAgZ2VuQ2hpcENvbnRlbnQoKSxcbiAgICAgIHByb3BzLmNsb3NhYmxlID8gZ2VuQ2xvc2VJY29uKCkgOiBudWxsLFxuICAgIF0pXG4gIH0sXG59KVxuIl19