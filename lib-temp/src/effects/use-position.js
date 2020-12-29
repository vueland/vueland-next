import { computed } from 'vue';
export const positionProps = () => {
    return {
        absolute: Boolean,
        left: Boolean,
        right: Boolean,
        top: Boolean,
        bottom: Boolean,
        offsetX: {
            type: [String, Number],
            default: 0
        },
        offsetY: {
            type: [String, Number],
            default: 0
        },
    };
};
export const usePosition = (props) => {
    const positionClasses = computed(() => {
        return {
            'position--absolute': props.absolute,
            'to--left': props.left,
            'to--right': props.right,
            'to--top': props.top,
            'to--bottom': props.bottom,
        };
    });
    return { positionClasses };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VmZmVjdHMvdXNlLXBvc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFVOUIsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQVUsRUFBRTtJQUN2QyxPQUFPO1FBQ0wsUUFBUSxFQUFFLE9BQU87UUFDakIsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsT0FBTztRQUNkLEdBQUcsRUFBRSxPQUFPO1FBQ1osTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBWSxFQUFnQixFQUFFO0lBQ3hELE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDcEMsT0FBTztZQUNMLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3BDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSTtZQUN0QixXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDeEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ3BCLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTTtTQUMzQixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUE7QUFDNUIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVnVlIEFQSVxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBQcm9wcyB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgQ29tcHV0ZWRSZWYgfSBmcm9tICd2dWUnXG5cbnR5cGUgUG9zaXRpb25hYmxlID0ge1xuICBwb3NpdGlvbkNsYXNzZXM6IENvbXB1dGVkUmVmPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+PlxufVxuXG5leHBvcnQgY29uc3QgcG9zaXRpb25Qcm9wcyA9ICgpOiBQcm9wcyA9PiB7XG4gIHJldHVybiB7XG4gICAgYWJzb2x1dGU6IEJvb2xlYW4sXG4gICAgbGVmdDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhbixcbiAgICB0b3A6IEJvb2xlYW4sXG4gICAgYm90dG9tOiBCb29sZWFuLFxuICAgIG9mZnNldFg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBvZmZzZXRZOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBvc2l0aW9uID0gKHByb3BzOiBQcm9wcyk6IFBvc2l0aW9uYWJsZSA9PiB7XG4gIGNvbnN0IHBvc2l0aW9uQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3Bvc2l0aW9uLS1hYnNvbHV0ZSc6IHByb3BzLmFic29sdXRlLFxuICAgICAgJ3RvLS1sZWZ0JzogcHJvcHMubGVmdCxcbiAgICAgICd0by0tcmlnaHQnOiBwcm9wcy5yaWdodCxcbiAgICAgICd0by0tdG9wJzogcHJvcHMudG9wLFxuICAgICAgJ3RvLS1ib3R0b20nOiBwcm9wcy5ib3R0b20sXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7IHBvc2l0aW9uQ2xhc3NlcyB9XG59XG4iXX0=