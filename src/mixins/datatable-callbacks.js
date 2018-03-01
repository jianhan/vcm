const datatableCallbacks = {
  methods: {
    formatBoolean (val) {
      if (val === true) {
        return '<i class="fas fa-check text-success"></i>'
      }
      return '<i class="fas fa-times text-danger"></i>'
    }
  }
}

export default datatableCallbacks
