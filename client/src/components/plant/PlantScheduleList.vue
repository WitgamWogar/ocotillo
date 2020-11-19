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
        @click="createScheduleDialogOpen = true"
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
            <v-list-item-title>
              {{ task.activityType.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              Every {{ task.interval_days }} Days
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- TODO BREAK THIS FILE UP -->
    <v-dialog v-model="createScheduleDialogOpen" max-width="500">
      <v-card>
        <v-card-title>Add a new Schedule</v-card-title>
        <v-card-text>
          <v-select
            v-model="newSchedule.activity_type_id"
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
            v-model="newSchedule.interval_days"
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
                v-model="newSchedule.$start_at"
                label="Start Date"
                readonly
                hide-details
                class="mb-0"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newSchedule.$start_at"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="createScheduleDialogOpen = false"
          >
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
      createScheduleDialogOpen: false,
      dateMenu: false,
      fab: false,
      scheduleSpeedDial: false,
      newSchedule: {
        activity_type_id: null,
        interval_days: null,
        $start_at: new Date().toISOString().substr(0, 10),
        start_at: new Date().toISOString(),
      },
      activityTypes: [],
      scheduleOptions: [
        {
          icon: '',
          text: '',
          value: '',
        },
      ],
      scheduledTasks: [],
      //TODO move all of these activity maps to a config file and load in where needed instead of redefining in comps
      activityMap: {
        watered: {
          color: 'blue',
          text: 'Watered',
          value: 'watered',
          icon: 'mdi-watering-can-outline',
        },
        misted: {
          text: 'Misted',
          value: 'misted',
          icon: 'mdi-spray',
          color: 'cyan',
        },
        pruned: {
          text: 'Pruned',
          value: 'pruned',
          icon: 'mdi-content-cut',
          color: 'pink',
        },
        fertilized: {
          color: 'teal',
          text: 'Fertilized',
          value: 'fertilized',
          icon: 'mdi-bottle-tonic-outline',
        },
        transplanted: {
          text: 'Transplanted',
          value: 'transplanted',
          icon: 'mdi-shovel',
          color: '#6D4C41',
        },
      },
      activityOptions: [
        {
          color: 'blue',
          text: 'Water',
          value: 'watered',
          icon: 'mdi-watering-can-outline',
        },
        {
          text: 'Mist',
          value: 'misted',
          icon: 'mdi-spray',
          color: 'cyan',
        },
        {
          text: 'Prun',
          value: 'pruned',
          icon: 'mdi-content-cut',
          color: 'pink',
        },
        {
          color: 'teal',
          text: 'Fertilize',
          value: 'fertilized',
          icon: 'mdi-bottle-tonic-outline',
        },
        {
          text: 'Transplant',
          value: 'transplanted',
          icon: 'mdi-shovel',
          color: '#6D4C41',
        },
      ],
    };
  },
  watch: {
    'newSchedule.$start_at': function(newVal) {
      this.newSchedule.start_at = new Date(newVal).toISOString();
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
      this.newSchedule.plant_id = this.plant.id;
      this.axios.post(`scheduled-task`, this.newSchedule).then(() => {
        this.notify('Schedule Added!');
        this.createScheduleDialogOpen = false;
        this.getScheduledTasks();
      });
    },
  },
  mounted() {
    this.getActivityTypes();
    this.getScheduledTasks();
  },
};
</script>
