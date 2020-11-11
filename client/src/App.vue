<template>
  <v-app>
    <TopBar/>


    <v-main>
      <router-view></router-view>
    </v-main>

    <Notification/>

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
};
</script>

<style>
  /* TODO I don't know how I feel about this... revist. */
  #app {
    background: rgba(0, 0, 0, 0) url("https://www.toptal.com/designers/subtlepatterns/patterns/skulls.png") repeat scroll 0% 0%;
  }
  .v-main__wrap {
    background-color:#0000007a!important;
  }
</style>
