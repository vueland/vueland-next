import { PropType } from 'vue'

export type Props = {
  [key: string]: any | PropType<any>
}

export type OffsetSizes = {
  left: number
  top: number
  width: number
  height: number
}
