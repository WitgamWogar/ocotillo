<template>
  <v-card class="mb-3" color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-image-multiple</v-icon>
      <span class="headline">Photos</span>
      <v-spacer></v-spacer>
      <v-btn
        color="rgb(11, 95, 75)"
        class="ml-2"
        icon
        large
        @click="plantPhotosDialogOpen = true"
      >
        <v-icon>mdi-pencil-box-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-carousel v-if="plant.photos && plant.photos.length">
      <v-carousel-item
        v-for="(photo, i) in plant.photos"
        :key="i"
        :src="'http://localhost:3000/' + photo.path"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <h3 class="pa-5" v-else>There are no photos here yet...</h3>

    <PlantPhotosDialog
      :open="plantPhotosDialogOpen"
      :plant="plant"
      @refreshPlant="refreshPlant"
      @close="plantPhotosDialogOpen = false"
    />
  </v-card>
</template>

<script>
import PlantPhotosDialog from './PlantPhotosDialog';

export default {
  components: {
    PlantPhotosDialog,
  },
  props: ['plant'],
  data() {
    return {
      plantPhotosDialogOpen: false,
    };
  },
  methods: {
    refreshPlant() {
      this.$emit('refreshPlant');
    },
  },
};
</script>
