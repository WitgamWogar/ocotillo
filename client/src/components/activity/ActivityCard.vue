<template>
  <v-card color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-clock-start</v-icon>
      <span class="headline">Activity</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-4" style="position:relative">
      <v-speed-dial
        v-model="activitySpeedDial"
        class="mt-n10"
        top
        right
        absolute
        dark
        direction="bottom"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="success" dark fab small>
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          v-for="activity in activityTypes"
          fab
          dark
          small
          :color="activity.color"
          :key="activity.value"
          @click="openNewActivityDialog(activity)"
        >
          <v-icon>{{ activity.icon }}</v-icon>
        </v-btn>
      </v-speed-dial>

      <ActivityTimeline :plant="plant" @refreshPlant="handleActivitySave" />
    </v-card-text>

    <ActivityFormDialog
      @close="createActivityDialogOpen = false"
      :plant="plant"
      @saved="handleActivitySave"
      ref="createActivityDialog"
      :open="createActivityDialogOpen"
    />
  </v-card>
</template>

<script>
import ActivityFormDialog from './ActivityFormDialog';
import ActivityTimeline from './ActivityTimeline';

export default {
  components: {
    ActivityFormDialog,
    ActivityTimeline,
  },
  props: ['plant'],
  data() {
    return {
      createActivityDialogOpen: false,
      fab: false,
      activitySpeedDial: false,
      activityTypes: [
        {
          text: 'Watered',
          value: 'watered',
          icon: 'mdi-watering-can-outline',
          color: 'blue',
        },
        { text: 'Misted', value: 'misted', icon: 'mdi-spray', color: 'cyan' },
        {
          text: 'Pruned',
          value: 'pruned',
          icon: 'mdi-content-cut',
          color: 'pink',
        },
        {
          text: 'Fertilized',
          value: 'fertilized',
          icon: 'mdi-bottle-tonic-outline',
          color: 'teal',
        },
        {
          text: 'Transplanted',
          value: 'transplanted',
          icon: 'mdi-shovel',
          color: '#6D4C41',
        },
      ],
    };
  },
  methods: {
    openNewActivityDialog(activityType) {
      this.$refs.createActivityDialog.setActivityType(activityType);
      this.createActivityDialogOpen = true;
    },
    handleActivitySave() {
        this.$emit('refreshPlant');
        this.createActivityDialogOpen = false;
    }
  },
};
</script>
