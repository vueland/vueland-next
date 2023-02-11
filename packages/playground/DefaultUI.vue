<script lang="ts">
  import { reactive, ref, computed, inject, watch } from 'vue'
  import { FaIcons } from '../vueland/src/services/icons'
  import { useTheme } from '../vueland/src/composables/use-theme'

  export default {
    setup() {
      const data = reactive({
        always: true,
        show: false,
        test: true,
        login: '',
        email: '',
        title: 0,
        password: '',
        user: '',
        checked: [],
        user2: { name: 'igor', car: { brand: 'bmw' } },
        user3: { name: 'kirill' },
        date: null,
        loading: false,
        circular: 10,
        users: [],
        positionX: 0,
        positionY: 0,
        selected: 0,
        isOpen: false,
      })

      setTimeout(() => {
        data.users.push(
          { name: 'AAA', car: { brand: 'mercedes' }, email: 'sade@mail.ru', body: 'best practice' },
          { name: 'BBB', car: { brand: 'audi' }, email: 'aaa@mail.ru', body: 'javascript' },
        )
      }, 4000)

      const $v_breakpoints = inject('$v_breakpoints', {} as any)
      const { setTheme } = useTheme()

      watch($v_breakpoints, () => {
        if ($v_breakpoints.current === 'sm') {
          setTheme({ primary: '#fa5a5a' })
        } else {
          setTheme({ primary: '#147eef' })
        }
      }, { deep: true, immediate: true })

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

      const onRowsUpdate = ({ page }) => {
        if (page.value >= 3) {
          page.value = 1
        }
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
          .then(() => setTimeout(() => {
            return data.users
          }, 500))
      }

      fetchItems()

      setTimeout(() => {
        data.always = false
      }, 2000)

      const toggleAlways = () => {
        data.always = !data.always
      }

      const testFunc = data => {
        console.log(data, 'test func data')
        data.date = data
      }

      const forOut = computed(() => {
        return data.always ? testFunc : undefined
      })

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
          filter: ({ value, col }) => {
            console.log(value, col)
            return data.users.filter(user => user[col.key].includes(value))
          },
          // sort: (a, b) => console.log(a, b),
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
        {
          key: 'body',
          title: 'Body',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
        },
      ])

      // const rows = [
      //   {
      //     name: 'Ben',
      //     email: 'ben@mail.ru',
      //     body: 'some body text'
      //   },
      //   {
      //     name: 'Alex',
      //     email: 'alex@mail.ru',
      //     body: 'some body text'
      //   }
      // ]

      const addItem = () => {
        data.users.push({
          name: 'Anar',
          car: { brand: 'tesla' },
          email: 'adsadasdasd',
          body: 'sdfsddfsdfsdfsf',
        })
      }

      data.user = data.users[0]

      const disabledDates = {
        // from: new Date(2021, 4, 2),
        // to: new Date(2021, 4, 10),
        days: [ 0, 6 ],
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
        custom: (date) => !(date.date % 2),
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
        showMenu,
        onRowsUpdate
      }
    },
  }
</script>

