import { PropType, defineComponent } from 'vue'

export type Props = {
  [key: string]: any | PropType<any>
}

export type VInputComponent = ReturnType<any>
