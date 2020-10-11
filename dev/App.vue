<script>
  export default {
    name: 'App',

    setup() {

    }
  }
</script>

<template>
  <div>
    <v-button
      elevation="4"
      color="red darken-4"
      label="click"
    />

    <v-card width="360" elevation="5">
      <v-card-title class="blue darken-3 white--text">
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
          left
          color="white"
          label="agree"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>
