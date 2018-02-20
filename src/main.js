// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import _ from 'lodash'
import BootstrapVue from 'bootstrap-vue'
import * as env from './.env'
import auth from '@/mixins/auth'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'
import store from './store'
import VuexFlash from 'vuex-flash'

Vue.use(VuexFlash, { mixin: true })
Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$env', { value: env })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [auth],
  router,
  components: { App },
  template: '<App/>',
  store,
  created () {
    this.initUser()
  }
})
