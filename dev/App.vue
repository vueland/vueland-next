<script lang="ts">
import { h, reactive, ref, computed, watch } from 'vue'
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
      checked: [],
      user2: { name: 'igor' },
      user3: { name: 'kirill' },
      date: null,
      loading: false,
      circular: 10,
      title: 'cat',
      users: [
        // {name: 'AAA', email: 'aaa@mail.ru', body: 'fsdf adfasda dasdasd'},
        // {name: 'AAA', email: 'aaa@mail.ru', body: 'fsdf adfasda dasdasd'},
      ],
      positionX: 0,
      positionY: 0,
      isOpen: false
    })

    // watch(() => data.password, () => console.log(data.password))

    const showMenu = (e) => {
      e.preventDefault()

      data.positionX = e.clientX
      data.positionY = e.clientY

      requestAnimationFrame(() => data.isOpen = true)
    }

    const onClickLoading = (validate) => {
      validate().then(() => {
        data.loading = true
        setTimeout(() => data.loading = false, 2000)
      })
    }

    const addCircular = () => {
      if (data.circular < 100) {
        return data.circular += Math.ceil(Math.random() * 100) / 2
      }
      data.circular -= Math.ceil(Math.random() * 100)
    }

    const fetchItems = () => {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => setTimeout(() => {
          data.users = [...data.users, ...json]
        }, 5000))
    }

    fetchItems()

    setTimeout(() => {
      data.always = false
    }, 2000)

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
        cellClass: '',
        filterClass: '',
        rowCellClass: '',
        format: row => row.name,
        filter: ({ value, col }) => data.users.filter(user => user[col.key].includes(value))
        // sort: (a, b) => console.log(a, b),
      },
      {
        key: 'email',
        title: 'Email',
        width: '250',
        resizeable: true,
        sortable: true,
        filterable: true,
        cellClass: 'green darken-3 white--text',
        filterClass: 'grey lighten-2',
        rowCellClass: 'green lighten-1 white--text',
        format: row => row.email
      },
      {
        key: 'body',
        title: 'Body',
        width: '250',
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

    const disabledDates = {
      // from: new Date(2021, 4, 2),
      // to: new Date(2021, 4, 10),
      days: [0, 6],
      // daysOfMonth: [29, 30, 31],
      // dates: [
      //   new Date(2021, 6, 14),
      //   new Date(2021, 6, 15),
      //   new Date(2021, 6, 16),
      // ],
      // ranges: [{
      //   from: new Date(2021, 4, 25),
      //   to: new Date(2021, 5, 10),
      // }, {
      //   from: new Date(2021, 6, 12),
      //   to: new Date(2021, 7, 25),
      // }],
      custom: (date) => !(date.date % 2)
    }

    return {
      data,
      cols,
      disabledDates,
      forOut,
      FaIcons,
      addItem,
      testFunc,
      toggleAlways,
      onClickLoading,
      addCircular,
      showMenu
    }
  }
}
</script>

