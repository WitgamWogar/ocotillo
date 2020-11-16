<template>
  <v-card class="mb-3" color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-flower-tulip-outline</v-icon>
      <span class="headline">Basic Details</span>
      <v-spacer></v-spacer>
      <v-btn color="green" class="ml-2" icon small>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-simple-table style="background-color:transparent;">
      <tbody>
        <editable-row
          label="Scientific Name"
          type="text"
          :edit-mode="editMode"
          v-model="plant.scientific_name"
          :error-messages="$validator.get('scientific_name')"
        ></editable-row>
        <editable-row
          label="Common Name"
          type="text"
          :edit-mode="editMode"
          v-model="plant.common_name"
          :error-messages="$validator.get('common_name')"
        ></editable-row>
        <editable-row
          label="Nickname"
          type="text"
          :edit-mode="editMode"
          v-model="plant.nickname"
          :error-messages="$validator.get('nickname')"
        ></editable-row>
        <editable-row
          label="Location"
          type="text"
          :edit-mode="editMode"
          v-model="plant.location"
          :error-messages="$validator.get('location')"
        ></editable-row>
        <editable-row
          label="Source"
          type="text"
          :edit-mode="editMode"
          v-model="plant.source"
          :error-messages="$validator.get('source')"
        ></editable-row>
      </tbody>
    </v-simple-table>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import EditableRow from '../../components/ui/form/EditableRow';

export default {
  components: {
    EditableRow,
  },
  data() {
    return {
      editMode: false,
    };
  },
  props: ['plant'],
};
</script>
