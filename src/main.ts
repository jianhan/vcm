// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App.vue'
import router from './router'
import * as moment from 'moment';
import _ from 'lodash'
import BootstrapVue from 'bootstrap-vue'
import * as env from './.env'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'
import store from './store'
import VuexFlash from 'vuex-flash'
import { sync } from 'vuex-router-sync'
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css'
import Datetime from 'vue-datetime'
import VModal from 'vue-js-modal'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'


sync(store, router)
Vue.use(VModal)
Vue.use(VuexFlash, { mixin: true })
Vue.use(BootstrapVue)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar)
Vue.use(Datetime)
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  inverse: false
}

Vue.use(VueProgressBar, options)

Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$env', { value: env })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