<template>
  <v-app>
    <div>
      <v-chip
        @click="testFunc({date: 'click'})"
        @close="testFunc({date: 'close'})"
      >
        <span>click checker</span>
      </v-chip>
      <v-chip
        @click="testFunc({date: 'click'})"
        @close="testFunc({date: 'close'})"
      >
        <span>click checker</span>
      </v-chip>
      <v-layout column>
        <v-checkbox
          v-for="it in cols"
          :key="it.title"
          v-model="cols"
          :value="it"
          :label="it.title"
        />
        <v-group
          class="elevation-3"
          title="open subgroup"
          prepend-icon="fas fa-biking"
        >
          <v-group
            subgroup
            append-icon="fas fa-biking"
          >
            <template #header>
              <span>Salam</span>
            </template>
            <v-list
              v-model:value="data.selected"
              active
              active-class="red darken-1 white--text"
              text-color="#171717"
            >
              <v-list-item
                v-for="it in 6"
                :key="it"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    item number {{ it }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-group>
        </v-group>
        <v-row>
          <v-col cols="12">
            <v-skeleton
              class="my-2"
              height="30"
              color="grey darken-2"
            />
            <v-skeleton
              class="my-2"
              height="30"
              color="grey lighten-2"
            />
            <v-skeleton
              class="my-2"
              height="30"
              color="grey lighten-2"
            />
            <v-skeleton
              class="my-2"
              height="30"
              color="green darken-2"
              origin="center"
              dynamic
            />
            <v-skeleton
              class="my-2"
              height="30"
              color="grey darken-2"
              dynamic
            />
            <v-skeleton
              class="my-2"
              height="30"
              color="grey darken-2"
              dynamic
            />
            <v-skeleton
              class="my-2"
              height="100"
              width="100"
              radius="100"
            />
          </v-col>
        </v-row>
        <v-row class="my-5">
          <v-col
            cols="12"
          >
            <v-progress-linear
              height="7"
              value="75"
              indeterminate
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="it in 4"
            :key="it"
            xl="3"
            lg="6"
            md="12"
            sm="12"
          >
            <v-card
              elevation="10"
              width="100%"
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi, consectetur dolorum iure
                praesentium
                reprehenderit sint ut vero. Accusamus, aperiam et impedit in ipsam obcaecati possimus quasi reiciendis
                rerum
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
          </v-col>
        </v-row>
        <v-row class="py-10">
          <v-col
            cols="4"
            class="d-flex justify-center align-center"
          >
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
              color="cyan darken-3"
              size="25"
              width="3"
              indeterminate
            />
          </v-col>
          <v-col
            cols="4"
            class="d-flex justify-center align-center"
          >
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
              color="red darken-2"
              size="35"
              width="4"
              indeterminate
            />
          </v-col>
          <v-col
            cols="4"
            class="d-flex justify-center align-center"
          >
            <v-progress-circular
              color="red darken-3"
              :value="data.circular / 4"
              size="100"
              rotate="-90"
              width="15"
            >
              {{ Number(data.circular / 4).toFixed(1) }}%
            </v-progress-circular>
            <v-progress-circular
              color="green accent-4"
              size="45"
              width="6"
              indeterminate
            />
          </v-col>
        </v-row>
      </v-layout>
    </div>
    <div
      class="table-wrap"
      style="padding: 10px;"
    >
      <v-data-table
        :cols="cols"
        :rows="data.users"
        :header-options="{
          color: '',
          contentColor: ''
        }"
        :footer-options="{
          pagination: {
            buttonsColor: '',
            displayColor: '',
            disableIf: false,
          },
          counts: {
            rowsPerPageText: 'Кол-во строк',
            totalRows: 125
          },
          color: '',
          contentColor: '',
        }"

        align="left"
        class="elevation-10"
        show-sequence
        show-checkbox
        @update:rows="onRowsUpdate"
        @select:row="testFunc"
        @dblclick:row="testFunc"
        @contextmenu:row="testFunc"
      >
        <!--              <template #header="props">-->
        <!--                <span-->
        <!--                  v-for="col in props.cols"-->
        <!--                  :style="{width: `${col.width}px`}"-->
        <!--                >-->
        <!--                  {{ col.title }}-->
        <!--                </span>-->
        <!--              </template>-->
        <template #pagination-text="{start, last, length}">
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


    <v-row>
      <v-col
        xl="3"
        lg="6"
        md="9"
        sm="12"
      >
        <v-form
          v-slot="{ validate }"
          style="display: block; margin: 20px;"
        >
          <v-date-picker
            lang="ru"
            label="set date"
            format="dd.MM.yyyy D"
            elevation="15"
            prepend-icon="fas fa-calendar-alt"
            :rules="[val => !!val || 'Required', val => val.length > 5 || 'Required to be 5 symbols']"
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
            label="password"
            autocomplete="new-password"
            clearable
            color="green darken-2"
            :rules="[v => !!v || 'required', v => v.length > 10 || 'more than 10']"
          />
          <v-text-field
            v-model="data.title"
            label="title"
            autocomplete="new-password"
            prepend-icon="fa at"
            clearable
            :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
          >
            <template #append-icon>
              <v-icon>fas fa-eye-slash</v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="data.email"
            label="email"
            autocomplete="new-password"
            prepend-icon="fas fa-at"
            clearable
            :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
          />
          <v-text-field
            v-model="data.login"
            label="teal"
            autocomplete="new-password"
            prepend-icon="fas fa-envelop"
            clearable
            :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
          />
          <v-select
            v-model="data.user"
            label="select"
            value-key="email"
            prepend-icon="search"
            style="margin-top: 10px;"
            :items="data.users"
            :loading="!data.users.length"
            :rules="[v => !!v || 'required']"
          />
          <v-autocomplete
            v-model:value="data.user"
            label="autocomplete"
            value-key="car.brand"
            clearable
            typeable
            prepend-icon="search"
            :items="data.users"
            :loading="!data.user"
            @select="testFunc"
            @input="$event => data.users = data.users.filter(u => u.name.includes($event))"
          />
          <v-button
            label="test"
            color="blue darken-2"
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
      </v-col>
    </v-row>

    <v-form>
      <v-card
        elevation="5"
        color="white"
      >
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
      <v-menu
        v-model="data.isOpen"
        :position-x="data.positionX"
        :position-y="data.positionY"
        width="200"
        absolute
        open-on-click
        @hide="data.isOpen = false"
      >
        <div
          class="grey lighten-5 elevation-10"
        >
          <v-list
            v-model:value="data.title"
            active
          >
            <v-list-item>
              <template #default="{active}">
                <v-list-item-title>
                  Panter {{ active }}
                </v-list-item-title>
              </template>
            </v-list-item>
            <v-list-item>
              <template #default="{active}">
                <v-list-item-title>
                  Rice {{ active }}
                </v-list-item-title>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </div>
    <teleport to="#modal">
      <v-modal
        v-model="data.show"
        overlay
        close-on-click
        transition="scale-in"
      >
        <v-card
          color="blue darken-2"
          elevation="14"
        >
          <v-card-title>test</v-card-title>
          <v-card-content>salam</v-card-content>
          <v-card-actions>
            <v-button
              label="click"
              elevation="4"
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
            class="mr-3"
            elevation="3"
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

  body {
    font-family: Bitstream Charter, sans-serif !important;
  }
</style>
