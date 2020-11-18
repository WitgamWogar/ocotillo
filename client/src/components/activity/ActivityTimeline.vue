<template>
  <div>
    <v-timeline dense clipped class="pt-0">
      <v-timeline-item
        :color="activityMap[item.type].color"
        :icon="item.icon"
        fill-dot
        v-for="(item, i) in timeline"
        :key="i"
      >
        <template v-slot:icon>
          <v-hover v-slot="{ hover }" style="cursor:pointer">
            <v-speed-dial v-if="hover" direction="right">
              <template v-slot:activator>
                <v-btn :value="hover" color="blue darken-2" dark fab small>
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </template>
              <v-btn fab dark small color="green" @click="editActivity(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn fab dark small color="red" @click="deleteActivity(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>

            <v-icon dark v-else>{{ item.icon }}</v-icon>
          </v-hover>
        </template>

        <v-row justify="space-between">
          <v-col cols="7">
            <span class="overline">{{ activityMap[item.type].text }}</span>
            <div>
              {{ item.note }}
            </div>
          </v-col>
          <v-col class="text-right" cols="5">
            <strong :class="`${activityMap[item.type].color}--text button`">{{
              item.performed_at | moment('MM/DD/YYYY')
            }}</strong>
          </v-col>
        </v-row>
      </v-timeline-item>

      <!-- TODO add a timeline item here for acquired_at -->

      <ActivityFormDialog
        @close="activityFormDialogOpen = false"
        :plant="plant"
        @saved="handleActivitySave"
        ref="activityFormDialog"
        :open="activityFormDialogOpen"
      />
    </v-timeline>
    <h3 class="pa-5" v-if="!timeline.length">
      There isn't any activity here yet...
    </h3>
  </div>
</template>

<script>
import ActivityFormDialog from './ActivityFormDialog';
import moment from 'moment';

export default {
  components: {
    ActivityFormDialog,
  },
  props: ['plant'],
  data() {
    return {
      activityFormDialogOpen: false,
      activityMap: {
        watered: {
          color: 'blue',
          text: 'Watered',
          type: 'watered',
        },
        misted: {
          color: 'cyan',
          text: 'Misted',
          type: 'misted',
        },
        pruned: {
          color: 'pink',
          text: 'Pruned',
          type: 'pruned',
        },
        fertilized: {
          color: 'teal',
          text: 'Fertilized',
          type: 'fertilized',
        },
        transplanted: {
          color: '#6D4C41',
          text: 'Transplanted',
          type: 'transplanted',
        },
      },
    };
  },
  computed: {
    timeline() {
      if (this.plant && this.plant.activities) {
        return this.plant.activities.slice().reverse();
      }

      return [];
    },
  },
  methods: {
    editActivity(activity) {
      this.$refs.activityFormDialog.setActivity(activity);
      this.$refs.activityFormDialog.setActivityType(
        this.activityMap[activity.type],
      );
      this.activityFormDialogOpen = true;
    },
    deleteActivity(activity) {
      let name = this.activityMap[activity.type].text;
      let date = moment(activity.performed_at).format('MMMM Do YYYY');
      this.$confirm(
        `Are you sure want to delete this activity (${name} on ${date})?`,
      ).then(confirmed => {
        if (confirmed) {
          this.axios.delete(`activity/${activity.id}`).then(() => {
            this.$emit('refreshPlant');
            this.notify('Activity Removed!');
          });
        }
      });
    },
    handleActivitySave() {
      this.$emit('refreshPlant');
      this.activityFormDialogOpen = false;
    },
  },
};
</script>
