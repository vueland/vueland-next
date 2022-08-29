import { computed, reactive, watch } from 'vue';
import { useValidation } from './use-validation';
export const useInputStates = (props, { attrs, emit }) => {
    const inputState = reactive({
        value: '',
        focused: false,
    });
    const { errorState, validate } = useValidation(props);
    const isDisabled = computed(() => {
        if (props.disabled)
            return true;
        if (typeof attrs.disabled === 'boolean')
            return attrs.disabled;
        return attrs.disabled !== undefined;
    });
    const isReadonly = computed(() => {
        if (props.readonly)
            return true;
        if (typeof attrs.readonly === 'boolean')
            return attrs.readonly;
        return attrs.readonly !== undefined;
    });
    const stateClasses = computed(() => ({
        'primary--text': inputState.focused && !errorState.innerError,
        'error--text': !!errorState.innerError,
    }));
    watch(() => inputState.focused, (focused) => {
        if (!focused && props.rules)
            return validate(inputState.value);
    });
    watch(() => inputState.value, (val) => {
        if (props.rules)
            return validate(val);
    });
    const onFocus = (e) => {
        if (isReadonly.value)
            return;
        inputState.focused = true;
        emit('focus', e);
    };
    const onChange = () => {
        if (isReadonly.value)
            return;
        emit('change');
    };
    const onBlur = (e) => {
        if (isReadonly.value)
            return;
        inputState.focused = false;
        emit('blur', e);
    };
    const onSelect = (val) => {
        inputState.focused = false;
        emit('update:modelValue', val);
        emit('select', val);
        onChange();
    };
    return {
        inputState,
        errorState,
        isReadonly,
        isDisabled,
        stateClasses,
        onFocus,
        onBlur,
        onChange,
        onSelect,
        validate
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWlucHV0LXN0YXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb3NhYmxlcy91c2UtaW5wdXQtc3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQTtBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFPaEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7SUFDdkQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFRO1FBQ2pDLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDLENBQUE7SUFFRixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQVUsR0FBRyxFQUFFO1FBQ3hDLElBQUksS0FBSyxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUUvQixJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFBO1FBRTlELE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQVUsR0FBRyxFQUFFO1FBQ3hDLElBQUksS0FBSyxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUUvQixJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFBO1FBRTlELE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQTBCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUQsZUFBZSxFQUFFLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTtRQUM3RCxhQUFhLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVO0tBQ3ZDLENBQUMsQ0FBQyxDQUFBO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLO1lBQUUsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNwQyxJQUFJLEtBQUssQ0FBQyxLQUFLO1lBQUUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BCLElBQUksVUFBVSxDQUFDLEtBQUs7WUFBRSxPQUFNO1FBRTVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbEIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLElBQUksVUFBVSxDQUFDLEtBQUs7WUFBRSxPQUFNO1FBRTVCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25CLElBQUksVUFBVSxDQUFDLEtBQUs7WUFBRSxPQUFNO1FBRTVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QixVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUUxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUVuQixRQUFRLEVBQUUsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUVELE9BQU87UUFDTCxVQUFVO1FBQ1YsVUFBVTtRQUNWLFVBQVU7UUFDVixVQUFVO1FBQ1YsWUFBWTtRQUNaLE9BQU87UUFDUCxNQUFNO1FBQ04sUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO0tBQ1QsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkLCByZWFjdGl2ZSwgd2F0Y2ggfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VWYWxpZGF0aW9uIH0gZnJvbSAnLi91c2UtdmFsaWRhdGlvbidcblxudHlwZSBTdGF0ZSA9IHtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlclxuICBmb2N1c2VkOiBib29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VJbnB1dFN0YXRlcyA9IChwcm9wcywgeyBhdHRycywgZW1pdCB9KSA9PiB7XG4gIGNvbnN0IGlucHV0U3RhdGUgPSByZWFjdGl2ZTxTdGF0ZT4oe1xuICAgIHZhbHVlOiAnJyxcbiAgICBmb2N1c2VkOiBmYWxzZSxcbiAgfSlcblxuICBjb25zdCB7IGVycm9yU3RhdGUsIHZhbGlkYXRlIH0gPSB1c2VWYWxpZGF0aW9uKHByb3BzKVxuXG4gIGNvbnN0IGlzRGlzYWJsZWQgPSBjb21wdXRlZDxib29sZWFuPigoKSA9PiB7XG4gICAgaWYgKHByb3BzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKHR5cGVvZiBhdHRycy5kaXNhYmxlZCA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gYXR0cnMuZGlzYWJsZWRcblxuICAgIHJldHVybiBhdHRycy5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkXG4gIH0pXG5cbiAgY29uc3QgaXNSZWFkb25seSA9IGNvbXB1dGVkPGJvb2xlYW4+KCgpID0+IHtcbiAgICBpZiAocHJvcHMucmVhZG9ubHkpIHJldHVybiB0cnVlXG5cbiAgICBpZiAodHlwZW9mIGF0dHJzLnJlYWRvbmx5ID09PSAnYm9vbGVhbicpIHJldHVybiBhdHRycy5yZWFkb25seVxuXG4gICAgcmV0dXJuIGF0dHJzLnJlYWRvbmx5ICE9PSB1bmRlZmluZWRcbiAgfSlcblxuICBjb25zdCBzdGF0ZUNsYXNzZXMgPSBjb21wdXRlZDxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oKCkgPT4gKHtcbiAgICAncHJpbWFyeS0tdGV4dCc6IGlucHV0U3RhdGUuZm9jdXNlZCAmJiAhZXJyb3JTdGF0ZS5pbm5lckVycm9yLFxuICAgICdlcnJvci0tdGV4dCc6ICEhZXJyb3JTdGF0ZS5pbm5lckVycm9yLFxuICB9KSlcblxuICB3YXRjaCgoKSA9PiBpbnB1dFN0YXRlLmZvY3VzZWQsIChmb2N1c2VkKSA9PiB7XG4gICAgaWYgKCFmb2N1c2VkICYmIHByb3BzLnJ1bGVzKSByZXR1cm4gdmFsaWRhdGUoaW5wdXRTdGF0ZS52YWx1ZSlcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBpbnB1dFN0YXRlLnZhbHVlLCAodmFsKSA9PiB7XG4gICAgaWYgKHByb3BzLnJ1bGVzKSByZXR1cm4gdmFsaWRhdGUodmFsKVxuICB9KVxuXG4gIGNvbnN0IG9uRm9jdXMgPSAoZSkgPT4ge1xuICAgIGlmIChpc1JlYWRvbmx5LnZhbHVlKSByZXR1cm5cblxuICAgIGlucHV0U3RhdGUuZm9jdXNlZCA9IHRydWVcbiAgICBlbWl0KCdmb2N1cycsIGUpXG4gIH1cblxuICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICBpZiAoaXNSZWFkb25seS52YWx1ZSkgcmV0dXJuXG5cbiAgICBlbWl0KCdjaGFuZ2UnKVxuICB9XG5cbiAgY29uc3Qgb25CbHVyID0gKGUpID0+IHtcbiAgICBpZiAoaXNSZWFkb25seS52YWx1ZSkgcmV0dXJuXG5cbiAgICBpbnB1dFN0YXRlLmZvY3VzZWQgPSBmYWxzZVxuICAgIGVtaXQoJ2JsdXInLCBlKVxuICB9XG5cbiAgY29uc3Qgb25TZWxlY3QgPSAodmFsKSA9PiB7XG4gICAgaW5wdXRTdGF0ZS5mb2N1c2VkID0gZmFsc2VcblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgIGVtaXQoJ3NlbGVjdCcsIHZhbClcblxuICAgIG9uQ2hhbmdlKClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5wdXRTdGF0ZSxcbiAgICBlcnJvclN0YXRlLFxuICAgIGlzUmVhZG9ubHksXG4gICAgaXNEaXNhYmxlZCxcbiAgICBzdGF0ZUNsYXNzZXMsXG4gICAgb25Gb2N1cyxcbiAgICBvbkJsdXIsXG4gICAgb25DaGFuZ2UsXG4gICAgb25TZWxlY3QsXG4gICAgdmFsaWRhdGVcbiAgfVxufVxuIl19