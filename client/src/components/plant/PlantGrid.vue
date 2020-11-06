<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="plant in plants" :key="plant.id" cols="12" sm="4">
        <div class="ma-2">
          <PlantCard />
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
  data: () => ({
    plants: [],
  }),
  mounted () {
      // TODO set host const
      this.axios.get(`http://localhost:3000/api/plant`).then((data) => {
        console.log(data);
      });
  }
};
</script>
