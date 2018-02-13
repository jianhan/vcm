<template>
  <form data-vv-scope="login-form" @submit.prevent="login">
    <b-alert :show="hasError" variant="warning">Please make sure all fields are valid.</b-alert>
    <b-alert v-if="authError != null" show variant="warning">{{ authError.message }}</b-alert>
    <div class="form-group">
      <input v-validate="'required|email'"
             class="form-control"
             v-model="form.email"
             name="email"
             type="text"
             placeholder="Email">
      <small v-show="!errors.has('login-form.email')" class="form-text text-muted">Enter your email address to login.</small>
      <small v-show="errors.has('login-form.email')" class="form-text text-danger">{{ errors.first('login-form.email') }}</small>
    </div>
    <div class="form-group">
      <input type="password"
             v-validate="'required'"
             name="password"
             v-model="form.password"
             class="form-control"
             placeholder="Enter password">
      <small v-show="!errors.has('login-form.password')" class="form-text text-muted">Enter your password to login.</small>
      <small v-show="errors.has('login-form.password')" class="form-text text-danger">{{ errors.first('login-form.password') }}</small>
    </div>
    <b-button type="submit" variant="primary" :disabled="errors.any('login-form')">
      <i class="fas fa-lock"></i> Login
    </b-button>
  </form>
</template>

<script>
import auth from '@/mixins/auth'
export default {
  name: 'Login',
  mixins: [auth],
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      hasError: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.hasError = false
      this.authError = null
      this.$validator.validateScopes('login-form').then((result) => {
        if (result) {
          this.authenticate(this.form.email, this.form.password)
          this.loading = false
          return
        }
        this.hasError = true
        this.loading = false
      })
    }
  }
}
</script>
