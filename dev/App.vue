<script lang="ts">
  import { reactive, computed, watch } from 'vue'
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
        user: { name: 'igor' },
        checked: false,
        user2: { name: '', age: 25 },
        date: null,
        users: [],
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
        () => data.date,
        to => {
          console.log(to)
        },
      )

      const toggleAlways = () => {
        data.always = !data.always
      }

      const testFunc = date => {
        console.log(date, data)
      }

      const forOut = computed(() => {
        return data.always ? testFunc : undefined
      })

      const cols = [
        {
          key: 'name',
          title: 'Name',
          resizeable: true,
          sortable: true,
          filterable: true,
        },
        // {
        //   key: 'username',
        //   title: 'User Name',
        //   resizeable: true,
        //   sortable: true,
        //   filterable: true,
        //   width: 155,
        // },
        {
          key: 'email',
          title: 'Email',
          resizeable: true,
          sortable: true,
          filterable: true,
        },
        {
          key: 'body',
          title: 'Body',
          resizeable: true,
          sortable: true,
          filterable: true,
          // format: row => `${row.address.city} ${row.address.street}`,
        }
        // {
        //   key: 'phone',
        //   title: 'Phone',
        //   resizeable: true,
        //   sortable: true,
        //   filterable: true,
        // },
        // {
        //   key: 'website',
        //   title: 'Website',
        //   resizeable: true,
        //   sortable: true,
        //   filterable: true,
        // },
        // {
        //   key: 'company',
        //   title: 'Company',
        //   resizeable: true,
        //   sortable: true,
        //   filterable: true,
        //   format: row => row.company.name,
        // }
      ]

      const addItem = () => {
        data.users.push({
          name: 'Anar',
          email: 'adsadasdasd',
          body: 'sdfsddfsdfsdfsf'
        })
        console.log(data.users)
      }

      return {
        data,
        cols,
        addItem,
        testFunc,
        toggleAlways,
        // fetchItems,
        forOut,
        FaIcons,
      }
    },
  }
</script>

<template>
  <v-list>
    <v-list-group @click="testFunc">
      <template v-slot:title>
        <v-list-item-title> salam</v-list-item-title>
      </template>
      <template v-slot:prependIcon>
        <v-icon icon="fas fa-book" size="18"/>
      </template>
      <v-list-item @click.stop="testFunc">salam</v-list-item>
      <v-list-group sub-group no-action>
        <template v-slot:title>
          <v-list-item-title>salam</v-list-item-title>
        </template>
      </v-list-group>
    </v-list-group>
  </v-list>
  <v-checkbox label="test" v-model="data.checked"/>
  <v-data-table
    :cols="cols"
    :rows="data.users"
    class="elevation-5"
    :rows-on-table="[25, 40, 50, 75]"
    style="margin: 10px;"

    toolbar
    numbered
    checkbox

    @filter="testFunc"
    @checked="testFunc"

    @cols-settings="testFunc"
  >
    <template v-slot:address="{ row, format }">
      <v-icon icon="fas fa-envelope" size="12" :color="format(row).includes('h') ? 'red':'blue'"/>
      <span style="margin-left: 15px">{{ format(row) }}</span>
    </template>
    <template v-slot:toolbar>
      <v-button width="42" color="primary" elevation="5" @click="addItem">
        <v-icon :icon="FaIcons.$add" color="white" size="16" />
      </v-button>
    </template>
  </v-data-table>

  <v-form
    v-slot="{ validate }"
    style="display: block; margin: 20px; width: 400px"
  >
    <v-date-picker
      v-model:value="data.date"
      lang="en"
      label="set date"
      color="amber accent-3"
      content-color="grey darken-4"
      elevation="15"
      :rules="[val => !!val || 'Required']"
      readonly
      use-mls
      clearable
      prepend-icon="fas fa-calendar"
      monday-first
    />
    <v-text-field
      label="teal"
      autocomplete="new-password"
      prepend-icon="fas fa-map-marked-alt"
      v-model="data.password"
      clearable
      :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
    />
    <v-select
      label="select"
      v-model="data.user2"
      :items="[]"
      value-key="name"
      readonly
      typeable
      prepend-icon="fas fa-search"
      :rules="[v => !!v || 'required']"
      @input="testFunc"
    />
    <v-button
      label="click"
      :disabled="false"
      color="blue darken-3"
      @click="validate"
    />
  </v-form>

  <v-form>
    <v-card v-if="!data.show" elevation="5">
      <v-resize right/>
      <v-resize bottom/>
      <v-resize top/>
      <v-resize left/>
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
            <span style="display: block; height: 25px" class="v-loading"
            >some little text</span
            >
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

    <v-card v-if="data.show" elevation="5">
      <v-card-title>
        <span style="">Testting header</span>
        <v-checkbox label="test"/>
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
    <v-modal v-model="data.show" overlay transition="scale-in">
      <v-card color="blue darken-2">
        <v-card-title> test</v-card-title>
        <v-card-content> salam</v-card-content>
        <v-card-actions>
          <v-button label="click" @click="data.show = !data.show"/>
        </v-card-actions>
      </v-card>
    </v-modal>
  </teleport>

  <v-badge color="blue darken-3" border right>
    <template v-slot:badge>
      <span>2</span>
    </template>
    <v-tooltip color="blue darken-3" right offset-x="12" min-width="250">
      <template v-slot:activator="{ on }">
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
</style>
