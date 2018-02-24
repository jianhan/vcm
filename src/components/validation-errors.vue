<template>
  <ul class="validationError">
    <li v-for="(err, key) in validationErrors" v-bind:key="key">
      <strong>{{ key }}</strong> {{ err[0] }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'validation-errors',
  props: {
    validationErrors: Object
  },
  computed: {
    hasErrors () {
      return !this.$_.isUndefined(this.validationErrors) && this.validationErrors.length > 0
    }
  }
}
</script>

<style>
  .validationError {
    list-style-type: none;
    padding-left: 0;
  }
</style>
