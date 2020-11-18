<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="6">
        <v-row justify="center">
          <v-btn class="mb-5" color="success" @click="openLocationForm({})"
            >Add Location</v-btn
          >
        </v-row>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="location in locations"
            :key="location.id"
            style="background-color:#ffffffd4;"
          >
            <v-expansion-panel-header disable-icon-rotate>
              {{ location.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span v-if="!location.plants.length"
                >No plants are assigned to this location.</span
              >
              <div class="text-right">
                <v-icon color="primary" @click="openLocationForm(location)">
                  mdi-pencil
                </v-icon>
                <v-icon color="red" @click="deleteLocation(location)">
                  mdi-delete
                </v-icon>
              </div>
              <MiniPlantGrid :plants="location.plants" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog v-model="editLocationDialogOpen" max-width="450">
      <v-card>
        <v-card-title
          >{{ editingLocation.id ? 'Edit' : 'Create' }} Location</v-card-title
        >

        <v-card-text>
          <v-text-field
            label="Location Name"
            @keyup.native.enter="save"
            v-model="editingLocation.name"
            autofocus
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="editLocationDialogOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
            :loading="$network.busy"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import MiniPlantGrid from '../plant/MiniPlantGrid';

export default {
  components: {
    MiniPlantGrid,
  },
  data: () => ({
    editLocationDialogOpen: false,
    editingLocation: {},
    locations: [],
  }),
  methods: {
    save() {
      if (this.editingLocation.id) {
        this.updateLocation();
      } else {
        this.createLocation();
      }
    },
    updateLocation() {
      this.axios
        .put(`location/${this.editingLocation.id}`, this.editingLocation)
        .then(() => {
          this.notify('Location Updated!');
          this.editLocationDialogOpen = false;
        });
    },
    createLocation() {
      this.axios.post(`location`, this.editingLocation).then(() => {
        this.notify('Location Added!');
        this.editLocationDialogOpen = false;
        this.getLocations();
      });
    },
    deleteLocation(location) {
      this.$confirm(
        `Are you sure want to delete this location (${location.name})? 
        Plants assigned to this location will not be deleted, but they will be homeless.`,
      ).then(confirmed => {
        if (confirmed) {
          this.axios.delete(`location/${location.id}`).then(() => {
            this.notify('Location Deleted!');
            this.getLocations();
          });
        }
      });
    },
    openLocationForm(location) {
      this.editingLocation = location;
      this.editLocationDialogOpen = true;
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
