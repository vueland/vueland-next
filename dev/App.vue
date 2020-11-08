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
      })

      watch(
        () => data.password,
        to => console.log(!!to),
      )

      const validateValue = method => {
        method().then(res => {
          if (res) console.log('valid')
        })
      }

      const showModal = () => {
        data.show = true
      }

      const closeModal = () => {
        data.show = !data.show
      }

      const testFunc = () => {
        console.log(data)
      }

      return {
        showModal,
        closeModal,
        validateValue,
        testFunc,
        data,
      }
    },
  }
</script>

<template>
  <div>
    <v-form v-slot="{ validate }">
      <v-card color="#272727" width="400" elevation="5" style="padding: 20px">
        <v-resize right />
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
            dark
            @input="testFunc"
            :rules="[
              val => !!val || 'Required',
              val => val.length > 5 || 'more than 5 symbols',
            ]"
          />
          <v-text-field
            v-model="data.password"
            label="password"
            dark
            :rules="[
              val => !!val || 'Required',
              val => val.length > 5 || 'more than 5 symbols',
            ]"
          />
          <v-text-field
            v-model="data.email"
            label="email"
            dark
            :rules="[
              val => !!val || 'Required',
              val => val.length > 5 || 'more than 5 symbols',
            ]"
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
          <v-card-title class="white--text"> salam </v-card-title>
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
