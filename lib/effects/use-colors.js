// Utils
import { isCssColor } from '../utils/color-parser';
export function colorProps() {
  return {
    color: String
  };
}
export const useColors = props => {
  const setBackground = (color, data) => {
    if (!isCssColor(color)) {
      data.class[color] = true;
    } else {
      data.style.push({
        'background-color': props.color,
        'border-color': props.color
      });
    }

    return data;
  };

  const setTextColor = (color, data = {}) => {
    if (isCssColor(color)) {
      data.style = { ...data.style,
        color: `${color}`,
        'caret-color': `${color}`
      };
    } else if (color) {
      const [colorName, colorModifier] = color.trim().split(' ', 2);
      data.class = { ...data.class,
        [colorName + '--text']: true
      };

      if (colorModifier) {
        data.class['text--' + colorModifier] = true;
      }
    }

    return data;
  };

  return {
    setBackground,
    setTextColor
  };
};
//# sourceMappingURL=use-colors.js.map