<script lang="ts">
  import { defineVSelectList } from './define-v-select-list'

  export default defineVSelectList()
</script>
<template>
  <div class="v-select-list">
    <v-list
      v-if="items"
      v-model:value="computedSelect"
      active
      :active-class="activeClass"
    >
      <v-list-item
        v-for="(it,i) in items"
        :key="i + it"
        v-memo="items"
      >
        <template #default>
          <v-list-item-title>
            {{ valueKey ? getStringKeysValue(valueKey, it) : it }}
          </v-list-item-title>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>
