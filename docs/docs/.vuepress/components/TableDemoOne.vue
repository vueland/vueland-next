<template>
  <div class="table-wrap" style="width: 100%;">
    <v-data-table
      :cols="cols"
      :rows="rows"
      class="elevation-5"
      show-sequence
      show-checkbox
    />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'table-demo-one',
    setup() {
      const cols = [
        { key: 'name', title: 'Name', sortable: true, filterable: true, resizable: true },
        { key: 'age', title: 'Age', sortable: true, filterable: true },
      ]
      const rows = [
        { name: 'Alex', age: 25 },
        { name: 'Ben', age: 15 },
        { name: 'Yan', age: 27 },
        { name: 'Zyan', age: 29 },
        { name: 'Giga', age: 27 },
        { name: 'Mari', age: 26 },
        { name: 'Demis', age: 23 },
      ]

      return {
        cols, rows,
      }
    },
  })
</script>