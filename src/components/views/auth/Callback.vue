<template>
  <b-alert variant="danger" :show="error != ''">{{ error }}</b-alert>
</template>

<script>
import _ from 'lodash'
import { clearAuthData, setAuthData } from '@/auth/Auth'
import { http } from '@/auth/Http'

export default {
  name: 'callback',
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    const accessToken = _.get(this.$route.query, 'access_token', false)
    const refreshToken = _.get(this.$route.query, 'refresh_token', false)
    const expiresIn = _.get(this.$route.query, 'expires_in', false)
    if (accessToken && refreshToken && expiresIn) {
      http().get('api/v1/user', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }).then(rsp => {
        let user = this.$_.get(rsp, 'data', false)
        if (user) {
          setAuthData(accessToken, expiresIn, refreshToken, user)
          this.$router.push({name: 'Dashboard'})
        } else {
          this.error = _.get(rsp, 'response.data.message', 'System error')
          clearAuthData()
        }
      }).catch(err => {
        this.error = _.get(err, 'response.data.message', 'System error')
        clearAuthData()
      })
    } else {
      this.error = 'Can not proceed authentication, invalid callback data.'
    }
  }
}
</script>
