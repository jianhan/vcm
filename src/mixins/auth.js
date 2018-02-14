import { isAuthenticated } from '@/auth/auth'
import * as mutationTypes from '@/store/mutation-types'

const auth = {
  data () {
    return {
      authError: null
    }
  },
  methods: {
    authenticate (username, password) {
      this.$auth.login({
        data: {
          username: username,
          password: password,
          grant_type: 'password',
          client_id: this.$env.PASSPORT_CLIENT_ID,
          client_secret: this.$env.PASSPORT_CLIENT_SECRET,
          scope: ''
        },
        success: rsp => {
          this.$http('api/v1/user').then(rsp => {
            let user = this.$_.get(rsp, 'data', false)
            if (user) {
              localStorage.setItem('user', JSON.stringify(rsp.data))
              this.persistResponse(rsp)
            } else {
              this.authError = {
                variant: 'error',
                message: 'Can not find user'
              }
            }
          }).catch(err => {
            console.log(err)
            this.authError = {
              variant: 'error',
              message: 'System error'
            }
          })
        },
        error: (err) => {
          this.authError = {
            variant: 'error',
            message: err.response.data.message
          }
        }
      })
    },
    persistResponse (rsp) {
      localStorage.setItem('refresh_token', rsp.data.refresh_token)
      localStorage.setItem('expire_at', this.$moment().unix() + rsp.data.expires_in)
      this.$store.commit(mutationTypes.SET_USER, rsp.data)
    },
    isAuthenticated () {
      return isAuthenticated()
    },
    logout () {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expire_at')
      localStorage.removeItem('default_auth_token')
      localStorage.removeItem('user')
      this.$store.commit(mutationTypes.DELETE_USER)
    },
    initUser () {
      this.$auth.ready(function () {
        const user = this.isAuthenticated()
        if (user) {
          this.$store.commit(mutationTypes.SET_USER, user)
        }
      })
    }
  }
}
export default auth
