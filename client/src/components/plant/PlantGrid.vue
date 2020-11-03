<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4">
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
  data: () => ({}),
};
</script>
