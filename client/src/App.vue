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
