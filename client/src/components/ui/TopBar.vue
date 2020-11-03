<template>
  <v-app-bar app color="#379338" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../../assets/ocotillo-icon.png"
        transition="scale-transition"
        width="40"
      />
      <h1>Ocotillo</h1>
    </div>

    <v-tabs centered class="ml-n15">
      <v-tab v-for="link in links" :key="link">
        {{ link }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>


<script>
  export default {
    data: () => ({
      links: [
        'Collection',
        'Wishlist',
        'Propagation',
      ],
    }),
  }
</script>