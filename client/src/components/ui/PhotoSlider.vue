<template>
  <v-card class="mb-3" color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-image-multiple</v-icon>
      <span class="headline">Photos</span>
      <v-spacer></v-spacer>
      <v-btn color="rgb(11, 95, 75)" class="ml-2" icon large>
        <v-icon>mdi-pencil-box-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-carousel v-if="photos && photos.length">
      <v-carousel-item
        v-for="(photo, i) in photos"
        :key="i"
        :src="'http://localhost:3000/' + photo.path"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
export default {
  props: ['photos'],
};
</script>
