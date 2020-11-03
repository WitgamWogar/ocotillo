import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Validator from "./plugins/Validator";
import NetworkBus from './plugins/NetworkBus';
import initInterceptors from "./plugins/interceptors";
import Notification from './plugins/Notification';

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.prototype.$validator = new Vue(Validator);
Vue.prototype.$network = new Vue(NetworkBus);
Vue.prototype.$notification = new Vue(Notification);

initInterceptors();

Vue.mixin({
  methods: {
      notify: function (message, color = "success", timeout = 5000) {
          this.$eventHub.$emit('show-notification', message, color, timeout);
      },
  },
});



let app = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default app;
