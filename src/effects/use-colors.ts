// Utils
import { isCssColor } from '../utils/color-parser'

// Types
import { Props } from '../types'
import { PropType } from 'vue'

type Colorable = {
  [key: string]: (color: string, data: any) => any
}

interface ColorProps {
  color: PropType<string>
}

export function colorProps(): ColorProps {
  return {
    color: String,
  }
}

export const useColors = (props: Props): Colorable => {
  const setBackground = (color: string, data: any): object => {
    if (!isCssColor(color)) {
      data.class[color] = true
    } else {
      data.style = {
        ...(data.style as object),
        'background-color': props.color,
        'border-color': props.color,
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

      data.class = {
        ...data.class,
        [colorName + '--text']: true,
      }

      if (colorModifier) {
        data.class['text--' + colorModifier] = true
      }
    }

    return data
  }

  return {
    setBackground,
    setTextColor,
  }
}
