import { defineComponent, h, computed } from 'vue';
import { VIcon } from '../VIcon';
import { useColors, colorProps } from '../../composable/use-colors';
import { useIcons } from '../../composable/use-icons';
export default defineComponent({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoaXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2hpcC9WQ2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFFbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUVyRCxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7S0FDekI7SUFDRCxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDaEIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDMUIsTUFBTSxFQUNKLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLHFCQUFxQixHQUN0QixHQUFHLFNBQVMsRUFBRSxDQUFBO1FBQ2YsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFBO1FBRTVCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBMEIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxRQUFRLEVBQUUsSUFBSTtZQUNkLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BFLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUMxQyxDQUFDLENBQUMsQ0FBQTtRQUVILE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBeUIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNyRCxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM5RCxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBRUgsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ2xCLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM3QixDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUU7WUFDMUIsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNkLEtBQUssRUFBRSxpQkFBaUI7YUFDekIsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFBO1FBRUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3JCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDcEIsRUFBRTtZQUNELGNBQWMsRUFBRTtZQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN2QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgVkljb24gfSBmcm9tICcuLi9WSWNvbidcblxuaW1wb3J0IHsgdXNlQ29sb3JzLCBjb2xvclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZS91c2UtY29sb3JzJ1xuaW1wb3J0IHsgdXNlSWNvbnMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlL3VzZS1pY29ucydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtY2hpcCcsXG4gIHByb3BzOiB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnLFxuICAgIH0sXG4gICAgdGV4dENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnI2ZmZmZmZicsXG4gICAgfSxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjbG9zYWJsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIC4uLmNvbG9yUHJvcHMoJ3ByaW1hcnknKSxcbiAgfSxcbiAgZW1pdHM6IFsnY2xvc2UnXSxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvcixcbiAgICAgIHNldEJhY2tncm91bmRDc3NDb2xvcixcbiAgICAgIHNldFRleHRDc3NDb2xvcixcbiAgICAgIHNldFRleHRDbGFzc05hbWVDb2xvcixcbiAgICB9ID0gdXNlQ29sb3JzKClcbiAgICBjb25zdCB7IGljb25zIH0gPSB1c2VJY29ucygpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQ8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KCgpID0+ICh7XG4gICAgICAndi1jaGlwJzogdHJ1ZSxcbiAgICAgICd2LWNoaXAtLWRpc2FibGVkJzogcHJvcHMuZGlzYWJsZWQsXG4gICAgICAuLi4oIXByb3BzLmRpc2FibGVkID8gc2V0QmFja2dyb3VuZENsYXNzTmFtZUNvbG9yKHByb3BzLmNvbG9yKSA6IHt9KSxcbiAgICAgIC4uLnNldFRleHRDbGFzc05hbWVDb2xvcihwcm9wcy50ZXh0Q29sb3IpLFxuICAgIH0pKVxuXG4gICAgY29uc3Qgc3R5bGVzID0gY29tcHV0ZWQ8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKCkgPT4gKHtcbiAgICAgIC4uLighcHJvcHMuZGlzYWJsZWQgPyBzZXRCYWNrZ3JvdW5kQ3NzQ29sb3IocHJvcHMuY29sb3IpIDoge30pLFxuICAgICAgLi4uc2V0VGV4dENzc0NvbG9yKHByb3BzLnRleHRDb2xvciksXG4gICAgfSkpXG5cbiAgICBjb25zdCBnZW5DbG9zZUljb24gPSAoKSA9PiB7XG4gICAgICByZXR1cm4gaChWSWNvbiwge1xuICAgICAgICBpY29uOiBpY29ucy4kY2xvc2UsXG4gICAgICAgIGNsaWNrYWJsZTogIXByb3BzLmRpc2FibGVkLFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiBlbWl0KCdjbG9zZScpLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBnZW5DaGlwQ29udGVudCA9ICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAndi1jaGlwX19jb250ZW50JyxcbiAgICAgIH0sIHNsb3RzLmRlZmF1bHQ/LigpIHx8IHByb3BzLnRpdGxlKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGVzLnZhbHVlLFxuICAgIH0sIFtcbiAgICAgIGdlbkNoaXBDb250ZW50KCksXG4gICAgICBwcm9wcy5jbG9zYWJsZSA/IGdlbkNsb3NlSWNvbigpIDogbnVsbCxcbiAgICBdKVxuICB9LFxufSlcbiJdfQ==