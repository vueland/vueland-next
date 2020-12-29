import { computed } from 'vue';
export function sizeProps() {
    return {
        large: Boolean,
        small: Boolean,
        xLarge: Boolean,
        xSmall: Boolean,
    };
}
export function useSizes(props) {
    const medium = computed(() => {
        return (!props.large &&
            !props.small &&
            !props.xLarge &&
            !props.xSmall &&
            !props.size);
    });
    const sizeClasses = computed(() => {
        return {
            'v-size--x-small': props.xSmall,
            'v-size--small': props.small,
            'v-size--default': medium.value,
            'v-size--large': props.large,
            'v-size--x-large': props.xLarge,
        };
    });
    return {
        sizeClasses,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXNpemVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VmZmVjdHMvdXNlLXNpemVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFHOUIsTUFBTSxVQUFVLFNBQVM7SUFDdkIsT0FBTztRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxPQUFPO0tBQ2hCLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFLO0lBQzVCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBVSxHQUFHLEVBQUU7UUFDcEMsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDWixDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ1osQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNiLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDYixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ1osQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUEwQixHQUFHLEVBQUU7UUFDekQsT0FBTztZQUNMLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQy9CLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSztZQUM1QixpQkFBaUIsRUFBRSxNQUFNLENBQUMsS0FBSztZQUMvQixlQUFlLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDNUIsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDaEMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTztRQUNMLFdBQVc7S0FDWixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgUHJvcHMgfSBmcm9tICcuLi90eXBlcydcblxuZXhwb3J0IGZ1bmN0aW9uIHNpemVQcm9wcygpOiBQcm9wcyB7XG4gIHJldHVybiB7XG4gICAgbGFyZ2U6IEJvb2xlYW4sXG4gICAgc21hbGw6IEJvb2xlYW4sXG4gICAgeExhcmdlOiBCb29sZWFuLFxuICAgIHhTbWFsbDogQm9vbGVhbixcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlU2l6ZXMocHJvcHMpIHtcbiAgY29uc3QgbWVkaXVtID0gY29tcHV0ZWQ8Ym9vbGVhbj4oKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhcHJvcHMubGFyZ2UgJiZcbiAgICAgICFwcm9wcy5zbWFsbCAmJlxuICAgICAgIXByb3BzLnhMYXJnZSAmJlxuICAgICAgIXByb3BzLnhTbWFsbCAmJlxuICAgICAgIXByb3BzLnNpemVcbiAgICApXG4gIH0pXG5cbiAgY29uc3Qgc2l6ZUNsYXNzZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAndi1zaXplLS14LXNtYWxsJzogcHJvcHMueFNtYWxsLFxuICAgICAgJ3Ytc2l6ZS0tc21hbGwnOiBwcm9wcy5zbWFsbCxcbiAgICAgICd2LXNpemUtLWRlZmF1bHQnOiBtZWRpdW0udmFsdWUsXG4gICAgICAndi1zaXplLS1sYXJnZSc6IHByb3BzLmxhcmdlLFxuICAgICAgJ3Ytc2l6ZS0teC1sYXJnZSc6IHByb3BzLnhMYXJnZSxcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBzaXplQ2xhc3NlcyxcbiAgfVxufVxuIl19