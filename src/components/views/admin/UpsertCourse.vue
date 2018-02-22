<template>
  <b-card title="Card title" sub-title="Card subtitle">
    <p class="card-text">
      Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
    </p>
    <upsert-course-form></upsert-course-form>
  </b-card>
</template>

<script>
import _ from 'lodash'
import {http} from '@/auth/http'
import UpsertCourseForm from './UpsertCourseForm'

export default {
  name: 'upsert-course',
  components: {
    UpsertCourseForm
  },
  data () {
    return {
      course: {},
      date: null,
      dateTimePickerFormat: {}
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (!_.isUndefined(id)) {
      http().get('api/courses/' + id)
        .then(r => {

        })
        .catch(e => {

        })
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>
