<script lang="ts">
  import { reactive } from 'vue'

  export default {
    setup() {
      const showEvent = (e) => {
        console.log(e)
      }

      const data = reactive({
        show: false,
        text: ''
      })

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
        data,
      }
    },
  }
</script>

<template>
  <div>
    <v-input
      v-model="data.text"
      required
      label="input"
      placeholder="insert value"
      @input="showEvent"
      :rules="[val => val.length > 5]"
    />
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
