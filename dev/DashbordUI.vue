<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const select = ref(null)
    const rows = ref([
      {name: 'Alex', email: 'aaa@mail.ru'},
      {name: 'John', email: 'bbb@mail.ru'},
      {name: 'Erick', email: 'ccc@mail.ru'},
      {name: 'Don', email: 'dddd@mail.ru'},
    ])
    const cols = ref([
      {
        key: 'actions',
        title: 'Actions',
        align: 'center',
      },
      {
        key: 'name',
        title: 'Name',
        width: '500',
        resizeable: true,
        sortable: true,
        filterable: true,
        format: row => row.name,
      },
      {
        key: 'email',
        title: 'Email',
        width: '250',
        resizeable: true,
        sortable: true,
        filterable: true,
        format: row => row.email,
      },
    ])

    const addRow = () => {
      rows.value.push({name: 'Dina', email: 'eeee@mail.ru'})
      console.log(rows.value)
    }

    watch(select, to => console.log(to))

    return {
      select,
      rows,
      cols,
      addRow
    }
  }
})
</script>
<template>
  <v-layout column>
    <v-toolbar
      class="elevation-3"
      fixed
    >
      <v-toolbar-content>
        <v-toolbar-nav-btn></v-toolbar-nav-btn>
        <v-toolbar-logo></v-toolbar-logo>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          ITEM1
        </v-toolbar-items>
      </v-toolbar-content>
    </v-toolbar>
    <v-navigation
      offset-top="56"
      class="elevation-2"
      fixed
      on-hover
    >
      <v-group
        class="px-1"
        prepend-icon="fas fa-boxes"
        color="red"
      >
        <template #header>
          <span>salam</span>
        </template>
        <v-list
          active
        >
          <v-list-item
            v-for="it in 7"
            :key="it"
            class="px-1"
          >
            <v-list-item-icon>
              <v-icon>
                fas fa-atlas
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                item {{ it }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-group>
      <v-list
        active
      >
        <v-list-item
          v-for="it in 7"
          :key="it"
          class="px-1"
        >
          <v-list-item-icon>
            <v-icon>
              fas fa-atlas
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              item {{ it }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation>
  </v-layout>
  <v-main
    style="padding: 66px 10px 10px 66px"
  >
    <v-row>
      <v-col>
        <v-data-table
          :cols="cols"
          :rows="rows"
          style="height: 300px"
        >
          <template #toolbar>
            <v-button @click="addRow">
              add
            </v-button>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-main>
</template>
