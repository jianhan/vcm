import axios from 'axios'
import {PASSPORT_API_URL} from '@/.env'
import { isAuthenticated } from '@/auth/auth'

export default function http () {
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
