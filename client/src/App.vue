<template>
  <v-app>
    <TopBar/>

    <v-main>
      <CollectionPage/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/ui/TopBar';
import CollectionPage from './pages/CollectionPage';

export default {
  name: 'App',

  components: {
    TopBar,
    CollectionPage,
  },

  data: () => ({
    //
  }),
};
</script>
