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

<table>
    <thead>
        <tr>
            <th>Prop Name</th>
            <th>Type</th>
            <th>Default value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>rows</td>
            <td>Array</td>
            <td>null</td>
            <td>array of objects which is represent table rows</td>
        </tr>
    </tbody>
</table>
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


