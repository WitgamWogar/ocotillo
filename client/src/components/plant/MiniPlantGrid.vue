<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col v-for="plant in plants" :key="plant._id" cols="12" sm="4">
        <div class="ma-1">
          <MiniPlantCard :plant="plant" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniPlantCard from './MiniPlantCard';

export default {
  components: {
    MiniPlantCard,
  },
  props: ['location'],
  data: () => ({
    plants: [],
  }),
  methods: {
    //TODO If Location, this will get by location instead
    getPlants() {
      this.axios.get(`plant`).then(response => {
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
