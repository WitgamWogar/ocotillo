<template>
  <div id="plant-details-container" class="page-wrapper">
    <v-container v-if="!notFound">
      <v-row justify="center">
        <h1 class="white--text">{{ this.plant.common_name }}</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-card class="mb-3" color="#ffffffd4">
            <v-card-title>
              <v-icon class="mr-3">mdi-flower-tulip-outline</v-icon>
              <span class="headline">Basic Details</span>
              <v-spacer></v-spacer>
              <v-btn color="green" class="ml-2" icon small>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-simple-table style="background-color:transparent;">
              <tbody>
                <editable-row
                  label="Scientific Name"
                  type="text"
                  :edit-mode="editMode"
                  v-model="plant.scientific_name"
                  :error-messages="$validator.get('scientific_name')"
                ></editable-row>
                <editable-row
                  label="Common Name"
                  type="text"
                  :edit-mode="editMode"
                  v-model="plant.common_name"
                  :error-messages="$validator.get('common_name')"
                ></editable-row>
                <editable-row
                  label="Nickname"
                  type="text"
                  :edit-mode="editMode"
                  v-model="plant.nickname"
                  :error-messages="$validator.get('nickname')"
                ></editable-row>
                <editable-row
                  label="Location"
                  type="text"
                  :edit-mode="editMode"
                  v-model="plant.location"
                  :error-messages="$validator.get('location')"
                ></editable-row>
                <editable-row
                  label="Source"
                  type="text"
                  :edit-mode="editMode"
                  v-model="plant.source"
                  :error-messages="$validator.get('source')"
                ></editable-row>
              </tbody>
            </v-simple-table>

            <v-card-actions> </v-card-actions>
          </v-card>

          <v-card class="mb-3" color="#ffffffd4">
            <v-card-title>
              <v-icon class="mr-3">mdi-photo</v-icon>
              <span class="headline">Photos</span>
              <v-spacer></v-spacer>
              <v-btn color="green" class="ml-2" icon small>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-carousel v-if="plant.photos && plant.photos.length">
              <v-carousel-item
                v-for="(photo, i) in plant.photos"
                :key="i"
                :src="'http://localhost:3000/' + photo.path"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card color="#ffffffd4">
            <v-card-title>
              Activity
              <v-select
                class="ml-15"
                :items="activityTypes"
                label="Filter Activities"
              ></v-select>
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
                direction="left"
              >
                <template v-slot:activator>
                  <v-btn v-model="fab" color="blue darken-2" dark fab>
                    <v-icon v-if="fab">
                      mdi-close
                    </v-icon>
                    <v-icon v-else>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn
                  v-for="item in activityTypes"
                  fab
                  dark
                  small
                  :color="item.color"
                  :key="item.value"
                  @click="openNewActivityDialog(item)"
                >
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-speed-dial>

              <v-timeline dense clipped class="pt-0">
                <v-timeline-item
                  :color="activityMap[item.type].color"
                  :icon="item.icon"
                  fill-dot
                  v-for="(item, i) in plant.activities"
                  :key="i"
                >
                  <v-row justify="space-between">
                    <v-col cols="7">
                      <span class="overline">{{ activityMap[item.type].text }}</span>
                    </v-col>
                    <v-col class="text-right" cols="5">
                      <strong :class="`${activityMap[item.type].color}--text button`">{{
                        item.performed_at |  moment('MM/DD/YYYY')
                      }}</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <not-found
      message="This plant can't be located. Maybe it was deleted?"
      v-else
    ></not-found>

    <v-dialog v-model="addActivityDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            <v-icon :color="newActivity.color">{{ newActivity.icon }}</v-icon>
            {{ newActivity.text }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
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
                  outlined
                  v-model="newActivity.note"
                  label="Notes"
                  value=""
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addActivityDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addActivity">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NotFound from '../../components/common/NotFound';
import EditableRow from '../../components/ui/form/EditableRow';


export default {
  components: {
    NotFound,
    EditableRow,
  },
  data() {
    return {
      plant: {},
      notFound: false,
      editMode: false,
      fab: false,
      dateMenu: false,
      performed_at: new Date().toISOString().substr(0, 10),
      newActivity: {
        note: '',
        performed_at: new Date().toISOString(),
      },
      activitySpeedDial: false,
      addActivityDialog: false,
      activityMap: {
        watered: {
          color: 'blue',
          text: 'Watered',
        },
        misted: {
          color: 'cyan',
          text: 'Misted',
        },
        pruned: {
          color: 'pink',
          text: 'Pruned',
        },
        fertilized: {
          color: 'teal',
          text: 'Fertilized',
        },
        transplanted: {
          color: '#6D4C41',
          text: 'Transplanted',
        }
      },
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
  computed: {
    timeline() {
      return this.events.slice().reverse();
    },
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
    openNewActivityDialog(activityType) {
      this.newActivity = Object.assign({}, activityType);
      this.newActivity.performed_at = new Date().toISOString().substr(0, 10);
      this.addActivityDialog = true;
    },
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(' ')
            .map(v => v.charAt(0))
            .join('')}`;
        }),
      });

      this.input = null;
    },
    addActivity() {
      this.newActivity.plant_id = this.plant.id;
      this.newActivity.type = this.newActivity.value;
      this.newActivity.performed_at = new Date(this.performed_at).toISOString();
      this.axios.post(`activity`, this.newActivity).then(() => {
        this.notify("Activity Added!");
        this.getPlantData();
        this.newActivity = {};
        this.addActivityDialog = false;
      });
    }
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
