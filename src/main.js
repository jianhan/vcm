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

Vue.router = router
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = env.PASSPORT_API_URL

let laravelPassportAuthDriver = {
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
  auth: laravelPassportAuthDriver,
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  token: [
    {request: 'Authorization', response: 'Authorization', authType: 'bearer', foundIn: 'header'},
    {request: 'token', response: 'token', authType: 'bearer', foundIn: 'response'}
  ],
  loginData: {url: 'oauth/token', method: 'POST', redirect: '/usr/dashboard/dashboard'},
  logoutData: {url: 'api/logout', method: 'POST', redirect: 'login', makeRequest: false},
  fetchData: {url: 'api/user', method: 'GET', authType: 'bearer'},
  refreshData: {enabled: false},
  rolesVar: 'role_id'
}
Vue.use(require('@websanova/vue-auth'), authOptions)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
