import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Validator from "./plugins/Validator";
import NetworkBus from './plugins/NetworkBus';
import initInterceptors from "./plugins/interceptors";
import axios from 'axios';
import VuetifyConfirm from 'vuetify-confirm';
import router from './routes';
import Vuex from 'vuex';
import store from './store';
import moment from 'moment';

Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Confirm',
  buttonFalseText: 'Cancel',
  color: 'warning',
  icon: 'mdi-help-circle-outline',
  title: 'Confirm',
  width: 350,
  property: '$confirm'
});


Vue.prototype.$validator = new Vue(Validator);
Vue.prototype.$network = new Vue(NetworkBus);
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://localhost:3000/api/'; // TODO add switch for prod vs dev

Vue.use(Vuex);

initInterceptors();

Vue.mixin({
  methods: {
      notify: function (message, color = "success", timeout = 5000) {
          this.$eventHub.$emit('show-notification', message, color, timeout);
      },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
});



let app = new Vue({
  router: router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

export default app;
