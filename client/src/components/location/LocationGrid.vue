<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="6">
        <v-row justify="center">
          <v-btn class="mb-5" color="success">Add Location</v-btn>
        </v-row>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="(location, i) in locations"
            :key="i"
            style="background-color:#ffffffd4;"
          >
            <v-expansion-panel-header disable-icon-rotate>
              {{ location.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="text-right">
                <v-icon color="primary">
                  mdi-pencil
                </v-icon>
                <v-icon color="red">
                  mdi-delete
                </v-icon>
              </div>
              <MiniPlantGrid />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniPlantGrid from '../plant/MiniPlantGrid';

export default {
  components: {
    MiniPlantGrid,
  },
  data: () => ({
    locations: [
      {
        id: 1,
        name: 'Living Room',
        plantCount: 25,
        plants: [
          {
            common_name: 'Jasmine',
          },
        ],
      },
      {
        id: 2,
        name: 'Patio',
        plantCount: 19,
      },
      {
        id: 3,
        name: 'Loft',
        plantCount: 21,
      },
      {
        id: 4,
        name: 'Kitchen',
        plantCount: 10,
      },
    ],
  }),
  methods: {
    getPlants() {
      //   this.axios.get(`plant`).then((response) => {
      //     this.plants = response.data.data;
      //   });
    },
  },
  mounted() {
    //   this.getPlants();
  },
  created() {
    // let _this = this;
    // this.$eventHub.$on('plant-list-updated', function() {
    //   _this.getPlants();
    // });
  },
};
</script>
