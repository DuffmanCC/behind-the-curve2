import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import map from './map'
import axios from 'axios'
import geo from './utils/functions'
import VueGtm from 'vue-gtm'

Vue.use(VueGtm, {
  id: 'GTM-N6B79NG', // Your GTM ID
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true // Whether or not display console logs debugs (optional)
});

window.axios = axios;
window.geo = geo;

Vue.config.productionTip = false

new Vue({
  store,
  map,
  render: h => h(App)
}).$mount('#app')
