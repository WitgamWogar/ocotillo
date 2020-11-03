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
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Common Name"
              hint="Arabian Jasmine"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Nickname"
              hint="e.g. Orlando Bloom"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              ref="dateMenu"
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Acquisition Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="acquisitionDate"
                no-title
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
      <v-btn color="blue darken-1" text @click="store" :loading="busy">
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
      acquisitionDate: null,
      dateFormatted: null,
      busy: false,
    };
  },
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.acquisitionDate)
      },
    },
  methods: {
    store() {
        this.busy = true;
        axios
            .post(`http://localhost:3000/api/plant`)
            .then(data => {
                this.busy = false;
                console.log(data.data);
            });
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    },
  },
};
</script>
