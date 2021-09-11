import { inject } from 'vue';
import colors from '../utils/colors';
const defaultThemeColors = {
  light: {
    base: colors.grey.darken4,
    primary: 'primary',
    secondary: colors.blue.darken2,
    accent: colors.blue.accent3,
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  },
  dark: {
    base: colors.shades.white,
    primary: colors.purple.base,
    secondary: colors.purple.darken2,
    accent: colors.pink.accent2,
    error: colors.red.accent3,
    info: colors.blue.accent3,
    success: colors.green.accent3,
    warning: colors.amber.accent3
  }
};
export function themeProps() {
  return {
    dark: Boolean
  };
}
export function useTheme() {
  var _options$theme, _options$theme$themes, _options$theme2, _options$theme2$theme, _options$theme3;

  const options = inject('$options');
  const light = (options === null || options === void 0 ? void 0 : (_options$theme = options.theme) === null || _options$theme === void 0 ? void 0 : (_options$theme$themes = _options$theme.themes) === null || _options$theme$themes === void 0 ? void 0 : _options$theme$themes.light) || {};
  const dark = (options === null || options === void 0 ? void 0 : (_options$theme2 = options.theme) === null || _options$theme2 === void 0 ? void 0 : (_options$theme2$theme = _options$theme2.themes) === null || _options$theme2$theme === void 0 ? void 0 : _options$theme2$theme.dark) || {};

  if (!(options !== null && options !== void 0 && (_options$theme3 = options.theme) !== null && _options$theme3 !== void 0 && _options$theme3.dark)) {
    return { ...defaultThemeColors.light,
      ...light
    };
  }

  return { ...defaultThemeColors.dark,
    ...dark
  };
}
//# sourceMappingURL=use-theme.js.map