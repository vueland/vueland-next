<script lang="ts">
  import { reactive } from 'vue'

  export default {
    setup() {

      const data = reactive({
        show: false,
        text: 'salam',
      })

      const showEvent = (e) => {
        console.log(data.text)
      }

      const validateValue = (method) => {
        method().then(res => {
          if (res) console.log('valid')
          else console.log('not valid')
        })
      }

      const showModal = () => {
        data.show = true
      }

      const closeModal = () => {
        data.show = !data.show
      }

      return {
        showModal,
        closeModal,
        showEvent,
        validateValue,
        data
      }
    },
  }
</script>

<template>
  <div>
    <v-form v-slot="{ validate }">
      <v-card width="400" elevation="5">
        <v-card-content>
          <v-input
            v-model="data.text"
            label="email"
            @input="showEvent"
            :rules="[
                val => !!val,
                val => val.length >= 3,
                val => val === 'man'
               ]"
          />
          <v-input
            v-model="data.text"
            label="email"
            @input="showEvent"
            :rules="[
                val => !!val,
                val => val.length >= 3
               ]"
          />
        </v-card-content>
        <v-card-actions>
          <v-button color="blue" label="send" elevation="3" @click="validateValue(validate)"/>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-button
      elevation="4"
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
          <v-card-title class="white--text">
            salam
          </v-card-title>
          <v-card-content class="white--text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi corporis distinctio, eius exercitationem
            facere id nulla quo repudiandae ut voluptates.
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

<style lang="scss">

</style>
