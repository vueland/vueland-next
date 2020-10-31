<script lang="ts">
import { reactive } from 'vue'

export default {
  setup() {

    const data = reactive({
      show: false,
    })

    const showModal = () => {
      data.show = true
    }

    const closeModal = () => {
      data.show = false
    }

    return {
      showModal,
      closeModal,
      data,
    }
  },
}
</script>

<template>
  <div>
    <v-button
      elevation="4"
      color="red darken-4"
      label="click"
      @click="showModal"
    />
    <v-modal
      v-show="data.show"
      overlay
      overlay-opacity=".8"
      transition="fade"

      overlay-color="#000000"
    >
      <v-card width="360" elevation="5">
        <v-card-title class="blue darken-3 white--text">
          <v-field />
          salam
        </v-card-title>
        <v-card-content class="blue darken-4 white--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi corporis distinctio, eius exercitationem
          facere id nulla quo repudiandae ut voluptates.
        </v-card-content>
        <v-card-actions class="blue darken-3">
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
  </div>
</template>

<style lang="scss">

</style>
