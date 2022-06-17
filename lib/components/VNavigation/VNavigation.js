import { defineComponent, h, ref, computed } from 'vue';
import { useColors, colorProps } from '../../composable/use-colors';
import { convertToUnit } from '../../helpers';
export default defineComponent({
    name: 'v-navigation',
    props: {
        fixed: Boolean,
        right: Boolean,
        left: Boolean,
        onHover: Boolean,
        miniVariant: Boolean,
        expand: Boolean,
        offsetTop: {
            type: [String, Number],
            default: 0,
        },
        miniVariantWidth: {
            type: [String, Number],
            default: 56,
        },
        maxVariantWidth: {
            type: [String, Number],
            default: 237,
        },
        ...colorProps('#ffffff'),
    },
    emits: ['update:expand'],
    setup(props, { slots, emit }) {
        const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors();
        const isHovered = ref(false);
        const isExpanded = computed(() => {
            if (props.onHover && isHovered.value)
                return true;
            if (props.expand)
                return true;
            if (!props.expand && props.miniVariant)
                return false;
            if (!props.expand && !props.miniVariant)
                return false;
            return !props.miniVariant;
        });
        const computedWidth = computed(() => {
            if (!isExpanded.value)
                return props.miniVariantWidth;
            return props.maxVariantWidth;
        });
        const classes = computed(() => ({
            'v-navigation': true,
            'v-navigation--expanded': isExpanded.value,
            'v-navigation--fixed': props.fixed,
            ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
        }));
        const styles = computed(() => ({
            width: convertToUnit(computedWidth.value),
            maxHeight: `calc(100vh - ${convertToUnit(props.offsetTop)})`,
            top: props.fixed ? convertToUnit(props.offsetTop) : '',
            left: !props.right && props.fixed ? convertToUnit(0) : '',
            right: props.right && props.fixed ? convertToUnit(0) : '',
            ...(props.color ? setBackgroundCssColor(props.color) : {}),
        }));
        const genNavigationContent = () => {
            return h('div', {
                class: 'v-navigation__content',
            }, {
                default: () => slots.default?.(),
            });
        };
        const onMouseenter = () => {
            if (!props.onHover || props.miniVariant)
                return;
            isHovered.value = true;
            emit('update:expand', true);
        };
        const onMouseleave = () => {
            if (!props.onHover || props.miniVariant)
                return;
            isHovered.value = false;
            emit('update:expand', false);
        };
        return () => h('aside', {
            class: classes.value,
            style: styles.value,
            onMouseenter,
            onMouseleave,
        }, genNavigationContent());
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk5hdmlnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTmF2aWdhdGlvbi9WTmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFTLE1BQU0sS0FBSyxDQUFBO0FBRTlELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFFbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUU3QyxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUsY0FBYztJQUNwQixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsT0FBTztRQUNwQixNQUFNLEVBQUUsT0FBTztRQUNmLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztLQUN6QjtJQUNELEtBQUssRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUV4QixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUMxQixNQUFNLEVBQUUsMkJBQTJCLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxTQUFT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RUQsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxXQUFXO2dCQUFFLE9BQU07WUFDL0MsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUE7UUFFRCxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixZQUFZO1lBQ1osWUFBWTtTQUNiLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIGgsIHJlZiwgY29tcHV0ZWQsIFZOb2RlIH0gZnJvbSAndnVlJ1xuLy8gQ29tcG9zYWJsZXNcbmltcG9ydCB7IHVzZUNvbG9ycywgY29sb3JQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGUvdXNlLWNvbG9ycydcbi8vIEhlbHBlcnNcbmltcG9ydCB7IGNvbnZlcnRUb1VuaXQgfSBmcm9tICcuLi8uLi9oZWxwZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAndi1uYXZpZ2F0aW9uJyxcbiAgcHJvcHM6IHtcbiAgICBmaXhlZDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhbixcbiAgICBsZWZ0OiBCb29sZWFuLFxuICAgIG9uSG92ZXI6IEJvb2xlYW4sXG4gICAgbWluaVZhcmlhbnQ6IEJvb2xlYW4sXG4gICAgZXhwYW5kOiBCb29sZWFuLFxuICAgIG9mZnNldFRvcDoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgfSxcbiAgICBtaW5pVmFyaWFudFdpZHRoOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogNTYsXG4gICAgfSxcbiAgICBtYXhWYXJpYW50V2lkdGg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAyMzcsXG4gICAgfSxcbiAgICAuLi5jb2xvclByb3BzKCcjZmZmZmZmJyksXG4gIH0sXG4gIGVtaXRzOiBbJ3VwZGF0ZTpleHBhbmQnXSxcblxuICBzZXR1cChwcm9wcywgeyBzbG90cywgZW1pdCB9KTogKCkgPT4gVk5vZGUge1xuICAgIGNvbnN0IHsgc2V0QmFja2dyb3VuZENsYXNzTmFtZUNvbG9yLCBzZXRCYWNrZ3JvdW5kQ3NzQ29sb3IgfSA9IHVzZUNvbG9ycygpXG4gICAgY29uc3QgaXNIb3ZlcmVkID0gcmVmPGJvb2xlYW4+KGZhbHNlKVxuXG4gICAgY29uc3QgaXNFeHBhbmRlZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5vbkhvdmVyICYmIGlzSG92ZXJlZC52YWx1ZSkgcmV0dXJuIHRydWVcbiAgICAgIGlmIChwcm9wcy5leHBhbmQpIHJldHVybiB0cnVlXG4gICAgICBpZiAoIXByb3BzLmV4cGFuZCAmJiBwcm9wcy5taW5pVmFyaWFudCkgcmV0dXJuIGZhbHNlXG4gICAgICBpZiAoIXByb3BzLmV4cGFuZCAmJiAhcHJvcHMubWluaVZhcmlhbnQpIHJldHVybiBmYWxzZVxuICAgICAgcmV0dXJuICFwcm9wcy5taW5pVmFyaWFudFxuICAgIH0pXG5cbiAgICBjb25zdCBjb21wdXRlZFdpZHRoID0gY29tcHV0ZWQ8bnVtYmVyIHwgc3RyaW5nPigoKSA9PiB7XG4gICAgICBpZiAoIWlzRXhwYW5kZWQudmFsdWUpIHJldHVybiBwcm9wcy5taW5pVmFyaWFudFdpZHRoXG4gICAgICByZXR1cm4gcHJvcHMubWF4VmFyaWFudFdpZHRoXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oKCkgPT4gKHtcbiAgICAgICd2LW5hdmlnYXRpb24nOiB0cnVlLFxuICAgICAgJ3YtbmF2aWdhdGlvbi0tZXhwYW5kZWQnOiBpc0V4cGFuZGVkLnZhbHVlLFxuICAgICAgJ3YtbmF2aWdhdGlvbi0tZml4ZWQnOiBwcm9wcy5maXhlZCxcbiAgICAgIC4uLihwcm9wcy5jb2xvciA/IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgfSkpXG5cbiAgICBjb25zdCBzdHlsZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoKSA9PiAoe1xuICAgICAgd2lkdGg6IGNvbnZlcnRUb1VuaXQoY29tcHV0ZWRXaWR0aC52YWx1ZSksXG4gICAgICBtYXhIZWlnaHQ6IGBjYWxjKDEwMHZoIC0gJHsgY29udmVydFRvVW5pdChwcm9wcy5vZmZzZXRUb3ApIH0pYCxcbiAgICAgIHRvcDogcHJvcHMuZml4ZWQgPyBjb252ZXJ0VG9Vbml0KHByb3BzLm9mZnNldFRvcCkgOiAnJyxcbiAgICAgIGxlZnQ6ICFwcm9wcy5yaWdodCAmJiBwcm9wcy5maXhlZCA/IGNvbnZlcnRUb1VuaXQoMCkgOiAnJyxcbiAgICAgIHJpZ2h0OiBwcm9wcy5yaWdodCAmJiBwcm9wcy5maXhlZCA/IGNvbnZlcnRUb1VuaXQoMCkgOiAnJyxcbiAgICAgIC4uLihwcm9wcy5jb2xvciA/IHNldEJhY2tncm91bmRDc3NDb2xvcihwcm9wcy5jb2xvcikgOiB7fSksXG4gICAgfSkpXG5cbiAgICBjb25zdCBnZW5OYXZpZ2F0aW9uQ29udGVudCA9ICgpOiBWTm9kZSA9PiB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3YtbmF2aWdhdGlvbl9fY29udGVudCcsXG4gICAgICB9LCB7XG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IHNsb3RzLmRlZmF1bHQ/LigpLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBvbk1vdXNlZW50ZXIgPSAoKSA9PiB7XG4gICAgICBpZiAoIXByb3BzLm9uSG92ZXIgfHwgcHJvcHMubWluaVZhcmlhbnQpIHJldHVyblxuICAgICAgaXNIb3ZlcmVkLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgndXBkYXRlOmV4cGFuZCcsIHRydWUpXG4gICAgfVxuXG4gICAgY29uc3Qgb25Nb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgaWYgKCFwcm9wcy5vbkhvdmVyIHx8IHByb3BzLm1pbmlWYXJpYW50KSByZXR1cm5cbiAgICAgIGlzSG92ZXJlZC52YWx1ZSA9IGZhbHNlXG4gICAgICBlbWl0KCd1cGRhdGU6ZXhwYW5kJywgZmFsc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2FzaWRlJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGVzLnZhbHVlLFxuICAgICAgb25Nb3VzZWVudGVyLFxuICAgICAgb25Nb3VzZWxlYXZlLFxuICAgIH0sIGdlbk5hdmlnYXRpb25Db250ZW50KCkpXG4gIH0sXG59KVxuIl19