import {PASSPORT_API_URL} from '@/.env'

const dropzone = {
  data () {
    return {
      baseDropzoneOptions: {
        uploadMultiple: true,
        parallelUploads: true,
        maxFilesize: 1,
        maxFiles: 2,
        acceptedFiles: 'image/*',
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
    vdropzoneErrorMultiple (files, message, xhr) {
      if (!this.$_.isUndefined(xhr)) {
        let msg = message
        let rsp = JSON.parse(xhr.response)
        if (xhr.status === 422) {
          msg = 'File validation errors'
          this.$_.each(rsp.errors, e => {
            msg += '\n' + e[0]
          })
        } else {
          msg = message.message
        }
        this.addDropzoneErrors(msg, 'warning')
      } else {
        for (let i = 0; i < this.$_.size(files); i++) {
          this.addDropzoneErrors(message, 'warning')
        }
      }
      for (let i = 0; i < this.$_.size(files); i++) {
        this.$_.get(this, '$refs.' + this.dragZoneRef).removeFile(files[i])
      }
    },
    dismissDropzoneErrors (i) {
      this.dropzoneErrors.splice(i, 1)
    }
  }
}

export default dropzone
