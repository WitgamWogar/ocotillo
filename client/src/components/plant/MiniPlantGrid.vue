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
  props: ['plants'],
};
</script>
