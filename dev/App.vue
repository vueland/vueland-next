<script lang="ts">
  import { reactive, computed, watch } from 'vue'

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
        checked: [],
        user2: { name: 'alyona' },
        date: new Date(),
      })

      setTimeout(() => {
        data.always = false
      }, 2000)

      watch(() => data.checked, to => {
        console.log(to)
      })

      const toggleAlways = () => {
        data.always = !data.always
      }

      const testFunc = () => {
        data.date = new Date(2019, 5, 4)
        console.log('tested')
      }

      const forOut = computed(() => {
        return data.always ? testFunc : undefined
      })

      const items = [
        { name: 'Alex', age: 24 },
        { name: 'Andrew', age: 24 },
        { name: 'Nikol', age: 24 },
        { name: 'Anna', age: 24 },
      ]

      return {
        data,
        items,
        testFunc,
        toggleAlways,
        forOut,
      }
    },
  }
</script>

<template>
  <v-list>
    <v-list-group @click="testFunc">
      <template v-slot:title>
        <v-list-item-title>
          salam
        </v-list-item-title>
      </template>
      <template v-slot:prependIcon>
        <v-icon icon="fas fa-book" size="18"/>
      </template>
      <v-list-item @click.stop="testFunc">salam</v-list-item>
      <v-list-group sub-group>
        <template v-slot:title>
          <v-list-item-title>salam</v-list-item-title>
        </template>
      </v-list-group>
    </v-list-group>
  </v-list>

  <v-datepicker
    color="grey darken-4"
    lang="ru"
    dark
    elevation="4"
    :value="new Date(2019, 7, 25)"
  />
  <v-form v-slot="{ validate }">
    <v-text-field
      label="teal"
      color="blue darken-3"
      :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
    />
    <v-button label="click" color="blue darken-3" @click="validate"/>
  </v-form>

  <v-form>
    <v-card v-if="!data.show" elevation="5">
      <v-resize right/>
      <v-resize bottom/>
      <v-resize top/>
      <v-resize left/>
      <v-card-title>
        <span
          style="display: block; width: 55px; height: 55px; border-radius: 50px;"
          class="v-loading v-loading--dynamic"></span>
      </v-card-title>
      <v-card-content>
        <div style="width: 100%;">
          <div style="display: flex; align-items: center;" class="v-loading--dynamic">
            <span style="width: 40px; height: 40px; border-radius: 50px; margin-right:10px;" class="v-loading"></span>
            <span style="display: block; height: 25px;" class="v-loading">some little text</span>
          </div>
          <span style="display: block; width: 100%; margin: 15px 0; height: 25px;"
                class="v-loading v-loading--dynamic"></span>
          <span style="display: block; width: 100%; margin: 15px 0; height: 25px;"
                class="v-loading v-loading--dynamic"></span>
          <span style="display: block; width: 100%; margin: 15px 0; height: 25px;"
                class="v-loading v-loading--dynamic"></span>
          <span style="display: block; width: 100%; margin: 15px 0; height: 25px;"
                class="v-loading v-loading--dynamic"></span>
          <span style="display: block; width: 100%; margin: 15px 0; height: 25px;"
                class="v-loading v-loading--dynamic"></span>
        </div>
      </v-card-content>
    </v-card>

    <v-card v-if="data.show" elevation="5">
      <v-card-title>
        <span style="">Testting header</span>
        <v-checkbox label="test"/>
      </v-card-title>
      <v-card-content>
        <span style="display: block;">some little text</span>
        <span style="display: block;">some little text</span>
        <span style="display: block;">some little text</span>
        <span style="display: block;">some little text</span>
        <span style="display: block;">some little text</span>
      </v-card-content>
    </v-card>
  </v-form>
  <teleport to="#modal">
    <v-modal v-model="data.show" overlay transition="scale-in">
      <v-card color="blue darken-2">
        <v-card-title>
          test
        </v-card-title>
        <v-card-content>
          salam
        </v-card-content>
        <v-card-actions>
          <v-button label="click" @click="data.show = !data.show"/>
        </v-card-actions>
      </v-card>
    </v-modal>
  </teleport>

  <v-badge
    color="blue darken-3"
    border
    right
    top
  >
    <template v-slot:badge>
      <span>2</span>
    </template>
    <v-tooltip
      color="blue darken-3"
      right
      offset-x="12"
      min-width="250"
    >
      <template v-slot:activator="{on}">
        <v-button
          elevation="3"
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
