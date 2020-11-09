<template>
  <v-card width="400">
    <v-img
      height="200px"
      src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
    >
      <v-app-bar flat color="#4CAF5078" dense>
        <v-toolbar-title class="title white--text pl-0">
          {{ plant.common_name }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-speed-dial
          v-model="actionBtn"
          left
          direction="left"
          transition="slide-x-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="actionBtn" color="white" class="elevation-0" dark text>
              <v-icon v-if="actionBtn">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn fab dark small color="red" @click="deletePlant">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-app-bar>

      <v-card-title class="white--text mt-8"> </v-card-title>
    </v-img>
    <v-card-text>
      <div class="font-weight-bold mb-2">
        <i>{{ plant.scientific_name }}</i>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['plant'],
  data: () => ({
    actionBtn: false,
  }),
  methods: {
    deletePlant() {
      //TODO add confirmation
      this.axios.delete(`http://localhost:3000/api/plant`, {params:{
        plantId: this.plant._id
        }}).then(() => {
          this.$eventHub.$emit('plant-list-updated');
          this.notify("Plant Deleted!");
      });
    },
  }
};
</script>
