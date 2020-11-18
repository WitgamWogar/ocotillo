<template>
  <div id="locations-container" class="page-wrapper">
    <v-container>
      <v-row justify="center">
        <h1 class="white--text">My Locations</h1>
      </v-row>
      <LocationList />
    </v-container>
  </div>
</template>

<script>
import LocationList from '../../components/location/LocationList';

export default {
  components: {
    LocationList,
  },
  data() {
    return {
      newPlantDialog: false,
    };
  },
};
</script>

<style scoped>
#locations-container {
  background-image: url('../../assets/locations-background.jpeg');
}
</style>
