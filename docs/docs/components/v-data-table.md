# v-data-table

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
            <td>array of numbers for displaying the  number of rows to display panel</td>
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
                <pre>
                   <span>{</span>
                      <span class="key">contentColor:</span> <span class="value-type">string</span>,
                      <span class="key">color:</span> <span class="value-type">string</span>,
                      <span class="key">dark:</span> <span class="value-type">boolean</span>
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
                   <span>{</span>
                      <span class="key">contentColor:</span> <span class="value-type">string</span>,
                      <span class="key">color:</span> <span class="value-type">string</span>,
                      <span class="key">dark:</span> <span class="value-type">boolean</span>
                   }
                </pre>
            </td>
        </tr>         
        <tr>
            <td colspan="3">align</td>
            <td>String</td>
            <td>left</td>
            <td>false</td>
            <td>aligns the display of table content. You can choose: left, center, right</td>
        </tr>
        <tr>
            <td colspan="3">dark</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
            <td>if set true, table content will be displayed in white</td>
        </tr>
         <tr>
            <td colspan="3">state-out</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
            <td>if set true, the filter event appears in the table, which can be handled by custom methods, respectively, internal filtering in the table will be disabled</td>
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
            <td>if set true, table rows will  be supplemented with a checkbox</td>
        </tr>
    </tbody>
</table>

## Events

<table style="width: 100%">
    <thead>
        <tr>
            <th colspan="1">Event name</th>
            <th colspan="1">Value type</th>
            <th colspan="1">Description</th>
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
            <td width="100">last-page</td>
            <td>Number</td>
            <td>The event will be triggered when the user reaches the last page, which makes it possible to load the necessary data asynchronously. As an argument, the handling function will get the index of the last current element</td>
        </tr>
    </tbody>
</table>

## Column object

```ts
{
    key: string,
    title:string,
    align ? : 'left' | 'center' | 'right',
    width ? : number,
    resizeable ? : boolean,
    sortable ? : boolean,
    filterable ? : boolean,
    cellClass ? : string,
    filterClass ? : string,
    rowCellClass ? : string,
    show ? : boolean,
    format ? : (row: any) => string
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
            <td>The property of the row object that will be displayed in this column</td>
        </tr>
        <tr>
            <td>title</td>
            <td>String</td>
            <td>Column title which will be displayed</td>
        </tr>
        <tr>
            <td>resizable</td>
            <td>Boolean</td>
            <td>If set true, will be able to change the size of the column </td>
        </tr>
         <tr>
            <td>sortable</td>
            <td>Boolean</td>
            <td>If set true, will be able to sort by current column</td>
        </tr>
        <tr>
            <td>filterable</td>
            <td>Boolean</td>
            <td>If set true, will be able to filter column by value</td>
        </tr>       
         <tr>
            <td>cellClass</td>
            <td>String</td>
            <td>custom class name for header cell</td>
        </tr>         
        <tr>
            <td>filterClass</td>
            <td>String</td>
            <td>custom class name for header filter element</td>
        </tr>        
        <tr>
            <td>rowCellClass</td>
            <td>String</td>
            <td>custom class name for table body column cells</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Boolean</td>
            <td>If set false, the column will be hidden. By default the column always is in visible state</td>
        </tr>        
        <tr>
            <td>width</td>
            <td>Number</td>
            <td>column width in pixels. By default the column always is in visible state</td>
        </tr>
        <tr>
            <td>format</td>
            <td>Function</td>
            <td>You can handle the display of a row value in a column by using a function that takes a row object as an argument. If the function is set it will be used when sorting and filtering the row data.</td>
        </tr>
    </tbody>
</table>