<template>
  <v-app>
    <div>
      <v-progress-linear height="7" />
      <v-progress-circular
        color="cyan darken-3"
        :value="data.circular"
        size="100"
        width="5"
        rotate="270"
        @click="addCircular"
      >
        {{ Number(data.circular).toFixed(1) }}%
      </v-progress-circular>
      <v-progress-circular
        color="orange darken-3"
        :value="data.circular / 2"
        size="100"
        rotate="-90"
        width="15"
      >
        {{ Number(data.circular / 2).toFixed(1) }}%
      </v-progress-circular>
      <v-progress-circular
        color="red darken-3"
        :value="data.circular / 4"
        size="100"
        rotate="-90"
        width="15"
      >
        {{ Number(data.circular / 4).toFixed(1) }}%
      </v-progress-circular>
    </div>
    <div>
      <v-progress-circular
        color="cyan darken-3"
        size="25"
        width="3"
        indeterminate
      />
      <v-progress-circular
        color="red darken-2"
        size="35"
        width="4"
        indeterminate
      />
      <v-progress-circular
        color="green accent-4"
        size="45"
        width="6"
        indeterminate
      />
    </div>
    <v-list>
      <v-list-item
        active-class="primary--text"
        active
      >
        <v-list-item-title>
          salam
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list
      style="width: 350px"
    >
      <v-list-group
        elevation="4"
        color="cyan accent-3"
        class="grey darken-4"
        active-class="active-now"
        dark
        expanded
        group="main"
      >
        <template #title>
          <v-list-item-content>
            <v-list-item-title>
              Google Maps Api
            </v-list-item-title>
            <v-list-item-sub-title>
              open the best countries
            </v-list-item-sub-title>
          </v-list-item-content>
        </template>
        <template #prependIcon>
          <v-icon
            icon="map"
            size="18"
          />
        </template>
        <v-list-item>
          <v-list-item-icon>
            <v-icon
              icon="place"
              size="18"
            />
          </v-list-item-icon>
          <v-list-item-title>
            Baku
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon
              icon="place"
              size="18"
            />
          </v-list-item-icon>
          <v-list-item-title>
            Tashkent
          </v-list-item-title>
        </v-list-item>
        <v-list-group
          sub-group
          group="sub-main"
          color="amber accent-3"
          dark
          @click="testFunc"
        >
          <template #appendIcon>
            <v-icon
              icon="flag"
              size="18"
              color="cyan accent-3"
            />
          </template>
          <template #title>
            <v-list-item-title>Azerbaijan</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-icon>
              <v-icon
                icon="place"
                size="18"
              />
            </v-list-item-icon>
            <v-list-item-title>
              Baku
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon
                icon="place"
                size="18"
              />
            </v-list-item-icon>
            <v-list-item-title>Ganja</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon
                icon="place"
                size="18"
              />
            </v-list-item-icon>
            <v-list-item-title>Sheki</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <v-form>
      <v-checkbox
        v-model="data.checked"
        :label="data.user2.name"
        validate
        :value="data.user2"
      />
      <v-checkbox
        v-model="data.checked"
        :label="data.user3.name"
        validate
        :value="data.user3"
      />
    </v-form>
    <div
      class="table-wrap"
      style="height: 850px; padding: 10px;"
    >
      <v-data-table
        :cols="cols"
        :rows="data.users"
        color="grey darken-2"
        :header-options="{
          color: 'grey darken-4'
        }"
        :footer-options="{
          pagination: {
            buttonsColor: '',
            displayColor: ''
          },
          color: 'blue darken-3',
          rowsPerPageOptions: [25, 40, 50, 75],
          rowsPerPageText: 'Кол-во строк',
        }"
        dark
        align="left"
        class="elevation-10"
        show-sequence
        show-checkbox
        @select:row="testFunc"
        @click:row="testFunc"
        @dblclick:row="testFunc"
        @contextmenu:row="testFunc"
        @last-page="testFunc"
      >
        <!--      <template #header="props">-->
        <!--        <span-->
        <!--          v-for="col in props.cols"-->
        <!--          :style="{width: `${col.width}px`}"-->
        <!--        >-->
        <!--          {{ col.title }}-->
        <!--        </span>-->
        <!--      </template>-->
        <template #paginationText="{start, last, length}">
          <span>{{ start + ' - ' + last + ' из ' + length + ' строк' }}</span>
        </template>

        <template #name-filter="{filter}">
          <div
            class="filter-wrap blue darken-4"
            style="padding: 10px"
          >
            <v-text-field
              dark
              @input="filter"
            />
          </div>
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
      style="display: block; margin: 20px; width: 25%"
    >
      <v-date-picker
        v-model="data.date"
        lang="en"
        label="set date"
        format="dd MMM yyyy D"
        elevation="15"
        prepend-icon="event"
        :rules="[val => !!val || 'Required']"
        clearable
        color="grey darken-4"
        content-color="pink lighten-3"
        monday-first
        :disabled-dates="disabledDates"
        @selected="testFunc"
      >
        <template #date="{date, isHoliday}">
          <div
            :class="[isHoliday? 'grey--text text--darken-2' : 'white--text']"
            :style="{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }"
          >
            <span style="font-size: .9rem; font-weight: 500;">{{ date }}</span>
            <v-icon
              :icon="isHoliday ? 'home' : 'done'"
              size="10"
              style="position: absolute; top: 0; left: 0"
            />
          </div>
        </template>
      </v-date-picker>
      <v-text-field
        v-model="data.password"
        label="teal"
        autocomplete="new-password"
        prepend-icon="map"
        clearable
        :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
      />
      <v-text-field
        v-model="data.title"
        label="teal"
        autocomplete="new-password"
        prepend-icon="map"
        clearable
        :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
      />
      <v-text-field
        v-model="data.email"
        label="teal"
        autocomplete="new-password"
        prepend-icon="map"
        clearable
        :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
      />
      <v-text-field
        v-model="data.login"
        label="teal"
        autocomplete="new-password"
        prepend-icon="map"
        clearable
        :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"

      />
      <v-select
        v-model="data.user2"
        label="select"
        value-key="name"
        clearable
        prepend-icon="search"
        :items="data.users"
        :rules="[v => !!v || 'required']"
      />
      <v-autocomplete
        label="autocomplete"
        value-key="name"
        clearable
        typeable
        prepend-icon="search"
        :items="data.users"
        :rules="[v => !!v || 'required']"
        @select="testFunc"
        @input="$event => data.users = data.users.filter(u => u.name.includes($event))"
      />
      <v-button
        :disabled="false"
        :loading="data.loading"
        label="hello"
        color="blue darken-4"
        rounded
        width="150"
        elevation="4"
        @click="onClickLoading(validate)"
      >
        <template #loading>
          <span>loading...</span>
        </template>
        <v-icon
          size="25"
          icon="settings"
        />
      </v-button>
    </v-form>

    <v-form>
      <v-card
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
    </v-form>
    <div
      class="block"
      style="display: flex;"
    >
      <v-card
        v-for="it in 4"
        :key="it"
        elevation="10"
        style="margin: 20px;"
        @contextmenu="showMenu"
      >
        <img
          src="https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkPGSRVI_2X7nqC2oTGvMWj6aKTM5SRkZCeTgDn6uOyic"
          alt=""
          style="width: 100%"
        >
        <v-card-title>
          <v-icon
            icon="pets"
            size="18"
            color="blue lighten-2"
          />
          <span style="margin-left: 10px">{{ data.title }}</span>
        </v-card-title>
        <v-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi, consectetur dolorum iure praesentium
          reprehenderit sint ut vero. Accusamus, aperiam et impedit in ipsam obcaecati possimus quasi reiciendis rerum
          veniam.
        </v-card-content>
        <v-card-actions>
          <v-button
            label="support"
            text
            color="blue"
          />
        </v-card-actions>
      </v-card>
      <v-menu
        v-model="data.isOpen"
        :position-x="data.positionX"
        :position-y="data.positionY"
        width="200"
        absolute
        open-on-click
        @close="data.isOpen = false"
      >
        <div
          class="grey lighten-5 elevation-10"
        >
          <v-list>
            <v-list-group no-action color="primary">
              <v-list-item
                @click="data.title = 'Panter'"
              >
                <template #default="{active}">
                  <v-list-item-icon>
                    <v-icon
                      icon="account_circle"
                      size="18"
                    />
                  </v-list-item-icon>
                  <v-list-item-title>
                    Panter {{ active }}
                  </v-list-item-title>
                </template>
              </v-list-item>
              <v-list-item @click="data.title = 'Rice'">
                <template #default="{active}">
                  <v-list-item-title>
                    Rice {{ active }}
                  </v-list-item-title>
                </template>
              </v-list-item>
            </v-list-group>
          </v-list>
        </div>
      </v-menu>
    </div>
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
            color="red"
            v-on="on"
            @click="data.show = !data.show"
          />
        </template>
        <span>button</span>
      </v-tooltip>
    </v-badge>
  </v-app>
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
