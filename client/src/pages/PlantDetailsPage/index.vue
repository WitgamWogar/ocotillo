<template>
  <div>
    <v-container v-if="!notFound">
      <v-row justify="center">
        <h1 class="white--text">{{ this.plant.common_name }}</h1>
      </v-row>
      <v-row justify="center">
      
        <v-col cols="6">
          <v-card class="mb-3">
            <v-card-title>
              <v-icon class="mr-3">mdi-flower-tulip-outline</v-icon>
              <span class="headline">Basic Details</span>
              <v-spacer></v-spacer>
              <v-btn color="green" class="ml-2" icon small>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-simple-table>
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

          <v-card class="mb-3">
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
          <v-card>
            
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
              <v-fab-transition>
                <v-btn
                  color="green"
                  fab
                  dark
                  small
                  absolute
                  top
                  right
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
              
              <v-timeline dense clipped class="pt-0">
                
                <v-timeline-item
                  :color="item.color"
                  :icon="item.icon"
                  fill-dot
                  v-for="(item, i) in timelineItems"
                  :key="i"
                >
                  <v-row justify="space-between">
                    <v-col cols="7">
                      {{ item.action }}
                    </v-col>
                    <v-col class="text-right" cols="5">
                      <strong :class="`${item.color}--text button`">{{
                        item.date
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
      activityTypes: [
        { text: 'Watered', value: 'watered' },
        { text: 'Misted', value: 'misted' },
        { text: 'Pruned', value: 'pruned' },
        { text: 'Fertilized', value: 'fertilized' },
        { text: 'Transplanted', value: 'transplanted' },
      ],
      timelineItems: [
        {
          action: 'Pruned',
          date: '09/21/2020',
          color: 'pink',
          icon: 'mdi-content-cut',
        },
        {
          action: 'Transplant',
          date: '09/19/2020',
          color: '#6D4C41',
          icon: 'mdi-shovel',
        },
        {
          action: 'Fertilized',
          date: '09/15/2020',
          color: 'teal',
          icon: 'mdi-bottle-tonic-outline',
        },
        {
          action: 'Misted',
          date: '09/12/2020',
          color: 'cyan',
          icon: 'mdi-spray',
        },
        {
          action: 'Watered',
          date: '09/10/2020',
          color: 'blue',
          icon: 'mdi-watering-can-outline',
        },
        {
          action: 'Acquired',
          date: '09/05/2020',
          color: 'purple',
          icon: 'mdi-home-outline',
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
  },
  created() {
    this.getPlantData();
  },
};
</script>
