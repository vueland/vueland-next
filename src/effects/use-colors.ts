// Utils
import { isCssColor } from '../utils/color-parser'

// Types
import { PropType } from 'vue'
import { ColorSetters } from '../../types'

export function colorProps() {
  return {
    color: String as PropType<string>,
  }
}

export const useColors = (): ColorSetters => {
  const setBackground = (color: string, data: any): object => {
    if (!isCssColor(color)) {
      data.class[color] = true
    } else {
      data.style = {
        ...data.style,
        'background-color': color,
        'border-color': color,
      }
    }

    return data
  }

  const setTextColor = (color: string, data: any = {}): object => {
    if (isCssColor(color)) {
      data.style = {
        ...(data.style as object),
        color: `${color}`,
        'caret-color': `${color}`,
      }
    } else if (color) {
      const [colorName, colorModifier] = color.trim().split(' ', 2)

      if (typeof data.class === 'string') {
        data.class = {
          [data.class]: true,
        }
      } else {
        data.class = {
          ...data.class,
        }
      }

      data.class[`${colorName}--text`] = true

      if (colorModifier) {
        data.class[`text--${colorModifier}`] = true
      }
    }

    return data
  }

  return {
    setBackground,
    setTextColor,
  }
}
