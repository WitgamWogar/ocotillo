<template>
    <v-row justify="center">
        <v-btn color="success" dark absolute top @click="newPlantDialog = true">
            Add New Plant
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog v-model="newPlantDialog" max-width="600px">
            <CreateForm @cancel="newPlantDialog" />
        </v-dialog>
    </v-row>
</template>

<script>
    import CreateForm from '../../components/plant/CreateForm';

  export default {
      components: {
          CreateForm,
      },
    data () {
      return {
        newPlantDialog: false,
      }
    },
  }
</script>