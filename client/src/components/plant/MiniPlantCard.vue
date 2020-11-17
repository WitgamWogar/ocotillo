<template>
  <v-card
    class="pointer"
    @click="
      $router.push({
        name: 'plant.details',
        params: { plantId: plant.id },
      })
    "
  >
    <div class="text-caption text-center">
      {{ plant.scientific_name }}
    </div>
    <v-img height="100px" :src="getImage()"> </v-img>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: ['plant'],
  data: () => ({
    actionBtn: false,
    plantFormDialogOpen: false,
    $plant: {},
  }),
  methods: {
    getImage() {
      let url =
        'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg';

      if (this.plant.photos && this.plant.photos.length) {
        // TODO use config for host or include a url property via transformer on backend
        url =
          'http://localhost:3000/' +
          this.plant.photos[this.plant.photos.length - 1].path;
      }

      return url;
    },
  },
};
</script>
