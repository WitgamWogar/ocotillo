<template>
  <v-app>
    <TopBar/>

    <v-main>
      <CollectionPage/>
    </v-main>

    <Notification/>

  </v-app>
</template>

<script>
import TopBar from './components/ui/TopBar';
import CollectionPage from './pages/CollectionPage';
import Notification from './plugins/Notification';

export default {
  name: 'App',

  components: {
    TopBar,
    CollectionPage,
    Notification,
  },
};
</script>
