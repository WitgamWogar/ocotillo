<template>
  <div id="plant-details-container" class="page-wrapper">
    <v-container v-if="!notFound">
      <v-row justify="center">
        <h1 class="white--text">{{ this.plant.common_name }}</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <PlantDetailsTable :plant="plant" @refreshPlant="getPlantData" />
          <PhotoSlider :photos="plant.photos" />
        </v-col>
        <v-col cols="6">
          <ActivityCard :plant="plant" @refreshPlant="getPlantData" />
        </v-col>
      </v-row>
    </v-container>
    <NotFound v-else message="This plant can't be located. Maybe it was deleted?"  />
  </div>
</template>

<script>
import NotFound from '../../components/common/NotFound';
import ActivityCard from '../../components/activity/ActivityCard';
import PhotoSlider from '../../components/ui/PhotoSlider';
import PlantDetailsTable from '../../components/plant/PlantDetailsTable';

export default {
  components: {
    NotFound,
    ActivityCard,
    PhotoSlider,
    PlantDetailsTable,
  },
  data() {
    return {
      plant: {},
      notFound: false,
      editMode: false,
    };
  },
  methods: {
    getPlantData() {
      this.axios
        .get(`plant/${this.$route.params.plantId}`)
        .then(response => {
          this.plant = response.data.data;
        })
        .catch(() => {
          this.notFound = true;
        });
    },
  },
  created() {
    this.getPlantData();
  },
};
</script>

<style>
#plant-details-container {
  background-image: url('../../assets/plants-background.jpeg');
}
</style>
