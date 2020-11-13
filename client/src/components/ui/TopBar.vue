<template>
  <v-app-bar app color="rgb(9, 9, 9)" dark>
    <div class="d-flex align-center logo-container" @click="$router.push('/')">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../../assets/logo2.png"
        transition="scale-transition"
        width="40"
      />
      <h1 class="flower-font">Ocotillo</h1>
    </div>
    <v-tabs centered>
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

<style scoped>
.logo-container {
  cursor: pointer;
  position: absolute;
}
</style>