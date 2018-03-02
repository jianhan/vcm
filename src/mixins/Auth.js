import {isAuthenticated} from '@/auth/Auth'

const authMixin = {
  computed: {
    authHeader: function () {
      if (isAuthenticated()) {
        return {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}
      }
      return false
    }
  }
}

export default authMixin
