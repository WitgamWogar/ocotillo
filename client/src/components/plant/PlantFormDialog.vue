<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ title || 'Plant Form' }}
        </span>
      </v-card-title>
      <v-card-subtitle v-if="wishlistTransferMode">
        You obtained a plant from your wishlist? Awesome!<br />
        Finish filling out these details and transfer it to your collection!
      </v-card-subtitle>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Scientific Name"
                hint="Jasminum sambac"
                v-model="plant.scientific_name"
                :error-messages="$validator.get('scientific_name')"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Common Name"
                v-model="plant.common_name"
                :error-messages="$validator.get('common_name')"
                hint="Arabian Jasmine"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Nickname"
                v-model="plant.nickname"
                :error-messages="$validator.get('nickname')"
                :disabled="wishlistMode"
                hint="e.g. Orlando Bloom"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="plant.$acquired_at"
                    label="Acquisition Date"
                    readonly
                    :disabled="wishlistMode"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="plant.$acquired_at"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="plant.source"
                :items="[
                  'Purchase',
                  'Purchased Seed',
                  'Wild Seed',
                  'Harvested Seed',
                  'Clone',
                ]"
                :error-messages="$validator.get('source')"
                label="Source"
                :disabled="wishlistMode"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="plant.location_id"
                :items="locations"
                item-text="name"
                item-value="id"
                :disabled="wishlistMode"
                :error-messages="$validator.get('location')"
                label="Location"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                v-model="plant.photos"
                small-chips
                multiple
                :label="editingPlant ? 'Additional Photos' : 'Photos'"
                :hint="
                  editingPlant
                    ? 'Upload additional photos for the plant. Photos can be removed on the plant details page.'
                    : ''
                "
                :persistent-hint="!!editingPlant"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
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
</template>

<script>
export default {
  props: ['open', 'editingPlant', 'wishlistTransferMode', 'title'],
  data() {
    return {
      dateMenu: false,
      plant: {
        scientific_name: null,
        common_name: null,
        nickname: null,
        $acquired_at: new Date().toISOString().substr(0, 10),
        acquired_at: new Date().toISOString(),
        source: null,
        location_id: null,
        type: null,
        photos: [],
      },
      locations: [],
      wishlistMode: false,
    };
  },
  watch: {
    'plant.$acquired_at': function(newVal) {
      this.plant.acquired_at = new Date(newVal).toISOString();
    },
    open() {
      if (!this.open) {
        Object.assign(this.$data, this.$options.data.call(this)); // Reset
      } else {
        this.plant.type = this.$route.name;
        if (this.editingPlant) {
          this.plant = Object.assign(this.plant, this.editingPlant);
          this.plant.photos = [];
        }
        this.wishlistMode =
          !this.wishlistTransferMode && this.plant.type === 'wishlist';
      }
    },
  },
  methods: {
    save() {
      if (this.plant.id) {
        this.updatePlant();
      } else {
        this.createPlant();
      }
    },
    createPlant() {
      this.axios.post(`plant`, this.plant).then(response => {
        if (this.plant.photos.length) {
          this.plant.id = response.data.data.id;
          this.uploadPhotos();
        } else {
          this.handleSuccess();
        }
      });
    },
    updatePlant() {
      if (this.wishlistTransferMode) {
        this.plant.type = 'collection';
      }

      this.axios.put(`plant/${this.plant.id}`, this.plant).then(() => {
        if (this.plant.photos.length) {
          this.uploadPhotos(this.plant.id);
        } else {
          this.handleSuccess(
            this.wishlistTransferMode ? 'Added to Collection' : 'Updated',
          );
        }
      });
    },
    uploadPhotos() {
      let formData = new FormData();

      this.plant.photos.forEach(photo => {
        formData.append('photos', photo);
      });

      formData.append('plantId', this.plant.id);

      this.axios
        .post('plant/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.handleSuccess();
        });
    },
    handleSuccess(action = null) {
      if (action) {
        this.notify(
          `Plant ${action}!`,
          'success',
          3000,
          false,
          'View Plant',
          `/plants/${this.plant.id}`,
        );
      }

      this.$eventHub.$emit('plant-list-updated');
      this.$emit('saved');
      this.$emit('close');
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
