const auth = {
  methods: {
    login (username, password) {
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
            } else {
            // TODO: handle error
            }
          }).catch(err => {
            // TODO: handle error
            console.log(err)
          })
        },
        error: (rsp) => {
          // TODO: handle error
        },
        redirect: '/admin/dashboard'
      })
    },
    persistResponse (rsp) {
      localStorage.setItem('refresh_token', rsp.data.refresh_token)
      localStorage.setItem('expire_at', this.$moment().unix() + rsp.data.expires_in)
    },
    isAuthenticated () {
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
      if (this.$moment().unix() > localStorage.getItem('expire_at')) {
        this.logout(false)
        return false
      }
      const user = localStorage.getItem('user')
      return JSON.parse(user)
    },
    logout (redirect = true) {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expire_at')
      localStorage.removeItem('default_auth_token')
      localStorage.removeItem('user')
      if (redirect) {
        // TODO: redirect
      }
    },
    initUser () {
      this.$auth.ready(function () {
        const user = this.isAuthenticated()
        if (user) {
          this.$auth.user(user)
        }
      })
    }
  }
}
export default auth
