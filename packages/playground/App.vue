<script lang="ts">
import { useTheme } from '../vueland/src/composables/use-theme'
// import DashboardUI from './DashbordUI.vue'
import DefaultUI from './DefaultUI'

export default {
  components: {
    // DashboardUI,
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
  <v-app style="/*position: absolute; left: 0; top: 0; right: 0; bottom: 0;*/">
    <default-u-i/>
    <!--    <dashboard-u-i/>-->
  </v-app>
</template>

<style lang="scss">
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
