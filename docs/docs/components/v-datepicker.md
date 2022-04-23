# v-datepicker

<div>
      <v-date-picker
        lang="en"
        label="set date"
        color="grey darken-3"
        content-color="amber accent-3"
        format="dd MMMM yyyy D"
        elevation="15"
        style="width: 350px;"
        use-mls
        today
        clearable
        typeable
        prepend-icon="event"
        monday-first
        :disabled-dates="{
            days: [0, 6],
        }"
      />
</div>

```vue

    <template>
      <v-date-picker
          :lang="lang"
          label="set date"
          :disabled-dates="disabledDates"
          color="grey darken-3"
          content-color="amber accent-3"
          format="dd MMMM yyyy D"
          prepend-icon="event"
          elevation="15"
          use-mls
          today
          clearable
          typeable
          monday-first
      />
    </template>
    <script>
      import {defineComponent} from 'vue'
    
      export default defineComponent({
        setup() {
          const lang = 'en'
          const disabledDates = {
            days: [0,6], // дни недели
            from: new Date(2021, 4, 2), // дизейблим даты в интервале с
            to: new Date(2021, 4, 10), // по указанную дату
            daysOfMonth: [29, 30, 31], // числа каждого месяца
            dates: [                    // массив дат
              new Date(2021, 6, 14),
              new Date(2021, 6, 15),
              new Date(2021, 6, 16),
            ],
            ranges: [{                    // массив интервалов
              from: new Date(2021, 4, 25),
              to: new Date(2021, 5, 10),
            }, {
              from: new Date(2021, 6, 12),
              to: new Date(2021, 7, 25),
            }],
            custom: (date) => !(date.date % 2), // кастомный метод 
          }
        }
        
        return {
          disabledDates,
          lang
        }
      })
    </script>
```

## Props

<table>
    <thead>
        <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Значение по умолчанию</th>
        </tr>
    </thead>
</table>
