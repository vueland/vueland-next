<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<template>
  <v-layout column>
    <v-toolbar
      class="elevation-3"
      fixed
    >
      <v-toolbar-content>
        <v-toolbar-nav-btn></v-toolbar-nav-btn>
        <v-toolbar-logo></v-toolbar-logo>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          ITEM1
        </v-toolbar-items>
      </v-toolbar-content>
    </v-toolbar>
    <v-navigation
      offset-top="56"
      class="elevation-2"
      fixed
      left
      on-hover
    >
      <v-list
        active
      >
        <v-list-item
          v-for="it in 7"
          :key="it"
          class="px-1"
        >
          <v-list-item-icon>
            <v-icon>
              fas fa-atlas
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              item {{ it }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation>
  </v-layout>
  <v-main
    style="padding: 66px 10px 10px 66px"
  >
    <v-row
      v-for="row in 5"
      :key="row"
    >
      <v-col
        v-for="col in 4"
        :key="col"
        xl="3"
        lg="3"
        md="6"
        sm="12"
      >
        <v-card
          width="100%"
          class="elevation-2"
        >
          <v-card-content>
            <v-row>
              <v-col cols="3">
                <v-badge
                  bottom
                  right
                  dot
                  color="green lighten-1"
                >
                  <v-skeleton
                    width="50"
                    height="50"
                    radius="50"
                  />
                </v-badge>
              </v-col>
              <v-col cols="9">
                <v-skeleton
                  height="10"
                  radius="3"
                  class="mb-1"
                />
                <v-skeleton
                  height="10"
                  radius="3"
                  class="mb-1"
                />
                <v-skeleton
                  height="10"
                  radius="3"
                  class="mb-1"
                />
                <v-skeleton
                  height="10"
                  radius="3"
                  class="mb-1"
                />
              </v-col>
            </v-row>
          </v-card-content>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
