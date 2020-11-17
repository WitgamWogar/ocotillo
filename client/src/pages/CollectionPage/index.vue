<template>
  <div id="collection-container" class="page-wrapper">
    <v-row justify="center">
      <v-btn color="success" dark @click="plantFormDialogOpen = true" class="mt-5">
        Add New Plant
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <PlantGrid />
    
    <PlantFormDialog @close="plantFormDialogOpen = false" :open="plantFormDialogOpen" />
      
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
#collection-container {
  background-image: url('../../assets/collection-background.jpeg');
}
</style>
