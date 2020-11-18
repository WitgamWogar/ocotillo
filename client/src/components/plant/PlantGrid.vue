<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col v-for="plant in plants" :key="plant._id" cols="12" sm="4">
        <div class="ma-2">
          <PlantCard :plant="plant" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlantCard from './PlantCard';

export default {
  components: {
    PlantCard,
  },
  props: ['plantType'],
  data: () => ({
    plants: [],
  }),
  methods: {
    getPlants() {
      let route = this.plantType ? `plant/type/${this.plantType}` : 'plant';

      this.axios.get(route).then(response => {
        this.plants = response.data.data;
      });
    },
  },
  mounted() {
    this.getPlants();
  },
  created() {
    let _this = this;
    this.$eventHub.$on('plant-list-updated', function() {
      _this.getPlants();
    });
  },
};
</script>
