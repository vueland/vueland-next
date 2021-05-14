<template>
  <div style="width: 100%; height: 100%;">
    <v-button
      label="show modal"
      color="primary"
      elevation="4"
      @click="show = !show"
    />
    <v-modal
      v-model="show"
      overlay
      transition="scale-in"
    >
      <v-card elevation="10" class="primary">
        <v-card-title>Title</v-card-title>
        <v-card-subtitle>
          subtitle
        </v-card-subtitle>
        <v-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae dignissimos dolor eaque hic minus modi
          odit saepe ullam ut?
        </v-card-content>
        <v-card-actions>
          <v-button
            label="close modal"
            color="primary"
            elevation="4"
            @click="show = !show"
          />
        </v-card-actions>
      </v-card>
    </v-modal>
  </div>
</template>
<script>
  import { ref, defineComponent } from 'vue'

  export default defineComponent({
    name: 'test',
    setup() {
      const show = ref(false)

      return {
        show,
      }
    },
  })
</script>