<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title class="pb-0">
        <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
        <span class="headline"
          >{{ activity.id ? 'Edit' : 'Add' }} Activity:
          {{ activity.text }}</span
        >
      </v-card-title>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" sm="6" md="4">
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
                  v-model="performed_at"
                  label="Date Performed"
                  readonly
                  hide-details
                  class="mb-0"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="performed_at"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="Activity Notes"
              placeholder="Write something about this activity..."
              hide-details
              autofocus
              v-model="activity.note"
              value=""
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="activity.id ? updateActivity() : createActivity()"
          :loading="$network.busy"
        >
          Save
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
      dateMenu: false,
      performed_at: new Date().toISOString().substr(0, 10),
      activity: {
        note: '',
        performed_at: new Date().toISOString(),
      },
    };
  },
  methods: {
    createActivity() {
      this.transformActivity();
      this.axios.post(`activity`, this.activity).then(() => {
        this.notify('Activity Added!');
        this.$emit('saved');
      });
    },
    updateActivity() {
      this.transformActivity();
      this.axios.put(`activity/${this.activity.id}`, this.activity).then(() => {
        this.notify('Activity Updated!');
        this.$emit('saved');
      });
    },
    transformActivity() {
      this.activity.plant_id = this.plant.id;
      this.activity.type = this.activity.type || this.activity.value;
      this.activity.performed_at = new Date(this.performed_at).toISOString();
    },
    setActivityType(activityType) {
      this.activity = Object.assign(this.activity, activityType);
    },
    setActivity(activity) {
      this.activity = activity;
    },
  },
};
</script>
