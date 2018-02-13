<template>
  <b-form>
    <b-form-group description="Enter your email address">
      <b-form-input type="email"
                    v-model="form.email"
                    required
                    placeholder="Enter your email">
      </b-form-input>
    </b-form-group>
    <b-form-group description="Enter your password">
      <b-form-input type="password"
                    v-model="form.password"
                    required>
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {

  }
}
</script>
