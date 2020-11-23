<template>
  <v-card color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-calendar-text-outline</v-icon>
      <span class="headline">Schedules</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-4" style="position:relative">
      <v-btn
        color="success"
        dark
        fab
        small
        absolute
        right
        top
        @click="openTaskFormDialog({})"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>

      <v-list
        subheader
        two-line
        color="transparent"
        v-if="scheduledTasks.length"
      >
        <v-list-item v-for="task in scheduledTasks" :key="task.id">
          <v-list-item-avatar>
            <v-icon :color="task.activityType.color" dark>
              {{ task.activityType.icon }}
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-button">
              {{ task.activityType.name }}
            </v-list-item-title>

            <v-list-item-subtitle class="text--primary">
              Every {{ task.interval_days }} Days
            </v-list-item-subtitle>

            <v-list-item-subtitle class="caption">
              Started on {{ task.start_at | moment('MM/DD/YYYY') }}<br />
              Last Performed:
              <span v-if="task.last_completed_at">
                {{ task.last_completed_at | moment('MM/DD/YYYY') }}
              </span>
              <span v-else>Never</span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-hover v-slot="{ hover }" style="cursor:pointer">
              <v-speed-dial v-if="true" direction="left">
                <template v-slot:activator>
                  <v-btn :value="hover" color="blue darken-2" dark fab x-small>
                    <v-icon>
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn
                  fab
                  dark
                  x-small
                  color="green"
                  @click="openTaskFormDialog(task)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  x-small
                  color="red"
                  @click="deleteScheduledTask(task)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
              <v-icon v-else :color="task.activityType.color" dark>
                {{ task.activityType.icon }}
              </v-icon>
            </v-hover>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-dialog v-model="taskFormDialog" max-width="500">
      <v-card>
        <v-card-title>
          {{
            editingTask.id ? 'Edit Scheduled Task' : 'Create a Scheduled Task'
          }}
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="editingTask.activity_type_id"
            :items="activityTypes"
            :error-messages="$validator.get('activity')"
            item-value="id"
            item-text="name"
            label="Activity"
            required
          >
            <template slot="item" slot-scope="data">
              <v-icon :color="data.item.color">{{ data.item.icon }}</v-icon>
              {{ data.item.name }}
            </template>
          </v-select>
          <v-text-field
            label="Every x Days"
            v-model="editingTask.interval_days"
            type="number"
          ></v-text-field>
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
                v-model="editingTask.$start_at"
                label="Start Date"
                readonly
                hide-details
                class="mb-0"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="editingTask.$start_at"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="taskFormDialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="$network.busy"
            @click="saveScheduledTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
// import moment from 'moment';

export default {
  components: {},
  props: ['plant'],
  data() {
    return {
      taskFormDialog: false,
      dateMenu: false,
      fab: false,
      scheduleSpeedDial: false,
      editingTask: {},
      activityTypes: [],
      scheduledTasks: [],
    };
  },
  watch: {
    'editingTask.$start_at': function(newVal) {
      this.editingTask.start_at = new Date(newVal).toISOString();
    },
    taskFormDialog() {
      this.editingTask.$start_at = this.editingTask.start_at
        ? new Date(this.editingTask.start_at).toISOString().substr(0, 10)
        : new Date().toISOString().substr(0, 10);
    },
  },
  methods: {
    getScheduledTasks() {
      this.axios.get(`scheduled-task/${this.plant.id}`).then(response => {
        this.scheduledTasks = response.data.data;
      });
    },
    getActivityTypes() {
      this.axios.get(`activity/types`).then(response => {
        this.activityTypes = response.data.data;
      });
    },
    saveScheduledTask() {
      this.editingTask.start_at = new Date(
        this.editingTask.$start_at,
      ).toISOString();

      if (this.editingTask.id) {
        this.updateScheduledTask();
        return;
      }

      this.editingTask.plant_id = this.plant.id;
      this.axios.post(`scheduled-task`, this.editingTask).then(() => {
        this.notify('Schedule Added!');
        this.taskFormDialog = false;
        this.getScheduledTasks();
      });
    },
    updateScheduledTask() {
      this.axios
        .put(`scheduled-task/${this.editingTask.id}`, this.editingTask)
        .then(() => {
          this.notify('Schedule Updated!');
          this.taskFormDialog = false;
          this.getScheduledTasks();
        });
    },
    openTaskFormDialog(task) {
      this.editingTask = task;
      this.taskFormDialog = true;
    },
    deleteScheduledTask(task) {
      this.$confirm(
        `Are you sure want to delete this task (${task.activityType.name} every ${task.interval_days} days)?`,
      ).then(confirmed => {
        if (confirmed) {
          this.axios.delete(`scheduled-task/${task.id}`).then(() => {
            this.notify('Scheduled Task Removed!');
            this.getScheduledTasks();
          });
        }
      });
    },
  },
  mounted() {
    this.getActivityTypes();
    this.getScheduledTasks();
  },
};
</script>
