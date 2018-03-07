import {PASSPORT_API_URL} from '@/.env'

const dropzone = {
  data () {
    return {
      baseDropzoneOptions: {
        uploadMultiple: false,
        parallelUploads: true,
        // maxFilesize: 1,
        // acceptedFiles: 'image/*',
        addRemoveLinks: true,
        url: PASSPORT_API_URL + 'upload',
        thumbnailWidth: 150,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      },
      dropzoneErrors: []
    }
  },
  computed: {
    hasDropzoneErrors () {
      return !this.$_.isEmpty(this.dropzoneErrors)
    }
  },
  methods: {
    clearDropzoneErrors () {
      this.dropzoneErrors = []
    },
    addDropzoneErrors (message, variant) {
      this.dropzoneErrors.push({
        message,
        variant
      })
    },
    vdropzoneError (file, message, xhr) {
      if (!this.$_.isUndefined(xhr)) {
        let msg = message
        let rsp = JSON.parse(xhr.response)
        if (xhr.status === 422) {
          msg = 'File validation errors'
          alert(123)
          this.$_.each(rsp.errors, e => {
            msg += '\n' + e[0]
          })
        } else {
          msg = message.message
        }
        this.addDropzoneErrors(msg, 'warning')
      } else {
        this.addDropzoneErrors(message, 'warning')
      }
      this.$_.get(this, '$refs.' + this.dragZoneRef).removeFile(file)
    },
    dismissDropzoneErrors (i) {
      this.dropzoneErrors.splice(i, 1)
    }
  }
}

export default dropzone
