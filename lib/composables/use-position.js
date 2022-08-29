import { computed } from 'vue';
export const positionProps = () => {
    return {
        absolute: Boolean,
        left: Boolean,
        right: Boolean,
        top: Boolean,
        bottom: Boolean,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3VzZS1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBUzlCLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7SUFDaEMsT0FBTztRQUNMLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsT0FBTztRQUNaLE1BQU0sRUFBRSxPQUFPO0tBQ2hCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFVLEVBQWdCLEVBQUU7SUFDdEQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNwQyxPQUFPO1lBQ0wsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDcEMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ3RCLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSztZQUN4QixTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDcEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQzNCLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQTtBQUM1QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWdWUgQVBJXG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuLy8gVHlwZXNcbmltcG9ydCB7IENvbXB1dGVkUmVmIH0gZnJvbSAndnVlJ1xuXG50eXBlIFBvc2l0aW9uYWJsZSA9IHtcbiAgcG9zaXRpb25DbGFzc2VzOiBDb21wdXRlZFJlZjxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj5cbn1cblxuZXhwb3J0IGNvbnN0IHBvc2l0aW9uUHJvcHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgYWJzb2x1dGU6IEJvb2xlYW4sXG4gICAgbGVmdDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhbixcbiAgICB0b3A6IEJvb2xlYW4sXG4gICAgYm90dG9tOiBCb29sZWFuLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VQb3NpdGlvbiA9IChwcm9wczogYW55KTogUG9zaXRpb25hYmxlID0+IHtcbiAgY29uc3QgcG9zaXRpb25DbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAncG9zaXRpb24tLWFic29sdXRlJzogcHJvcHMuYWJzb2x1dGUsXG4gICAgICAndG8tLWxlZnQnOiBwcm9wcy5sZWZ0LFxuICAgICAgJ3RvLS1yaWdodCc6IHByb3BzLnJpZ2h0LFxuICAgICAgJ3RvLS10b3AnOiBwcm9wcy50b3AsXG4gICAgICAndG8tLWJvdHRvbSc6IHByb3BzLmJvdHRvbSxcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHsgcG9zaXRpb25DbGFzc2VzIH1cbn1cbiJdfQ==