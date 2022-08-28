<script lang="ts">
  import { useTheme } from '../src/composables/use-theme'
  // import DashbordUI from './DashbordUI'
  import DefaultUI from './DefaultUI'

  export default {
    components: {
      // DashbordUI,
      DefaultUI,
    },
    setup() {
      const $v_theme = useTheme()
      console.log($v_theme)

      return {}
    },
  }
</script>

<template>
  <v-app>
    <default-u-i/>
    <!--    <dashbord-u-i/>-->
  </v-app>
</template>

<style lang="scss">

</style>
