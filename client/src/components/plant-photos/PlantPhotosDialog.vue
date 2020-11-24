<template>
  <v-dialog v-model="open" persistent max-width="75%">
    <v-card id="photo-dialog-card" height="80vh">
      <v-card-title>
        <span class="headline">Manage Photos</span>
        <v-spacer></v-spacer>
        <v-icon @click="$emit('close')">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-file-input
          v-model="uploadList"
          small-chips
          multiple
          color="rgb(11, 95, 75)"
          class="mt-5 mb-1"
          label="Add Photos"
          outlined
          :disabled="$network.busy"
          :loading="$network.busy"
          counter
          hint="Upload additional photos for the plant."
          persistent-hint
        >
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 4" color="rgb(11, 95, 75)" dark label small>
              {{ text }}
            </v-chip>
            <span
              v-else-if="index === 4"
              class="overline grey--text text--darken-3 mx-2"
            >
              +{{ uploadList.length - 4 }} File(s)
            </span>
          </template>
          <template v-slot:append v-if="uploadList.length">
            <v-icon color="green" @click="uploadPhotos">
              mdi-upload
            </v-icon>
          </template>
        </v-file-input>
      </v-card-text>

      <v-card-text class="scroll-v-text">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="photo in plant.photos"
            :key="photo.id"
          >
            <v-card>
              <v-img
                height="200px"
                :src="'http://localhost:3000/' + photo.path"
              ></v-img>

              <v-card-actions>
                <span class="text-button">{{
                  photo.created_at | moment('MM/DD/YYYY')
                }}</span>
                <v-spacer></v-spacer>
                <v-btn color="error" small @click="deletePhoto(photo)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  props: ['open', 'plant'],
  data() {
    return {
      uploadList: [],
    };
  },
  methods: {
    uploadPhotos() {
      let formData = new FormData();

      this.uploadList.forEach(photo => {
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
          this.notify('Photos Uploaded!');
          this.$emit('refreshPlant');
          this.uploadList = [];
        });
    },
    deletePhoto(photo) {
      this.$confirm(`Are you sure want to delete this photo?`).then(
        confirmed => {
          if (confirmed) {
            this.axios.delete(`photo/${photo.id}`).then(() => {
              this.notify('Photo Removed!');
              this.$emit('refreshPlant');
            });
          }
        },
      );
    },
  },
};
</script>

<style>
#photo-dialog-card {
  display: flex !important;
  flex-direction: column;
}
#photo-dialog-card .scroll-v-text {
  flex-grow: 1;
  overflow: auto;
}
</style>
