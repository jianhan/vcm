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
    addDropzoneErrors (file, message, variant) {
      this.dropzoneErrors.push({
        file,
        message,
        variant
      })
    },
    vdropzoneErrorMultiple (files, message, xhr) {
      let msg = message
      if (!this.$_.isUndefined(xhr)) {
        msg = message.message
      }
      for (let i = 0; i < this.$_.size(files); i++) {
        this.$_.get(this, '$refs.' + this.dragZoneRef).removeFile(files[i])
        this.addDropzoneErrors(files[i], files[i].name + ' : ' + msg, 'warning')
      }
    },
    dismissDropzoneErrors (i) {
      console.log('BEFORE', this.dropzoneErrors)
      this.dropzoneErrors.splice(i, 1)
      console.log('AFTER', this.dropzoneErrors)
    }
  }
}

export default dropzone
