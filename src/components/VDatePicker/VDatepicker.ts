import { h, defineComponent } from 'vue'

import { VYearsTable } from './VYearsTable'

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  setup() {

    return () => h(VYearsTable)
  },
})