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
      toggleAlways,
      forOut,
    }
  },
}
</script>

<template>
  <v-datepicker color="blue darken-4" dark />
  <v-form v-slot="{ validate }">
    <v-text-field
      label="test"
      :rules="[v => !!v || 'required', v => v.length > 5 || 'more than 5']"
    />
    <v-button label="click" color="blue darken-3" @click="() => validate()" />
  </v-form>


  <v-form>
    <v-card v-if="!data.show" elevation="5">
      <v-resize right />
      <v-resize bottom />
      <v-resize top />
      <v-resize left />
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

  <v-button elevation="3" label="toggle" color="blue" @click="data.show = !data.show" />

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
