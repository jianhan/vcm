import moment from 'moment'
import store from '@/store'
import * as mutationTypes from '@/store/mutation-types'
import {PASSPORT_OAUTH_TOKEN_URL, PASSPORT_CLIENT_ID, PASSPORT_CLIENT_SECRET} from '@/.env'
import {http} from '@/auth/http'

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

export function requestToken (email, password, scope = '') {
  http.post(PASSPORT_OAUTH_TOKEN_URL, {
    params: {
      'grant_type': 'password',
      'client_id': PASSPORT_CLIENT_ID,
      'client_secret': PASSPORT_CLIENT_SECRET,
      'username': email,
      'password': password,
      'scope': scope
    }
  }).then(r => {

  }).catch(e => {

  })
}
