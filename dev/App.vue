<script lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { FaIcons } from '../src/services/icons'

export default {
  setup() {
    const data = reactive({
      always: true,
      show: false,
      test: true,
      login: '',
      email: '',
      password: '',
      user: '',
      checked: false,
      user2: { name: 'igor' },
      date: null,
      users: []
    })

    const fetchItems = () => {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => data.users = [...data.users, ...json])
    }

    fetchItems()

    setTimeout(() => {
      data.always = false
    }, 2000)

    watch(
      () => data.user,
      to => {
        console.log(to, 'watch')
      }, { immediate: true }
    )

    const toggleAlways = () => {
      data.always = !data.always
    }

    const testFunc = date => {
      console.log(date)
    }

    const forOut = computed(() => {
      return data.always ? testFunc : undefined
    })

    const cols = ref([
      {
        key: 'actions',
        title: 'Actions',
        align: 'center'
      },
      {
        key: 'name',
        title: 'Name',
        width: '250',
        resizeable: true,
        sortable: true,
        filterable: true,
        cellClass: 'red darken-3',
        filterClass: 'green darken-3',
        rowCellClass: 'red lighten-1',
        format: row => row.name,
        filter: ({ value, col }) => data.users.filter(user => user[col.key].includes(value))
      },
      {
        key: 'email',
        title: 'Email',
        resizeable: true,
        sortable: true,
        filterable: true,
        cellClass: 'green accent-3',
        filterClass: 'red',
        rowCellClass: 'green lighten-1',
        format: row => row.email
      },
      {
        key: 'body',
        title: 'Body',
        resizeable: true,
        sortable: true,
        filterable: true
      }
    ])

    const rows = [
      {
        name: 'Ben',
        email: 'ben@mail.ru',
        body: 'some body text'
      },
      {
        name: 'Alex',
        email: 'alex@mail.ru',
        body: 'some body text'
      }
    ]

    const addItem = () => {
      data.users.push({
        name: 'Anar',
        email: 'adsadasdasd',
        body: 'sdfsddfsdfsdfsf'
      })
    }

    return {
      data,
      cols,
      addItem,
      testFunc,
      toggleAlways,
      fetchItems,
      forOut,
      FaIcons
    }
  }
}
</script>

