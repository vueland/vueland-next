# VDataTable
```vue
  <v-data-table
    :cols="cols"
    :rows="rows"
    toolbar
    numbered
    checkbox
    @filter="testFunc"
    @checked="testFunc"
    @last-page="fetchItems"
  />
```
## Props
  - rows
  - cols
  - rowCounts
  - color
  - headerColor
  - dark
  - stateOut
  - numbered
  - checkbox
  - align

## Events
  - filter
  - checked
  - lastPage


