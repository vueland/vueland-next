// Styles
import './VDatepicker.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Effects
import { colorProps } from '../../effects/use-colors'

// Components
import { VYearsTable } from './VYearsTable'
import { VMonthTable } from './VMonthsTable'

const vDatePickerProps: any = {
  dark: Boolean,
  lang: String,
  ...colorProps(),
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props: vDatePickerProps,
  setup(props) {
    return () => h('div', {}, [
      h(VYearsTable, props, ''),
      h(VMonthTable, { lang: props.lang }),
    ])
  },
})