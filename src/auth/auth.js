import moment from 'moment'
import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import VueAxios from 'vue-axios'
import * as env from '@/.env'
import _ from 'lodash'

export function isAuthenticated () {
  if (localStorage.getItem('refresh_token') === null) {
    console.log(1)
    return false
  }
  if (localStorage.getItem('expire_at') === null) {

    console.log(2)
    return false
  }
  if (localStorage.getItem('default_auth_token') === null) {

    console.log(3)
    return false
  }
  if (localStorage.getItem('user') === null) {
    console.log(4, localStorage.getItem('user'))
    return false
  }
  if (moment().unix() > localStorage.getItem('expire_at')) {

    console.log(5)
    return false
  }
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

export function initAuth () {
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
    loginData: {url: 'oauth/token', method: 'POST'},
    fetchData: {url: 'api/v1/user', method: 'GET', authType: 'bearer'},
    refreshData: {enabled: false},
    rolesVar: 'role_id',
    tokenStore: ['localStorage']
  }
  Vue.use(require('@websanova/vue-auth'), authOptions)
}
