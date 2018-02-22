// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

sync(store, router)
Vue.use(VuexFlash, { mixin: true })
Vue.use(BootstrapVue)
Vue.use(VeeValidate)
// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar);
Vue.use(Datetime)
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
