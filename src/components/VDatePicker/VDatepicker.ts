// Styles
import './VDatepicker.scss'

// Vue API
import { h, ref, watch, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Helpers
import { parseDate } from './helpers'

// Components
import { VYearsTable } from './VYearsTable'
import { VMonthTable } from './VMonthsTable'

const vDatePickerProps: any = {
  dark: Boolean,
  lang: String,
  value: [String, Date],
  disabledDates: Object,
  highlighted: Object,
  ...colorProps(),
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props: vDatePickerProps,
  setup(props) {
    const year = ref<number | null>(null)
    const month = ref<number | null>(null)
    const date = ref<number | null>(null)

    const { setBackground } = useColors()

    const setParsedDate = selectedDate => {
      const dateForParsing = selectedDate || new Date()
      const parsedDate = parseDate(dateForParsing)

      year.value = parsedDate.year
      month.value = parsedDate.month
      date.value = parsedDate.date
    }

    watch(() => props.value, setParsedDate, { immediate: true })

    const genYearsTable = () => {
      const propsData = {
        dark: props.dark,
        year: year.value,
        ['onUpdate:year']: ($event) => year.value = $event,
      }

      return h(VYearsTable, propsData)
    }

    const genMonthsTable = () => {
      const propsData = {
        dark: props.dark,
        lang: props.lang,
        month: month.value,
        ['onUpdate:month']: ($event) => month.value = $event,
      }

      return h(VMonthTable, propsData)
    }

    return () => {
      return h('div', setBackground(props.color, {
        class: {
          'v-datepicker': true
        },
      }), [
        genYearsTable(),
        genMonthsTable(),
      ])
    }
  },
})
