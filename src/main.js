// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import _ from 'lodash'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as env from './.env'

// Start to initialize authentication plugins
Vue.router = router
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = env.PASSPORT_API_URL
let passportAuthDriver = {
  request: function (req, token) {
    this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
  },
  response: function (res) {
    let token = _.get(res, 'data.access_token', false)
    if (token) {
      return token
    }
  }
}

var authOptions = {
  auth: passportAuthDriver,
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  token: [
    {request: 'Authorization', response: 'Authorization', authType: 'bearer', foundIn: 'header'},
    {request: 'token', response: 'token', authType: 'bearer', foundIn: 'response'}
  ],
  loginData: {url: 'oauth/token', method: 'POST', redirect: '/usr/dashboard/dashboard'},
  fetchData: {url: 'api/v1/user', method: 'GET', authType: 'bearer'},
  refreshData: {enabled: false},
  rolesVar: 'role_id',
  tokenStore: ['localStorage']
}
Vue.use(require('@websanova/vue-auth'), authOptions)

Vue.use(Vuex)
Vue.use(BootstrapVue)
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
  created () {
    this.$auth.ready(function () {
      console.log(this) // Will be proper context.
    })
  }
})
