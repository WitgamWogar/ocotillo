<template>
    <div>
        <v-row justify="center">
            <v-btn color="success" dark @click="newPlantDialog = true" class="mt-5">
            Add New Plant
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        </v-row>
        
        
        <PlantGrid/>

        <v-dialog v-model="newPlantDialog" max-width="600px">
            <CreateForm @cancel="newPlantDialog = false" />
        </v-dialog>
    </div>
</template>

<script>
    import CreateForm from '../../components/plant/CreateForm';
    import PlantGrid from '../../components/plant/PlantGrid';

  export default {
      components: {
          CreateForm,
          PlantGrid,
      },
    data () {
      return {
        newPlantDialog: false,
      }
    },
  }
</script>