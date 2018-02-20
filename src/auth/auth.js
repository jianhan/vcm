import moment from 'moment'
import store from '@/store'
import * as mutationTypes from '@/store/mutation-types'
import {PASSPORT_OAUTH_TOKEN_URL, PASSPORT_CLIENT_ID, PASSPORT_CLIENT_SECRET} from '@/.env'
import { http, errorMsg } from '@/auth/http'
import router from '@/router'
import _ from 'lodash'

export function isAuthenticated () {
  if (localStorage.getItem('refresh_token') === null || localStorage.getItem('refresh_token') === '') {
    clearAuthData()
    return false
  }
  if (localStorage.getItem('expire_at') === null || localStorage.getItem('expire_at') === '') {
    clearAuthData()
    return false
  }
  if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === '') {
    clearAuthData()
    return false
  }
  if (localStorage.getItem('user') === null || localStorage.getItem('user') === '') {
    clearAuthData()
    return false
  }
  if (moment().unix() > localStorage.getItem('expire_at')) {
    clearAuthData()
    return false
  }
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

export function clearAuthData () {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expire_at')
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  store.commit(mutationTypes.DELETE_USER)
}

export function setAuthData (accessToken, expireAt, refreshToken, user = false) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('expire_at', moment().unix() + expireAt)
  localStorage.setItem('refresh_token', refreshToken)
  if (user) {
    localStorage.setItem('user', user)
    store.commit(mutationTypes.SET_USER, user)
  }
}

export function requestToken (email, password, scope = '') {
  store.commit(mutationTypes.SET_IS_AUTHENTICATING, true)
  http().post(PASSPORT_OAUTH_TOKEN_URL, {
    'grant_type': 'password',
    'client_id': PASSPORT_CLIENT_ID,
    'client_secret': PASSPORT_CLIENT_SECRET,
    'username': email,
    'password': password,
    'scope': scope
  }).then(rsp => {
    const refreshToken = rsp.data.refresh_token
    const expireAt = rsp.data.expires_in
    const accessToken = rsp.data.access_token
    http().post('api/v1/user').then(rsp => {
      store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
      let user = _.get(rsp, 'data', false)
      if (user) {
        setAuthData(accessToken, expireAt, refreshToken, JSON.stringify(rsp.data))
        store.commit('FLASH/SET_FLASH', { message: 'Welcome', variant: 'success' })
        router.push({name: 'Dashboard'})
      } else {
        store.commit(mutationTypes.SET_AUTHENTICATION_MSG, { message: 'User not found', variant: 'warning' })
        store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
        clearAuthData()
      }
    }).catch(e => {
      store.commit(mutationTypes.SET_AUTHENTICATION_MSG, { message: errorMsg(e), variant: 'warning' })
      store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
      clearAuthData()
    })
  }).catch(e => {
    processFailAuth(errorMsg(e), 'warning')
    clearAuthData()
  })
}

function processFailAuth (message, variant) {
  store.commit(mutationTypes.SET_AUTHENTICATION_MSG, { message: message, variant: variant })
  store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
}
