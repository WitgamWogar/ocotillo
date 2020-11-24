<template>
  <v-card color="#ffffffd4">
    <v-card-title>
      <v-icon class="mr-3">mdi-calendar-text-outline</v-icon>
      <span class="headline">Current Tasks</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-4" style="position:relative">
      <v-list subheader two-line color="transparent" v-if="currentTasks.length">
        <v-list-item v-for="task in currentTasks" :key="task.id">
          <v-list-item-avatar>
            <v-hover v-slot="{ hover }" style="cursor:pointer">
              <v-icon v-if="hover" color="success" @click="completeTask(task)"
                >mdi-check</v-icon
              >
              <v-icon v-else :color="task.activityType.color" dark>
                {{ task.activityType.icon }}
              </v-icon>
            </v-hover>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-button">
              {{ task.activityType.name }}
            </v-list-item-title>

            <v-list-item-subtitle class="text--primary">
              <span class="red--text" v-if="task.is_overdue">
                Due: {{ task.due_date | moment('MM/DD/YYYY') }}
              </span>
              <span v-else>
                Due: Today
              </span>
            </v-list-item-subtitle>

            <v-list-item-subtitle class="caption">
              Last completed on
              {{ task.last_completed_at | moment('MM/DD/YYYY') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <h2 v-else>All tasks are complete! Nice job!</h2>
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
      currentTasks: [],
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
    getCurrentTasks() {
      this.axios
        .get(`scheduled-task/plant/${this.plant.id}/current`)
        .then(response => {
          this.currentTasks = response.data.data;
        });
    },
    getActivityTypes() {
      this.axios.get(`activity/types`).then(response => {
        this.activityTypes = response.data.data;
      });
    },
    completeTask(task) {
      this.axios
        .post(`activity`, {
          plant_id: this.plant.id,
          type_id: task.activityType.id,
          performed_at: new Date().toISOString(),
        })
        .then(() => {
          this.getCurrentTasks();
          this.notify('Task Complete!');
          this.$emit('refreshPlant');
        });
    },
  },
  mounted() {
    this.getActivityTypes();
    this.getCurrentTasks();
  },
};
</script>
