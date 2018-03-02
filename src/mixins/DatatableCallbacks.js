const datatableCallbacks = {
  methods: {
    formatBoolean (val) {
      if (val === true) {
        return '<i class="fas fa-check text-success"></i>'
      }
      return '<i class="fas fa-times text-danger"></i>'
    },
    formatDate (val, format = 'YYYY-MM-DD HH:mm:ss') {
      if (this.$moment(val, format).isValid()) {
        return this.$moment(val, format).format('DD-MM-YYYY HH:mm')
      }
      return ''
    }
  }
}

export default datatableCallbacks
