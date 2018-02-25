const validationErrors = {
  data: function () {
    return {
      vErrors: {}
    }
  },
  computed: {
    hasVErrors () {
      return !this.$_.isEmpty(this.vErrors)
    }
  },
  methods: {
    setVErrors (errors) {
      this.vErrors = errors
    },
    dismissAlert () {
      this.alert = {}
      this.vErrors = {}
    }
  }
}

export default validationErrors
