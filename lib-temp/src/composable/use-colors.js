import { isCssColor } from '../utils/color-parser';
export const colorProps = (defaultColor = '') => ({
    color: {
        type: String,
        default: defaultColor,
    },
});
export const useColors = () => {
    const setTextClassNameColor = (color) => {
        const classes = {};
        if (!isCssColor(color)) {
            const [colorName, colorModifier] = color.trim().split(' ', 2);
            colorName && (classes[`${colorName}--text`] = true);
            colorModifier && (classes[`text--${colorModifier}`] = true);
        }
        return classes;
    };
    const setTextCssColor = (color) => {
        const styles = {};
        if (isCssColor(color)) {
            styles.color = color;
        }
        return styles;
    };
    const setBackgroundCssColor = (color) => {
        const styles = {};
        if (isCssColor(color)) {
            styles['background-color'] = color;
            styles['border-color'] = color;
        }
        return styles;
    };
    const setBackgroundClassNameColor = (color) => {
        const classes = {};
        if (!isCssColor(color)) {
            const [colorName, colorModifier] = color.trim().split(' ', 2);
            colorName && (classes[colorName] = true);
            colorModifier && (classes[colorModifier] = true);
        }
        return classes;
    };
    return {
        setTextCssColor,
        setTextClassNameColor,
        setBackgroundCssColor,
        setBackgroundClassNameColor,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWNvbG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb3NhYmxlL3VzZS1jb2xvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRWxELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLGVBQXVCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxZQUFZO0tBQ3RCO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUM1QixNQUFNLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBRWxCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUM3RCxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ25ELGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLGFBQWEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7U0FDNUQ7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDLENBQUE7SUFFRCxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQWEsRUFBMEIsRUFBRTtRQUNoRSxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUE7UUFFdEIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7U0FDckI7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUMsQ0FBQTtJQUVELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM5QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFFakIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ2xDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUE7U0FDL0I7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUMsQ0FBQTtJQUVELE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixNQUFNLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQzdELFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUN4QyxhQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7U0FDakQ7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsMkJBQTJCO0tBQzVCLENBQUE7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Nzc0NvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItcGFyc2VyJ1xuXG5leHBvcnQgY29uc3QgY29sb3JQcm9wcyA9IChkZWZhdWx0Q29sb3I6IHN0cmluZyA9ICcnKSA9PiAoe1xuICBjb2xvcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiBkZWZhdWx0Q29sb3IsXG4gIH0sXG59KVxuXG5leHBvcnQgY29uc3QgdXNlQ29sb3JzID0gKCkgPT4ge1xuICBjb25zdCBzZXRUZXh0Q2xhc3NOYW1lQ29sb3IgPSAoY29sb3I6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSB7fVxuXG4gICAgaWYgKCFpc0Nzc0NvbG9yKGNvbG9yKSkge1xuICAgICAgY29uc3QgW2NvbG9yTmFtZSwgY29sb3JNb2RpZmllcl0gPSBjb2xvci50cmltKCkuc3BsaXQoJyAnLCAyKVxuICAgICAgY29sb3JOYW1lICYmIChjbGFzc2VzW2Ake2NvbG9yTmFtZX0tLXRleHRgXSA9IHRydWUpXG4gICAgICBjb2xvck1vZGlmaWVyICYmIChjbGFzc2VzW2B0ZXh0LS0ke2NvbG9yTW9kaWZpZXJ9YF0gPSB0cnVlKVxuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzXG4gIH1cblxuICBjb25zdCBzZXRUZXh0Q3NzQ29sb3IgPSAoY29sb3I6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IHN0eWxlczogYW55ID0ge31cblxuICAgIGlmIChpc0Nzc0NvbG9yKGNvbG9yKSkge1xuICAgICAgc3R5bGVzLmNvbG9yID0gY29sb3JcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzXG4gIH1cblxuICBjb25zdCBzZXRCYWNrZ3JvdW5kQ3NzQ29sb3IgPSAoY29sb3I6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHt9XG5cbiAgICBpZiAoaXNDc3NDb2xvcihjb2xvcikpIHtcbiAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1jb2xvciddID0gY29sb3JcbiAgICAgIHN0eWxlc1snYm9yZGVyLWNvbG9yJ10gPSBjb2xvclxuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXNcbiAgfVxuXG4gIGNvbnN0IHNldEJhY2tncm91bmRDbGFzc05hbWVDb2xvciA9IChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IHt9XG5cbiAgICBpZiAoIWlzQ3NzQ29sb3IoY29sb3IpKSB7XG4gICAgICBjb25zdCBbY29sb3JOYW1lLCBjb2xvck1vZGlmaWVyXSA9IGNvbG9yLnRyaW0oKS5zcGxpdCgnICcsIDIpXG4gICAgICBjb2xvck5hbWUgJiYgKGNsYXNzZXNbY29sb3JOYW1lXSA9IHRydWUpXG4gICAgICBjb2xvck1vZGlmaWVyICYmIChjbGFzc2VzW2NvbG9yTW9kaWZpZXJdID0gdHJ1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlc1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRUZXh0Q3NzQ29sb3IsXG4gICAgc2V0VGV4dENsYXNzTmFtZUNvbG9yLFxuICAgIHNldEJhY2tncm91bmRDc3NDb2xvcixcbiAgICBzZXRCYWNrZ3JvdW5kQ2xhc3NOYW1lQ29sb3IsXG4gIH1cbn1cbiJdfQ==