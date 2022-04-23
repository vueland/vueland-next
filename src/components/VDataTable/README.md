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
            <th>Required</th>
            <th colspan="4">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="3">rows</td>
            <td>Array</td>
            <td>null</td>
            <td>true</td>
            <td>array of objects which is represent table rows</td>
        </tr>
        <tr>
            <td colspan="3">cols</td>
            <td>Array</td>
            <td>null</td>
            <td>true</td>
            <td>array of objects which is represent table columns</td>
        </tr>
        <tr>
            <td colspan="3">rows-on-table</td>
            <td>Array</td>
            <td>[10, 15, 20, 25]</td>
            <td>false</td>
            <td>array of numbers for displaying the <br/> number of rows to display panel</td>
        </tr>
        <tr>
            <td colspan="3">color</td>
            <td>String</td>
            <td>white</td>
            <td>false</td>
            <td>table background color</td>
        </tr>
        <tr>
            <td colspan="3">header-props</td>
            <td>Object</td>
            <td>-</td>
            <td>false</td>
            <td>table header props object</td>
        </tr>         
        <tr>
            <td colspan="7">
                <pre class="language-typescript">
                   {
                      contentColor: string,
                      color: string,
                      dark: boolean
                   }
                </pre>
            </td>
        </tr>         
        <tr>
            <td colspan="3">footer-props</td>
            <td>Object</td>
            <td>-</td>
            <td>false</td>
            <td>table footer props object</td>
        </tr>         
        <tr>
            <td colspan="7">
                <pre>
                   {
                      pagination: {
                        buttonsColor: string,
                        displayColor: string
                      },
                      rowsPerPageOptions: number[],
                      rowsCountText: string
                   }
                </pre>
            </td>
        </tr> 
        <tr>
            <td colspan="3">align</td>
            <td>String</td>
            <td>left</td>
            <td>false</td>
            <td>aligns the display of table content.<br/> You can choose: left, center, right</td>
        </tr>
        <tr>
            <td colspan="3">dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
            <td>if set true, table content will be<br/> displayed in white</td>
        </tr>
         <tr>
            <td colspan="3">custom-filter</td>
            <td>Function</td>
            <td>undefined</td>
            <td>false</td>
            <td>if set, the rows will be filtered by the custom filter function<br/> which can be handled by custom methods,<br/> respectively, internal filtering in the<br/> table will be disabled</td>
        </tr>
        <tr>
            <td colspan="3">numbered</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
            <td>if set true, table rows will be numbered</td>
        </tr>
        <tr>
            <td colspan="3">checkbox</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
            <td>if set true, table rows will <br/> be supplemented with a checkbox</td>
        </tr>
    </tbody>
</table>


## Events
<table>
    <thead>
        <tr>
            <th>Event name</th>
            <th>Value type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>filter</td>
            <td>Object</td>
            <td>Object with "value" and "col" props</td>
        </tr>
        <tr>
            <td>checked</td>
            <td>Array</td>
            <td>Array of checked rows</td>
        </tr>
        <tr>
            <td>last-page</td>
            <td>Number</td>
            <td>The event will be triggered when the<br/> user reaches the last page, which makes <br/> it possible to load the necessary data asynchronously.<br/>As an argument, the handling function<br/> will get the index of the last<br/> current element</td>
        </tr>
    </tbody>
</table>

## Column object
```ts
        {
            key: string
            title: string
            width?: string | number
            resizeable?: boolean
            filterable?: boolean
            sortable?: boolean
            sorted?: boolean
            filtered?: boolean
            align?: 'left' | 'center' | 'right'
            cellClass?: string
            filterClass?: string
            rowCellClass?: string
            show?: boolean
            format?: (row: any) => any
            filter?: (arg: TableFilter) => any,
            sort?: (a: any, b: any) => number
        }
```
<table>
    <thead>
        <tr>
            <th>Prop name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>key</td>
            <td>String</td>
            <td>The property of the row object that<br/> will be displayed in this column</td>
        </tr>
        <tr>
            <td>title</td>
            <td>String</td>
            <td>Column title which will be displayed</td>
        </tr>
        <tr>
            <td>resizable</td>
            <td>Boolean</td>
            <td>If set true, will be able to change<br/> the size of the column </td>
        </tr>
         <tr>
            <td>sortable</td>
            <td>Boolean</td>
            <td>If set true, will be able to sort by<br/> current column</td>
        </tr>
        <tr>
            <td>filterable</td>
            <td>Boolean</td>
            <td>If set true, will be able to filter<br/> column by value</td>
        </tr>       
         <tr>
            <td>cellClass</td>
            <td>String</td>
            <td>custom class name for header cell</td>
        </tr>         
        <tr>
            <td>filterClass</td>
            <td>String</td>
            <td>custom class name for header<br/> filter element</td>
        </tr>        
        <tr>
            <td>rowCellClass</td>
            <td>String</td>
            <td>custom class name for table body<br/> column cells</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Boolean</td>
            <td>If set false, the column will be hidden.<br/> By default the column always is in<br/> visible state</td>
        </tr>        
        <tr>
            <td>width</td>
            <td>Number</td>
            <td>column width in pixels.<br/> By default the column always is in<br/> visible state</td>
        </tr>
        <tr>
            <td>format</td>
            <td>Function</td>
            <td>You can handle the display of a row<br/> value in a column by using a function<br/> that takes a row object as an argument.<br/> If the function is set it will be used<br/> when sorting and filtering the row data.</td>
        </tr>
    </tbody>
</table>


