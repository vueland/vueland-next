# VDataTable
```vue
  <v-data-table
    :cols="cols"
    :rows="rows"
    numbered
    checkbox
    @filter="testFunc"
    @checked="testFunc"
    @last-page="fetchItems"
  >
    <template v-slot:address="{ row, format }">
      <v-icon
        icon="fas fa-envelope"
        size="12"
        :color="format(row).includes('h') ? 'red':'blue'"
      />
      <span style="margin-left: 15px">{{ format(row) }}</span>
    </template>
    <template v-slot:toolbar>
      <v-button
        text="add"
        color="blue"
        elevation="3"
        @click="onClick"
      />
    </template>
  </v-data-table>
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
            <td>array of objects which is represent table rows</td>
        </tr>
        <tr>
            <td colspan="3">cols</td>
            <td>Array</td>
            <td>null</td>
            <td>array of objects which is represent table columns</td>
        </tr>
        <tr>
            <td colspan="3">rows-on-table</td>
            <td>Array</td>
            <td>[10, 15, 20, 25]</td>
            <td>array of numbers for displaying the <br/> number of rows to display panel</td>
        </tr>
        <tr>
            <td colspan="3">color</td>
            <td>String</td>
            <td>white</td>
            <td>table background color</td>
        </tr>
        <tr>
            <td colspan="3">header-color</td>
            <td>String</td>
            <td>white</td>
            <td>table header background color</td>
        </tr>
        <tr>
            <td colspan="3">align</td>
            <td>String</td>
            <td>left</td>
            <td>aligns the display of table content.<br/> You can choose: left, center, right</td>
        </tr>
        <tr>
            <td colspan="3">dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, table content will be<br/> displayed in white</td>
        </tr>
         <tr>
            <td colspan="3">state-out</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, the filter event appears in the table,<br/> which can be handled by custom methods,<br/> respectively, internal filtering in the<br/> table will be disabled</td>
        </tr>
        <tr>
            <td colspan="3">numbered</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, table rows will be numbered</td>
        </tr>
        <tr>
            <td colspan="3">checkbox</td>
            <td>Boolean</td>
            <td>false</td>
            <td>if set true, the table rows will <br/> be supplemented with a checkbox</td>
        </tr>
    </tbody>
</table>


## Events
<table>
    <thead>
        <tr>
            <th>Event name</th>
            <th>value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>
  - filter
  - checked
  - lastPage


