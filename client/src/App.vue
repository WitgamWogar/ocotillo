<template>
  <v-app>
    <TopBar />

    <v-main>
      <router-view></router-view>
    </v-main>

    <Notification />
  </v-app>
</template>

<script>
import TopBar from './components/ui/TopBar';
import Notification from './components/ui/Notification';

export default {
  name: 'App',

  components: {
    TopBar,
    Notification,
  },

  mounted() {
    this.axios.get(`/user/current`).then(response => {
      this.$store.commit('auth/setUser', response.data)
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
.flower-font {
  font-family: 'Indie Flower', cursive;
}
.page-wrapper {
  min-height: 100%;
  background-size: cover;
}
</style>
