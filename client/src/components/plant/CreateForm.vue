<template>
  <v-card>
    <v-card-title>
      <span class="headline">New Plant</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Scientific Name"
              hint="Jasminum sambac"
              :error-messages="$validator.get('scientific_name')"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Common Name"
              :error-messages="$validator.get('common_name')"
              hint="Arabian Jasmine"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Nickname"
              :error-messages="$validator.get('nickname')"
              hint="e.g. Orlando Bloom"
              persistent-hint
            ></v-text-field>
          </v-col>
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
                  v-model="plant.acquired_at"
                  label="Acquisition Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="plant.acquired_at"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              :items="[
                'Purchase',
                'Purchased Seed',
                'Wild Seed',
                'Harvested Seed',
                'Clone',
              ]"
              :error-messages="$validator.get('source')"
              label="Source"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <!-- TODO this will be propagated from locations entered by user -->
            <v-select
              :items="[
                'Kitchen',
                'Back Patio',
                'Front Patio',
                'Living Room',
                'Bathroom',
                'Yard',
              ]"
              :error-messages="$validator.get('location')"
              label="Location"
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('cancel')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="store" :loading="$network.busy">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dateMenu: false,
      plant: {
        scientific_name: String,
        common_name: String,
        nickname: String,
        acquired_at: new Date().toISOString().substr(0, 10),
      },
      busy: false,
    };
  },
  methods: {
    store() {
      // TODO set host const
      axios.post(`http://localhost:3000/api/plant`).then(data => {
        console.log(data);
      });
    },
  },
  mounted () {
    
  }
};
</script>
