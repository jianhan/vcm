<template>
  <form data-vv-scope="login-form" @submit.prevent="login">
    <b-alert :show="hasError" variant="warning">Please make sure all fields are valid.</b-alert>
    <flash-message variant="danger" autoHide></flash-message>
    <flash-message variant="warning" autoHide></flash-message>
    <flash-message variant="success" autoHide></flash-message>
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
    <b-button type="submit" variant="primary" :disabled="errors.any('login-form') || loading">
      <i class="fas fa-spinner fa-pulse" v-if="loading"></i>
      <i class="fas fa-lock" v-else></i>
      Login
    </b-button>
  </form>
</template>

<script>
import { isAuthenticated, requestToken } from '@/auth/auth'

export default {
  name: 'Login',
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
      requestToken(this.form.email, this.form.password)
    }
  },
  mounted () {
    if (isAuthenticated()) {
      this.$router.replace({name: 'Dashboard'})
    }
  }
}
</script>
