import axios from 'axios'
import {PASSPORT_API_URL} from '@/.env'
import { isAuthenticated } from '@/auth/auth'
import _ from 'lodash'

export function http () {
  // Set some headers here if there is any
  let headers = {}
  if (isAuthenticated) {
    headers = Object.assign(headers, {'Authorization': 'Bearer ' + localStorage.getItem('access_token')})
  }
  var instance = axios.create({
    baseURL: PASSPORT_API_URL,
    headers
  })
  return instance
}

export function errorMsg (response, returnRawMessage = false) {
  console.warn(response)
  const status = _.get(response, 'response.status', 0)
  if (status === 400) {
    return 'Bad request, system is unable to process.'
  } else if (status === 422) {
    return 'Validation error, please check your input.'
  } else if (status === 401) {
    return 'Unauthorized, unable to process the request.'
  } else if (status === 405) {
    return 'Invalid request method, please contact administrator.'
  } else if (status === 500) {
    return 'Internal server error, please contact administrator'
  }
  return 'Unknown errors, please contact administrator'
}
