<script lang="ts">
  import { defineVSelect } from './define-v-select'

  export default defineVSelect()
</script>
<template>
  <v-input
    ref="activator"
    :value="computedKeyValue"
    :focused="focused"
  >
    <template #text-field="{cssColor, clsColor, disabled}">
      <div
        :class="classes"
      >
        <input
          :class="['v-select__input', !disabled && clsColor]"
          :style="disabled ? {} : cssColor"
          :disabled="isDisabled"
          :type="$attrs.type ? $attrs.type : 'text'"
          :placeholder="$attrs.placeholder"
          :value="computedKeyValue"
          readonly
        >
      </div>
    </template>
    <template #select>
      <v-menu
        v-if="activator"
        :activator="activator"
        :open-on-click="!isReadonly && !isDisabled"
        input-activator=".v-input__text-field"
        max-height="240"
        internal-activator
        @show="onFocus"
        @hide="onBlur"
      >
        <v-select-list
          :items="items"
          :selected="modelValue"
          :value-key="valueKey"
          :active-class="activeClass"
          @select="onSelect"
        />
      </v-menu>
    </template>
    <template #append-icon>
      <v-icon size="16">
        {{ FaIcons.$expand }}
      </v-icon>
    </template>
  </v-input>
</template>
