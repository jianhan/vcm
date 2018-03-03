import {PASSPORT_API_URL} from '@/.env'

const dropzone = {
  data () {
    return {
      dropzoneOptions: {
        uploadMultiple: true,
        parallelUploads: true,
        maxFilesize: 1.5,
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
      for (let i = 0; i < this.$_.size(files); i++) {
        this.addDropzoneErrors(message.message, 'warning')
      }
    },
    dismissDropzoneErrors (index) {
      this.dropzoneErrors.splice(index, 1)
    }
  }
}

export default dropzone
