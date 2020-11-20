<template>
  <div id="plant-details-container" class="page-wrapper">
    <v-container v-if="!notFound">
      <v-row justify="center">
        <h1 class="white--text">{{ plant.common_name }}</h1>
      </v-row>
      <template>
        <v-card color="transparent">
          <v-tooltip bottom v-if="plant.type === 'wishlist'">
            <template v-slot:activator="{ on }">
              <v-fab-transition>
                <v-btn
                  color="green"
                  fab
                  dark
                  small
                  absolute
                  top
                  right
                  v-on="on"
                  @click="plantFormDialogOpen = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>Add to your collection</span>
          </v-tooltip>

          <v-tabs
            v-model="tab"
            background-color="rgba(5, 32, 26, 0.64)"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#details-tab">
              Details & Photos
              <v-icon>mdi-sprout-outline</v-icon>
            </v-tab>

            <v-tab href="#tasks-tab">
              Tasks
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-tab>

            <v-tab href="#schedule-tab" v-if="plant.type === 'collection'">
              Schedules
              <v-icon>mdi-calendar-text-outline</v-icon>
            </v-tab>

            <v-tab href="#activity-tab" v-if="plant.type === 'collection'">
              Activity
              <v-icon>mdi-history</v-icon>
            </v-tab>

            <v-tab href="#notes-tab">
              Notes
              <v-icon>mdi-book-open-page-variant-outline</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" style="background-color:transparent;">
            <v-tab-item value="details-tab">
              <v-row justify="center">
                <v-col cols="6">
                  <PlantDetailsTable
                    :plant="plant"
                    @refreshPlant="getPlantData"
                  />
                </v-col>
                <v-col cols="6">
                  <PhotoSlider :photos="plant.photos" />
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item value="tasks-tab">
              <v-row justify="center">
                <v-col cols="7">
                  <CurrentTasksList :plant="plant" />
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item value="schedule-tab">
              <v-row justify="center">
                <v-col cols="7">
                  <PlantScheduleList :plant="plant" />
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item value="activity-tab">
              <v-row justify="center">
                <v-col cols="7">
                  <ActivityCard :plant="plant" @refreshPlant="getPlantData" />
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item value="notes-tab">
              <PlantCareNotes :plant="plant" v-if="plant && plant.id" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </template>
    </v-container>
    <NotFound
      v-else
      message="This plant can't be located. Maybe it was deleted?"
    />

    <PlantFormDialog
      v-if="plant && plant.id"
      title="Move Plant to Collection"
      @close="plantFormDialogOpen = false"
      @saved="getPlantData"
      :open="plantFormDialogOpen"
      :wishlist-transfer-mode="true"
      :editing-plant="plant"
    />
  </div>
</template>

<script>
import NotFound from '../../components/common/NotFound';
import ActivityCard from '../../components/activity/ActivityCard';
import PhotoSlider from '../../components/ui/PhotoSlider';
import PlantDetailsTable from '../../components/plant/PlantDetailsTable';
import PlantCareNotes from '../../components/plant/PlantCareNotes';
import PlantFormDialog from '../../components/plant/PlantFormDialog';
import PlantScheduleList from '../../components/plant/PlantScheduleList';
import CurrentTasksList from '../../components/task/CurrentTaskList';

export default {
  components: {
    NotFound,
    ActivityCard,
    PhotoSlider,
    PlantDetailsTable,
    PlantCareNotes,
    PlantFormDialog,
    PlantScheduleList,
    CurrentTasksList,
  },
  data() {
    return {
      plant: {},
      notFound: false,
      editMode: false,
      tab: null,
      plantFormDialogOpen: false,
    };
  },
  methods: {
    getPlantData() {
      this.axios
        .get(`plant/${this.$route.params.plantId}`)
        .then(response => {
          this.plant = response.data.data;
        })
        .catch(() => {
          this.notFound = true;
        });
    },
  },
  created() {
    this.getPlantData();
  },
};
</script>

<style>
#plant-details-container {
  background-image: url('../../assets/plants-background.jpeg');
}
</style>
