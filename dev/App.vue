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

      const toggleAlways = () => {
        data.always = !data.always
      }

      const testFunc = () => {
        console.log('tested')
      }

      const forOut = computed(() => {
        return data.always ? testFunc : undefined
      })

      watch(() => forOut.value, to => {
        console.log(forOut.value, 'forOut')
      }, { immediate: true })

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
  <div
    class="app-header"
    v-click-outside="forOut"
  >
    <div
      style="width: 60px; height: 60px; background: red; cursor: pointer;"
      v-on="on"
    ></div>
  </div>
  <div class="app-sidebar" @click="toggleAlways"></div>
  <div class="wrap">
    <v-form v-slot="{ validate }">
      <v-card width="600" elevation="5" style="padding: 20px">
        <v-resize right/>
        <v-resize left/>
        <v-resize top/>
        <v-resize bottom/>
        <v-list>
          <v-preload :active="data.always">
            <v-badge
              style="width: 100%;"
            >
              <template v-slot:badge>
                <v-icon icon="fas fa-bell" size="12"/>
              </template>

              <v-list-group
                group="swims"
                color="grey lighten-2"
                class=""
              >
                <template v-slot:prependIcon>
                  <v-icon
                    size="18"
                    color="green accent-3"
                  >
                    fab fa-accusoft
                  </v-icon>
                </template>
                <template v-slot:title>


                  <v-list-item-title>

                    <span>swim lanes</span>

                  </v-list-item-title>


                </template>
                <v-list-item active-class="active-class" v-model:active="data.always">
                  <v-list-item-icon>
                    <v-icon
                      size="18"
                      color="green accent-3"
                    >
                      fab fa-accusoft
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    test
                  </v-list-item-title>
                </v-list-item>
              </v-list-group>

            </v-badge>
          </v-preload>
        </v-list>
        <v-card-content>
          <v-preload :active="data.show">
            <v-icon
              icon="fab fa-apple"
              color="green accent-3"
              clickable
              @click="() => (data.login = '')"
            />
            <v-text-field
              v-model="data.login"
              label="login"
              :rules="[
                  val => !!val || 'Required',
                  val => val.length > 5 || 'more than 5 symbols',
                ]"
            />
            <v-text-field
              v-model="data.password"
              label="password"
              :rules="[
                  val => !!val || 'Required',
                  val => val.length > 5 || 'more than 5 symbols',
                ]"
            />
            <v-text-field
              v-model="data.email"
              label="email"
              :rules="[
                  val => !!val || 'Required',
                  val => val.length > 5 || 'more than 5 symbols',
                ]"
            />
            <v-checkbox label="igor" v-model="data.checked" :value="data.user" validate/>
            <v-checkbox label="alyona" v-model="data.checked" :value="data.user2"/>
            <v-select
              v-model="data.user"
              label="select"
              value-key="name"
              :items="items"
              :rules="[v => !!v || 'Required']"
            />

            <span class="text">Lorem ipsum dolor.</span>
            <span class="text">Lorem ipsum dolor sit amet.</span>
            <span class="text">Lorem ipsum.</span>
            <span class="text">Lorem .</span>
            <span class="text">Lorem ipsum dolor sit amet.</span>
          </v-preload>
        </v-card-content>
        <v-card-actions>
          <v-button
            color="blue accent-4"
            label="send"
            outlined
            absolute
            left
            @click="validateValue(validate)"
          />
        </v-card-actions>
      </v-card>
    </v-form>

    <v-button
      elevation="2"
      color="red darken-4"
      label="click"
      @click="show"
    />
    <teleport to="#modal">
      <v-modal
        v-model="data.show"
        transition="scaleIn"
        overlay
        overlay-color="#000000"
      >
        <v-card color="blue darken-3" width="360" elevation="5">
          <v-card-title class="white--text"> salam</v-card-title>
          <v-card-content class="white--text">
            <v-badge
              elevation="3"
              bottom
              right
              border
              content="2"
              offset-x="12"
              offset-y="12"
              color="green darken-1"
            >
              <v-badge elevation="5" avatar border>
                <template v-slot:badge>
                  <img
                    src="https://sun1-16.userapi.com/c851220/v851220129/177732/UnRBSWJfmLw.jpg?ava=1"
                    alt=""
                  />
                </template>
              </v-badge>
            </v-badge>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
            corporis distinctio, eius exercitationem facere id nulla quo
            repudiandae ut voluptates.
          </v-card-content>
          <v-card-actions class="">
            <v-button
              outlined
              absolute
              right
              color="white"
              label="agree"
              @click="toggleModal"
            />
          </v-card-actions>
        </v-card>
      </v-modal>
    </teleport>
  </div>

  <div class="test">
    <v-tooltip
      left
      elevation="8"
      color="blue darken-2"
    >
      <template v-slot:activator="{ on }">
        <v-button
          v-on="on"
        >
          Name
        </v-button>
      </template>
      <span>tooltip for my danger</span>
    </v-tooltip>
    <v-tooltip
      bottom
      offset="5"
    >
      <template v-slot:activator="{ on }">
        <div
          style="width: 60px; height: 60px; background: red; cursor: pointer;"
          v-on="on"
        ></div>
      </template>
      <span>tooltip for my danger</span>
    </v-tooltip>
  </div>

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
