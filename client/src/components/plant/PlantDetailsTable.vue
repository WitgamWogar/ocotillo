<template>
  <v-card class="mb-3" color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-flower-tulip-outline</v-icon>
      <span class="headline">Basic Details</span>
      <v-spacer></v-spacer>
      <v-btn color="rgb(11, 95, 75)" class="ml-2" icon large>
        <v-icon v-if="!editMode" @click="editMode = true"
          >mdi-pencil-box-outline</v-icon
        >
        <v-icon v-else @click="cancelEdit">mdi-close-box-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
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
          v-if="plant.type === 'collection'"
          label="Location"
          type="select"
          :edit-mode="editMode"
          :select-options="locations"
          :display-value="plant.location ? plant.location.name : null"
          select-option-text="name"
          select-option-value="id"
          v-model="plant.location"
          :error-messages="$validator.get('location')"
        ></editable-row>
        <editable-row
          v-if="plant.type === 'collection'"
          label="Source"
          type="text"
          :edit-mode="editMode"
          v-model="plant.source"
          :error-messages="$validator.get('source')"
        ></editable-row>
      </tbody>
    </v-simple-table>

    <v-card-actions v-if="editMode">
      <v-col>
        <v-btn color="grey" dark @click="cancelEdit" block>
          Cancel
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="rgb(11, 95, 75)"
          dark
          block
          :loading="$network.busy"
          @click="updatePlant"
        >
          Save
        </v-btn>
      </v-col>
    </v-card-actions>
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
      locations: [],
    };
  },
  props: ['plant'],
  methods: {
    updatePlant() {
      this.axios.put(`plant/${this.plant.id}`, this.plant).then(() => {
        this.editMode = false;
        this.notify('Plant Updated!');
      });
    },
    cancelEdit() {
      this.editMode = false;
      this.$emit('refreshPlant');
    },
    getLocations() {
      this.axios.get(`location`).then(response => {
        this.locations = response.data;
      });
    },
  },
  mounted() {
    this.getLocations();
  },
};
</script>
