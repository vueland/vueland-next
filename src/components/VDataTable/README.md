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
            <th colspan="3">Prop</th>
            <th>Type</th>
            <th>Default value</th>
            <th colspan="4">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="3">rows</td>
            <td>Array</td>
            <td>null</td>
            <td colspan="4">array of objects which is represent table rows</td>
        </tr>
        <tr>
            <td colspan="3">cols</td>
            <td>Array</td>
            <td>null</td>
            <td colspan="4">array of objects which is represent table columns</td>
        </tr>
        <tr>
            <td colspan="3">rows-on-table</td>
            <td>Array</td>
            <td>[10, 15, 20, 25]</td>
            <td colspan="4">array of numbers for displaying the number of rows to display panel</td>
        </tr>
        <tr>
            <td colspan="3">color</td>
            <td>String</td>
            <td>white</td>
            <td colspan="4">table background color</td>
        </tr>
        <tr>
            <td colspan="3">header-color</td>
            <td>String</td>
            <td>white</td>
            <td colspan="4">table header background color</td>
        </tr>
        <tr>
            <td colspan="3">align</td>
            <td>String</td>
            <td>left</td>
            <td colspan="4">aligns the display of table content. You can choose: left, center, right</td>
        </tr>
        <tr>
            <td colspan="3">dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td colspan="4">if set true, table content will be displayed in white</td>
        </tr>
         <tr>
            <td colspan="3">state-out</td>
            <td>Boolean</td>
            <td>false</td>
            <td colspan="4">if set true, the filter event appears in the table, which can be handled by custom methods, respectively, internal filtering in the table will be disabled</td>
        </tr>
        <tr>
            <td colspan="3">numbered</td>
            <td>Boolean</td>
            <td>false</td>
            <td colspan="4">if set true, table rows will be numbered</td>
        </tr>
        <tr>
            <td colspan="3">checkbox</td>
            <td>Boolean</td>
            <td>false</td>
            <td colspan="4">if set true, the table rows will be supplemented with a checkbox</td>
        </tr>
    </tbody>
</table>


## Events
  - filter
  - checked
  - lastPage


