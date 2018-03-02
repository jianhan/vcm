import * as moment from 'moment'
import store from '../store'
import * as mutationTypes from '../store/mutation-types'
import {PASSPORT_OAUTH_TOKEN_URL, PASSPORT_CLIENT_ID, PASSPORT_CLIENT_SECRET} from '../.env'
import {http, errorMsg} from './Http'
import router from '../router'
import _ from 'lodash'

export function isAuthenticated(): boolean {
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
  // check expire at
  const expireAt = localStorage.getItem('expire_at')
  if (expireAt !== null) {
    if (moment().unix() > parseInt(expireAt)) {
      clearAuthData()
      return false
    }
  } else {
    clearAuthData()
    return false
  }

  // check user
  const user = localStorage.getItem('user')
  if (user === null) {
    clearAuthData()
    return false
  }

  return true
}

export function clearAuthData() {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expire_at')
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  store.commit(mutationTypes.DELETE_USER, null)
}

export function setAuthData(accessToken, expireIn, refreshToken, user = {}) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('expire_at', moment().unix() + expireIn)
  localStorage.setItem('refresh_token', refreshToken)
  if (!_.isEmpty(user)) {
    localStorage.setItem('user', JSON.stringify(user))
    store.commit(mutationTypes.SET_USER, user)
  }
}

export function requestToken(email: string, password: string, scope = '') {
  store.commit(mutationTypes.SET_IS_AUTHENTICATING, true)
  store.commit(mutationTypes.SET_AUTHENTICATION_MSG, null)
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
    http().get('user', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(rsp => {
      store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
      let user = _.get(rsp, 'data', false)
      if (user) {
        setAuthData(accessToken, expireAt, refreshToken, rsp.data)
        store.commit('FLASH/SET_FLASH', {message: 'Welcome', variant: 'success'})
        router.push({name: 'Dashboard'})
      } else {
        processFailAuth('User not found', 'warning')
        clearAuthData()
      }
    }).catch(e => {
      processFailAuth(errorMsg(e), 'warning')
      clearAuthData()
    })
  }).catch(e => {
    processFailAuth(errorMsg(e), 'warning')
    clearAuthData()
  })
}

export function initStore() {
  if (isAuthenticated()) {
    const user = String(localStorage.getItem('user'))
    store.commit(mutationTypes.SET_USER, JSON.parse(user))
  }
}

function processFailAuth(message: string, variant: string) {
  store.commit(mutationTypes.SET_AUTHENTICATION_MSG, {message: message, variant: variant})
  store.commit(mutationTypes.SET_IS_AUTHENTICATING, false)
}
