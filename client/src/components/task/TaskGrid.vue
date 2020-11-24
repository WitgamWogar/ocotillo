<template>
  <v-container>
    <v-row justify="center" class="mt-6">
      <v-col cols="12" sm="7" v-if="activityTypes.length">
        <v-card style="background-color:transparent">
          <v-toolbar flat color="rgba(0, 0, 0, 0.41)" dark>
            <v-toolbar-title>Current Tasks</v-toolbar-title>
          </v-toolbar>
          <v-tabs
            v-model="tab"
            background-color="rgba(0, 0, 0, 0.41)"
            vertical
            dark
            id="task-tabs"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab
              v-for="activityType in activityTypes"
              :href="`#${activityType.name}-tab`"
              :key="activityType.id"
              :color="activityType.color"
              ripple
            >
              <v-icon left :color="activityType.color">{{
                activityType.icon
              }}</v-icon>

              {{ activityType.name }}

              <v-badge
                v-if="currentTasks[activityType.id]"
                :color="activityType.color"
                :content="currentTasks[activityType.id].length"
                inline
              >
              </v-badge>
            </v-tab>

            <v-tab-item
              v-for="activityType in activityTypes"
              :key="activityType.id"
              :value="`${activityType.name}-tab`"
            >
              <v-list two-line min-height="100%">
                <template>
                  <v-subheader class="text-button">
                    <span
                      v-if="
                        currentTasks[activityType.id] &&
                          currentTasks[activityType.id].length
                      "
                    >
                      {{ currentTasks[activityType.id].length }}
                      {{
                        currentTasks[activityType.id].length > 1
                          ? 'Plants'
                          : 'Plant'
                      }}
                      to
                      {{ activityType.name }}
                    </span>
                    <span v-else>No Plants to {{ activityType.name }}</span>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="success"
                      small
                      @click="completeAll(currentTasks[activityType.id])"
                      v-if="
                        currentTasks[activityType.id] &&
                          currentTasks[activityType.id].length
                      "
                      >Complete All</v-btn
                    >
                  </v-subheader>

                  <v-list-item
                    v-for="task in currentTasks[activityType.id]"
                    :key="task.id"
                  >
                    <v-list-item-avatar>
                      <v-img
                        :src="getImage(task.plant)"
                        class="pointer"
                        @click="
                          $router.push({
                            name: 'plant.details',
                            params: { plantId: task.plant.id },
                          })
                        "
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="pointer"
                        @click="
                          $router.push({
                            name: 'plant.details',
                            params: { plantId: task.plant.id },
                          })
                        "
                      >
                        {{ task.plant.common_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <span class="red--text" v-if="task.is_overdue">
                          Due: {{ task.due_date | moment('MM/DD/YYYY') }}
                        </span>
                        <span v-else>
                          Due: Today
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-row no-gutters>
                        <v-col>
                          <v-icon
                            large
                            :color="task.activityType.color"
                            @click="openSnoozeTaskDialog(task)"
                          >
                            mdi-alarm-snooze
                          </v-icon>
                        </v-col>
                        <v-col>
                          <v-icon
                            large
                            :color="task.activityType.color"
                            @click="completeTask(task)"
                          >
                            mdi-check-circle-outline
                          </v-icon>
                        </v-col>
                      </v-row>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="snoozeTaskDialog" max-width="450">
      <v-card>
        <v-card-title>Snooze Task</v-card-title>

        <v-card-text>
          <v-text-field
            label="Days to Snooze For"
            @keyup.native.enter="save"
            v-model="snoozingTask.snooze_days"
            autofocus
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="snoozeTaskDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="snoozeTask"
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
export default {
  components: {},
  data: () => ({
    currentTasks: [],
    actionBtn: false,
    tab: null,
    snoozingTask: {},
    activityTypes: [],
    snoozeTaskDialog: false,
  }),
  methods: {
    getCurrentTasks() {
      this.axios.get(`scheduled-task`, { status: 'current' }).then(response => {
        this.currentTasks = this.groupObject(
          response.data.data,
          'activity_type_id',
        );
        if (!response.data.data.length) {
          this.notify(
            'You have completed all your tasks for today!',
            'success',
            0,
            true,
          );
        }
      });
    },
    getImage(plant) {
      let url =
        'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg';

      if (plant.photos && plant.photos.length) {
        // TODO use config for host or include a url property via transformer on backend
        url =
          'http://localhost:3000/' + plant.photos[plant.photos.length - 1].path;
      }

      return url;
    },
    getActivityTypes() {
      this.axios.get(`activity/types`).then(response => {
        this.activityTypes = response.data.data;
      });
    },
    openSnoozeTaskDialog(task) {
      this.snoozingTask = task;
      this.snoozeTaskDialog = true;
    },
    snoozeTask() {
      this.axios
        .put(`scheduled-task/${this.snoozingTask.id}`, this.snoozingTask)
        .then(() => {
          this.notify('Task Snoozed!');
          this.getCurrentTasks();
          this.snoozingTask = {};
          this.snoozeTaskDialog = false;
        });
    },
    completeTask(task) {
      this.axios
        .post(`activity`, {
          plant_id: task.plant.id,
          type_id: task.activityType.id,
          performed_at: new Date().toISOString(),
        })
        .then(() => {
          this.getCurrentTasks();
          this.notify('Task Completed!');
        });
    },
    completeAll(tasks) {
      this.axios.post(`scheduled-task/complete-batch`, tasks).then(() => {
        this.notify('Tasks Completed!');
        this.getCurrentTasks();
      });
    },
  },
  mounted() {
    this.getCurrentTasks();
    this.getActivityTypes();
  },
};
</script>

<style>
#task-tabs {
  border-radius: 0;
}
#task-tabs .v-tab {
  justify-content: initial;
}
/* #task-tabs .theme--light.v-tabs-items {
  background-color: transparent !important;
} */
</style>
