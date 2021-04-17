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
            <th>Prop</th>
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
        <tr>
            <td>cols</td>
            <td>Array</td>
            <td>null</td>
            <td>array of objects which is represent table columns</td>
        </tr>
        <tr>
            <td>rows-on-table</td>
            <td>Array</td>
            <td>[10, 15, 20, 25]</td>
            <td>array of numbers for displaying the number of rows to display panel</td>
        </tr>
        <tr>
            <td>color</td>
            <td>String</td>
            <td>white</td>
            <td>table background color</td>
        </tr>
        <tr>
            <td>header-color</td>
            <td>String</td>
            <td>white</td>
            <td>table header background color</td>
        </tr>
        <tr>
            <td>align</td>
            <td>String</td>
            <td>left</td>
            <td>aligns the display of table content. You can choose: left, center, right</td>
        </tr>
        <tr>
            <td>dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, table content will be displayed in white</td>
        </tr>
        <tr>
            <td>dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, table content will be displayed in white</td>
        </tr>
         <tr>
            <td>stateOut</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, the filter event appears in the table, which can be handled by custom methods, respectively, internal filtering in the table will be disabled</td>
        </tr>
        <tr>
            <td>numbered</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, table rows will be numbered</td>
        </tr>
        <tr>
            <td>checkbox</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, the table rows will be supplemented with a checkbox</td>
        </tr>
    </tbody>
</table>


## Events
  - filter
  - checked
  - lastPage


