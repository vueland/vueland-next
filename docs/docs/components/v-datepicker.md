# v-datepicker

<div>
      <v-date-picker
        lang="en"
        label="set date"
        color="grey darken-3"
        content-color="amber accent-3"
        format="dd MMMM yyyy D"
        elevation="15"
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
      <v-date-picker
        lang="en"
        label="set date"
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
        :disabled-dates="{ days: [0, 6] }"
      />
```
