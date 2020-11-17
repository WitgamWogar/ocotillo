<template>
  <div id="locations-container" class="page-wrapper">
    <v-container>
      <v-row justify="center">
        <h1 class="white--text">My Locations</h1>
      </v-row>
      <LocationGrid />
    </v-container>
  </div>
</template>

<script>
import LocationGrid from '../../components/location/LocationGrid';

export default {
  components: {
    LocationGrid,
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
