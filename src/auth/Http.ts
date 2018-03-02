import axios from 'axios'
import {PASSPORT_API_URL} from '../.env'
import { isAuthenticated } from './Auth'
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

export function errorMsg (response: object, returnRawMessage = false): string{
  const status = _.get(response, 'response.data.status_code', 0)
  const message = _.get(response, 'response.data.message', '')
  if (status === 400) {
    return returnRawMessage ? message :'Bad request, system is unable to process.'
  } else if (status === 422) {
    return returnRawMessage ? message : 'Validation error, please check your input.'
  } else if (status === 401) {
    return returnRawMessage ? message : 'Unauthorized, unable to process the request.'
  } else if (status === 405) {
    return returnRawMessage ? message : 'Invalid request method, please contact administrator.'
  } else if (status === 500) {
    return returnRawMessage ? message : 'Internal server error, please contact administrator'
  }
  return 'Unknown errors, please contact administrator'
}
