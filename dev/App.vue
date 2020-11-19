<script lang="ts">
  import { reactive, watch } from 'vue'

  export default {
    setup() {
      const data = reactive({
        always: true,
        show: false,
        login: '',
        email: '',
        password: '',
        user: { name: 'igor' },
        checked: [],
        user2: { name: 'alyona' }
      })

      watch(
        () => data.checked,
        to => console.log(to, 'checked'),
      )

      const testFunc = () => {
        console.log(data)
      }

      const validateValue = validate => {
        testFunc()
        validate().then(res => {
          console.log(res)
          if (res) console.log('valid')
        })
      }

      const showModal = () => {
        data.show = true
      }

      const closeModal = () => {
        data.show = !data.show
      }


      const items = [
        { name: 'Alex', age: 24 },
        { name: 'Andrew', age: 24 },
        { name: 'Nikol', age: 24 },
        { name: 'Anna', age: 24 },
      ]

      return {
        showModal,
        closeModal,
        validateValue,
        testFunc,
        data,
        items
      }
    },
  }
</script>

<template>
  <div>
    <v-form v-slot="{ validate }">
      <v-card width="600" elevation="5" style="padding: 20px">
        <v-resize right/>
        <v-resize left/>
        <v-resize top/>
        <v-resize bottom/>
        <v-list>
          <v-list-group
            group="First"
          >
            <template v-slot:title>
              <v-list-item-title>ha
                threads
              </v-list-item-title>
            </template>
            <template v-slot:prependIcon>
              <v-icon size="16">fab fa-apple</v-icon>
            </template>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="14">fas fa-book</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                book
              </v-list-item-title>
            </v-list-item>
            <v-list-group sub-group color="green darken-1">
              <template v-slot:title>
                <v-list-item-title>
                  subgroup
                </v-list-item-title>
              </template>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="14">fas fa-book</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  book
                </v-list-item-title>
              </v-list-item>
              <v-list-group sub-group prepend-icon="fas fa-book" no-action>
                <template v-slot:title>
                  <v-list-item-title>
                    internal
                  </v-list-item-title>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group sub-group>
              <template v-slot:title>
                <v-list-item-title>
                  subgroup
                </v-list-item-title>
              </template>
            </v-list-group>
            <v-list-group sub-group>
              <template v-slot:title>
                <v-list-item-title>
                  subgroup
                </v-list-item-title>
              </template>
            </v-list-group>
            <v-list-group sub-group>
              <template v-slot:title>
                <v-list-item-title>
                  subgroup
                </v-list-item-title>
              </template>
            </v-list-group>
          </v-list-group>
          <v-list-group
            group="First"
          >
            <template v-slot:title>
              <v-list-item-title>
                users
              </v-list-item-title>
            </template>
            <template v-slot:prependIcon>
              <v-icon size="16">fab fa-apple</v-icon>
            </template>
            <v-list-group sub-group>
              <template v-slot:title>
                <v-list-item-title>
                  subgroup
                </v-list-item-title>
              </template>
              <v-list-group sub-group prepend-icon="fas fa-book" no-action>
                <template v-slot:title>
                  <v-list-item-title>
                    books
                  </v-list-item-title>
                </template>
              </v-list-group>
              <v-list-group sub-group prepend-icon="fas fa-book" no-action>
                <template v-slot:title>
                  <v-list-item-title>
                    pencils
                  </v-list-item-title>
                </template>
              </v-list-group>
            </v-list-group>
          </v-list-group>
        </v-list>
        <v-card-content>
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
      @click="showModal"
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
              @click="closeModal"
            />
          </v-card-actions>
        </v-card>
      </v-modal>
    </teleport>
  </div>
</template>
<style lang="scss"></style>
