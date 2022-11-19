<script lang="ts">
import { useTheme } from '../src/composables/use-theme'
import DashboardUI from './DashbordUI'
// import DefaultUI from './DefaultUI'

export default {
  components: {
    DashboardUI,
    // DefaultUI,
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
    <!--    <default-u-i/>-->
    <dashboard-u-i/>
  </v-app>
</template>

<style lang="scss">

</style>
