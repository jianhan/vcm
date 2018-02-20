<template>
  <b-alert variant="danger" :show="error != ''">{{ error }}</b-alert>
</template>

<script>
import _ from 'lodash'
import { clearAuthData } from '@/auth/auth'
import * as mutationTypes from '@/store/mutation-types'

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
    const expireIn = _.get(this.$route.query, 'expire_in', false)
    if (!accessToken || !refreshToken || !expireIn) {
      localStorage.setItem('default_auth_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('expire_at', this.$moment().unix() + expireIn)
      this.$http({
        method: 'GET',
        url: 'api/v1/user',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }).then(rsp => {
        let user = this.$_.get(rsp, 'data', false)
        if (user) {
          localStorage.setItem('user', JSON.stringify(rsp.data))
          this.$store.commit(mutationTypes.SET_USER, rsp.data)
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
