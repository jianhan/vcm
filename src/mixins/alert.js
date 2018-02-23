const alertMessage = {
  data: function () {
    return {
      alert: {}
    }
  },
  computed: {
    hasAlert () {
      return !this.$_.isEmpty(this.alert)
    }
  },
  methods: {
    setAlert (message, variant) {
      this.alert = {
        message: message,
        variant: variant
      }
    },
    dismissAlert () {
      this.alert = {}
    }
  }
}

export default alertMessage
