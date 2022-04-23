<template>
  <div class="buttons">
    <div>
      <v-button
        label="simple"
        color="red"
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="simple"
        color="primary"
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="simple"
        color="success"
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="disabled"
        color="success"
        elevation="3"
        disabled
        style="margin-right: 10px;"
      />
      <v-button
        label="simple"
        color="success"
        elevation="3"
        loading
        style="margin-right: 10px;"
      />
      <v-button
        label="simple"
        color="success"
        elevation="3"
        loading
        style="margin-right: 10px;"
      >
        <template #loading>
          <span>loading</span>
        </template>
      </v-button>
    </div>
    <div style="margin: 20px 0">
      <v-button
        label="rounded"
        color="red"
        rounded
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="rounded"
        color="primary"
        rounded
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="rounded"
        color="success"
        rounded
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="disabled"
        color="success"
        rounded
        disabled
        elevation="3"
        style="margin-right: 10px;"
      />
      <v-button
        label="rounded"
        color="success"
        rounded
        loading
        elevation="3"
      />
    </div>
    <div style="margin: 20px 0">
      <v-button
        label="text"
        color="red"
        text
        style="margin-right: 10px;"
      />
      <v-button
        label="text"
        color="primary"
        text
        style="margin-right: 10px;"
      />
      <v-button
        label="text"
        color="success"
        text
        style="margin-right: 10px;"
      />
      <v-button
        label="disabled"
        color="success"
        text
        disabled
        style="margin-right: 10px;"
      />
      <v-button
        label="text"
        color="primary"
        loading
        text
      />
    </div>
    <div style="margin: 20px 0">
      <v-button
        label="outlined"
        color="red"
        outlined
        style="margin-right: 10px;"
      />
      <v-button
        label="outlined"
        color="primary"
        outlined
        style="margin-right: 10px;"
      />
      <v-button
        label="outlined"
        color="success"
        outlined
        style="margin-right: 10px;"
      />
      <v-button
        label="disabled"
        color="success"
        outlined
        disabled
        style="margin-right: 10px;"
      />
      <v-button
        label="outlined"
        color="primary"
        outlined
        loading
      />
    </div>
    <div style="margin: 20px 0">
      <v-button
        color="red"
        round
        elevation="3"
        style="margin-right: 10px;"
      >
        <v-icon icon="home" size="22" />
      </v-button>
      <v-button
        color="primary"
        round
        elevation="3"
        width="50"
        style="margin-right: 10px;"
      >
        <v-icon icon="settings" size="26" />
      </v-button>
      <v-button
        color="success"
        round
        elevation="8"
        width="60"
        style="margin-right: 10px;"
      >
        <v-icon icon="favorite" size="32" />
      </v-button>
      <v-button
        color="success"
        round
        disabled
        width="60"
        style="margin-right: 10px;"
      >
        <v-icon icon="favorite" size="32" />
      </v-button>
      <v-button
        color="success"
        round
        elevation="3"
        width="70"
        loading
        style="margin-right: 10px;"
      >
        <v-icon icon="favorite" size="32" />
      </v-button>
    </div>
  </div>
</template>