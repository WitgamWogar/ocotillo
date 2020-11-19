<template>
  <div id="wishlist-container" class="page-wrapper">
    <v-row justify="center">
      <v-btn
        color="success"
        dark
        @click="plantFormDialogOpen = true"
        class="mt-5"
      >
        Add New Plant
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <PlantGrid plant-type="wishlist" />

    <PlantFormDialog
      @close="plantFormDialogOpen = false"
      title="Add a Wishlist Plant"
      :open="plantFormDialogOpen"
    />
  </div>
</template>

<script>
import PlantFormDialog from '../../components/plant/PlantFormDialog';
import PlantGrid from '../../components/plant/PlantGrid';

export default {
  components: {
    PlantFormDialog,
    PlantGrid,
  },
  data() {
    return {
      plantFormDialogOpen: false,
    };
  },
};
</script>

<style scoped>
#wishlist-container {
  background-image: url('../../assets/square-plants.jpeg');
}
</style>
