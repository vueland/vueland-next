<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useBreakpoints } from '../vueland/src/composables/use-breakpoints'

export default defineComponent({
  setup() {
    const select = ref(null)
    const salam = ref<any>(null)
    const files = ref([{ name: 'simple file' }, { name: 'simple file' }, { name: 'simple file' }])
    const rows = ref([
      { name: 'oleg' },
      { name: 'Alex', email: 'aaa@mail.ru' },
      { name: 'John', email: 'bbb@mail.ru' },
      { name: 'Erick', email: 'ccc@mail.ru' },
      { name: 'Don', email: 'dddd@mail.ru' },
    ])
    setTimeout(() => salam.value = { name: 'oleg' }, 4000)
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

    const clickOutsideHandler = {
      handler: () => console.log('outside'),
    }

    const addRow = () => {
      salam.value = null
      // rows.value.push({ name: 'Dina', email: 'eeee@mail.ru' })
      //
      // files.value.pop()
    }

    const onUpdateTablePage = (page) => {
      console.log(page, 'page')
    }

    const onUpdateTableRowsCount = (count) => {
      console.log(count, 'count')
    }

    const breakpoints = useBreakpoints()

    watch(() => breakpoints, to => console.log(to), { deep: true })

    return {
      select,
      rows,
      cols,
      files,
      salam,
      addRow,
      onUpdateTablePage,
      onUpdateTableRowsCount,
      clickOutsideHandler,
    }
  },
})
</script>
<template>
  <v-layout column>
    <v-toolbar
      v-click-outside="clickOutsideHandler"
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
      class="elevation-2"
      :fixed="true"
      :on-hover="true"
    >
      <v-spacer class="py-7"/>
      <v-group
        class="px-1"
        prepend-icon="fas fa-boxes"
      >
        <template #header>
          <span>salam</span>
        </template>
        <v-list
          active
          multiple
          active-class="green white--text"
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
        active-class="green"
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
    <v-text-field
      label="salam"
      :rules="[val => !!val || 'required']"
    />
    <v-select
      v-model="salam"
      label="salam"
      :items="rows"
      value-key="name"
    ></v-select>

    <v-file-input
      v-model:value="files"
      label="load file"
      multiple
    />

    <v-row>
      <v-col>
        <v-data-table
          style="height: 900px"
          :cols="cols"
          :rows="rows"
          class="elevation-2"
          :header-options="{
            resizerColor: '#ffffff'
          }"
          :footer-options="{
            counts: {
              displayColor: 'orange',
              rowsPerPageText: 'кол-во строк'
            },
            // pagination: {
            //   buttonsColor: 'orange',
            //   displayColor: 'orange'
            // },
            // contentColor: '#ffffff'
          }"

          @update:page="onUpdateTablePage"
          @update:rows-count="onUpdateTableRowsCount"
        >
          <template #toolbar>
            <v-button @click="addRow">
              add
            </v-button>
          </template>
          <template #pagination-text="{start, last, length}">
            <span>{{ start }} - {{ last }} из {{ length }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-main>
</template>