<template>
  <v-list>
    <v-list-group>
      <template #title>
        <v-list-item-title> salam</v-list-item-title>
      </template>
      <template #prependIcon>
        <v-icon
          icon="fas fa-book"
          size="18"
        />
      </template>
      <v-list-item @click.stop="testFunc">
        salam
      </v-list-item>
      <v-text-field label="Подъезд" />
      <v-text-field label="Этаж" />
      <v-text-field label="Домофон" />
    </v-list-group>
  </v-list>
  <v-checkbox
    v-model="data.checked"
    label="test"
  />
  <div
    class="table-wrap"
    style="height: 850px;"
  >
    <v-data-table
      :cols="cols"
      :rows="data.users"
      :rows-on-table="[25, 40, 50, 75]"
      :header-props="{
        contentColor: 'grey darken-3',
        color: 'grey lighten-1',
        dark: true
      }"
      :footer-props="{
        paginationButtonsColor: 'red darken-3',
        paginationText: 'Кол-во строк',
      }"
      align="left"
      numbered
      checkbox
      @checked="testFunc"
      @last-page="testFunc"
    >
      <template #paginationDisplay="{start, last, length}">
        <span>{{ start + '-' + last + ' из ' + length + ' строк' }}</span>
      </template>
      <template #actions>
        <v-button
          width="42"
          elevation="15"
          color="primary"
          @click="addItem"
        >
          <v-icon
            icon="add"
            color="white"
            size="16"
          />
        </v-button>
      </template>
      <template #email="{row, format}">
        <v-icon
          icon="account_circle"
          size="18"
          material
          :color="format(row).includes('h') ? 'red':'blue'"
        />
        <span :class="row.email.includes('z') ? 'red--text' : ''">{{ row.email }}</span>
      </template>
    </v-data-table>
  </div>


  <v-form
    v-slot="{ validate }"
    style="display: block; margin: 20px; width: 400px"
  >
    <v-date-picker
      v-model:value="data.date"
      lang="en"
      label="set date"
      color="#ffffff"
      content-color="#171717"
      format="dd.mm.yyyy"
      elevation="15"
      :rules="[val => !!val || 'Required']"
      use-mls
      clearable
      prepend-icon="event"
      monday-first
      @selected="testFunc"
    />
    <v-text-field
      v-model="data.password"
      label="teal"
      autocomplete="new-password"
      prepend-icon="map"
      clearable
      :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
    />
    <v-select
      v-model="data.user2"
      label="select"
      :items="data.users"
      value-key="name"
      readonly
      clearable
      prepend-icon="search"
      :rules="[v => !!v || 'required']"
    />
    <v-autocomplete
      v-model:value="data.user"
      label="autocomplete"
      :items="data.users"
      value-key="name"
      clearable
      prepend-icon="search"
      :rules="[v => !!v || 'required']"
      @select="testFunc"
    />
    <v-button
      label="click"
      :disabled="false"
      color="blue darken-3"
      @click="() => cols[0].show = false"
    />
  </v-form>

  <v-form>
    <v-card
      v-if="!data.show"
      elevation="5"
    >
      <v-resize right />
      <v-resize bottom />
      <v-resize top />
      <v-resize left />
      <v-card-title>
        <span
          style="display: block; width: 55px; height: 55px; border-radius: 50px"
          class="v-loading v-loading--dynamic"
        ></span>
      </v-card-title>
      <v-card-content>
        <div style="width: 100%">
          <div
            style="display: flex; align-items: center"
            class="v-loading--dynamic"
          >
            <span
              style="
                width: 40px;
                height: 40px;
                border-radius: 50px;
                margin-right: 10px;
              "
              class="v-loading"
            ></span>
            <span
              style="display: block; height: 25px"
              class="v-loading"
            >some little text</span>
          </div>
          <span
            style="display: block; width: 100%; margin: 15px 0; height: 25px"
            class="v-loading v-loading--dynamic"
          ></span>
          <span
            style="display: block; width: 100%; margin: 15px 0; height: 25px"
            class="v-loading v-loading--dynamic"
          ></span>
          <span
            style="display: block; width: 100%; margin: 15px 0; height: 25px"
            class="v-loading v-loading--dynamic"
          ></span>
          <span
            style="display: block; width: 100%; margin: 15px 0; height: 25px"
            class="v-loading v-loading--dynamic"
          ></span>
          <span
            style="display: block; width: 100%; margin: 15px 0; height: 25px"
            class="v-loading v-loading--dynamic"
          ></span>
        </div>
      </v-card-content>
    </v-card>

    <v-card
      v-if="data.show"
      elevation="5"
    >
      <v-card-title>
        <span style="">Testting header</span>
        <v-checkbox label="test" />
      </v-card-title>
      <v-card-content>
        <span style="display: block">some little text</span>
        <span style="display: block">some little text</span>
        <span style="display: block">some little text</span>
        <span style="display: block">some little text</span>
        <span style="display: block">some little text</span>
      </v-card-content>
    </v-card>
  </v-form>
  <teleport to="#modal">
    <v-modal
      v-model="data.show"
      overlay
      transition="scale-in"
    >
      <v-card color="blue darken-2">
        <v-card-title> test</v-card-title>
        <v-card-content> salam</v-card-content>
        <v-card-actions>
          <v-button
            label="click"
            @click="data.show = !data.show"
          />
        </v-card-actions>
      </v-card>
    </v-modal>
  </teleport>

  <v-badge
    color="blue darken-3"
    border
    right
  >
    <template #badge>
      <span>2</span>
    </template>
    <v-tooltip
      color="blue darken-3"
      top
      offset-y="-12"
      min-width="250"
    >
      <template #activator="{ on }">
        <v-button
          elevation="3"
          style="margin-right: 10px;"
          label="toggle"
          color="blue"
          v-on="on"
          @click="data.show = !data.show"
        />
      </template>
      <span>button</span>
    </v-tooltip>
  </v-badge>
</template>

<style lang="scss">
.active-class {
  background: #272727;
  color: white !important;
}

.wrap {
  position: absolute;
  left: 60px;
  top: 60px;
  width: calc(100% - 60px);
  height: calc(100vh - 60px);
}

.app {
  &-header {
    width: 100%;
    height: 60px;
    background: #272727;
  }

  &-sidebar {
    position: absolute;
    top: 60px;
    left: 0;
    width: 60px;
    height: calc(100vh - 60px);
    background: #272727;
  }
}

.text {
  display: inline-block;
}

.test {
  display: flex;
  justify-content: center;
  width: 100%;
}

.v-data-table {
  background-color: yellow;
}

.v-data-table > .v-data-table__inner > .v-data-table__header {
  background-color: #0D47A1 !important;
  border-color: red !important;
}

body {
  font-family: Bitstream Charter, sans-serif !important;
}
</style>
