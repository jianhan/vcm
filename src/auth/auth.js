import moment from 'moment'

export function isAuthenticated () {
  if (localStorage.getItem('refresh_token') === null) {
    return false
  }
  if (localStorage.getItem('expire_at') === null) {
    return false
  }
  if (localStorage.getItem('default_auth_token') === null) {
    return false
  }
  if (localStorage.getItem('user') === null) {
    return false
  }
  if (moment().unix() > localStorage.getItem('expire_at')) {
    this.logout(false)
    return false
  }
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}
