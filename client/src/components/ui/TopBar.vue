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
      <v-tab v-for="link in links" :key="link.name" :to="{ name: link.name }">
        {{ link.title }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>
    <div
      v-if="$store.state.auth.access_token"
      style="position:absolute; right:20px;"
    >
      <span class="overline">{{ $store.state.auth.user.email }}</span>
      <v-btn text @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'Collection',
        name: 'collection',
      },
      {
        title: 'Wishlist',
        name: 'wishlist',
      },
      {
        title: 'Propagation',
        name: 'propagation',
      },
      {
        title: 'Locations',
        name: 'locations',
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.logo-container {
  cursor: pointer;
  z-index: 1;
  position: absolute;
}
</style>
