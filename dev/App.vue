<script lang="ts">
  // import DashbordUI from './DashbordUI'
  import { inject } from 'vue'
  import DefaultUI from './DefaultUI'

  export default {
    components: {
      // DashbordUI,
      DefaultUI,
    },
    setup() {
      const $v_theme = inject('$v_theme')
      console.log($v_theme)
      return {}
    },
  }
</script>

<template>
  <v-app>
    <!--    <dashbord-u-i/>-->
    <default-u-i/>
  </v-app>
</template>

<style lang="scss">

</style>
